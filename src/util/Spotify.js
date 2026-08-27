const clientId = "b0711ae33c064f19aa7319a60216fe4c";
const redirectUri = "http://127.0.0.1:5173/callback";

const Spotify = {
  async authorize() {
    // Generate code verifier
    const generateRandomString = (length) => {
      const possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      const values = crypto.getRandomValues(new Uint8Array(length));
      return values.reduce((acc, x) => acc + possible[x % possible.length], "");
    };

    const codeVerifier = generateRandomString(64);

    // Transform code verifier into Hash
    const sha256 = async (plain) => {
      const encoder = new TextEncoder();
      const data = encoder.encode(plain);
      return window.crypto.subtle.digest("SHA-256", data);
    };

    const base64encode = (input) => {
      return btoa(String.fromCharCode(...new Uint8Array(input)))
        .replace(/=/g, "")
        .replace(/\+/g, "-")
        .replace(/\//g, "_");
    };

    const hashed = await sha256(codeVerifier);
    const codeChallenge = base64encode(hashed);

    // Authorization step
    const scope =
      "user-read-private user-read-email playlist-modify-private playlist-modify-public";
    const authUrl = new URL("https://accounts.spotify.com/authorize");

    // generated in the previous step
    window.localStorage.setItem("code_verifier", codeVerifier);

    const params = {
      response_type: "code",
      client_id: clientId,
      scope,
      code_challenge_method: "S256",
      code_challenge: codeChallenge,
      redirect_uri: redirectUri,
    };

    authUrl.search = new URLSearchParams(params).toString();
    window.location.href = authUrl.toString();
  },

  async getToken(code) {
    const codeVerifier = localStorage.getItem("code_verifier");

    if (!code || !codeVerifier) {
      throw new Error("Spotify authorization code or verifier is missing");
    }

    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: clientId,
        grant_type: "authorization_code",
        code,
        redirect_uri: redirectUri,
        code_verifier: codeVerifier,
      }),
    });
    const responseBody = await response.json();

    if (!response.ok) {
      throw new Error(
        responseBody.error_description || "Spotify token request failed",
      );
    }

    localStorage.setItem("access_token", responseBody.access_token);
    return responseBody.access_token;
  },

  async search(term) {
    const accessToken = localStorage.getItem("access_token");

    if (!accessToken) {
      return [];
    }

    try {
      const response = await fetch(
        `https://api.spotify.com/v1/search?type=track&q=${encodeURIComponent(term)}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );

      if (!response.ok) {
        return [];
      }

      const responseBody = await response.json();
      return responseBody.tracks.items.map((tracks) => ({
        id: tracks.id,
        name: tracks.name,
        artists: tracks.artists,
        external_urls: tracks.external_urls.spotify,
        album: tracks.album.name,
        uri: tracks.uri,
      }));
    } catch (error) {
      console.log(error);
      return [];
    }
  },

  async createPlaylist(playlistName, trackUris) {
    if (!playlistName || !trackUris.length) {
      return [];
    }

    const accessToken = localStorage.getItem("access_token");

    try {
      // Create the playlist
      const playlistEndpoint = `https://api.spotify.com/v1/me/playlists`;
      let playlist;

      const playlistResponse = await fetch(playlistEndpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: playlistName }),
      });

      if (!playlistResponse.ok) {
        const responseBody = await playlistResponse.json();
        throw new Error(
          responseBody.error?.message || "Spotify playlist creation failed",
        );
      }

      const playlistjsonResponse = await playlistResponse.json();
      playlist = playlistjsonResponse.id;

      // Add the tracks to the playlist
      const addTracksEndpoint = `https://api.spotify.com/v1/playlists/${playlist}/items`;
      const addTracks = await fetch(addTracksEndpoint, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          uris: trackUris,
          position: 0,
        }),
      });

      const addTracksJson = await addTracks.json();
      if (!addTracks.ok) {
        throw new Error(
          addTracksJson.error?.message || "Spotify tracks could not be added",
        );
      }

      return addTracksJson;
    } catch (error) {
      console.log(error);
    }
  },
};

export default Spotify;
