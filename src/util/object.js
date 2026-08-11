import results from "./tracksMockObj.js";

const tracks = results.tracks.items;

tracks.map((track) => {
  const songs = {
    name: track.name,
    id: track.id,
    album: track.album.name,
  };
  console.log(songs);
});
