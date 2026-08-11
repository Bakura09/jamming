import Tracks from "../Tracks/Tracks";

function TrackList({ songs }) {
  return (
    <div>
      {songs.map((track) => {
        return (
          <div>
            <Tracks track={track} key={track.id} />;
          </div>
        );
      })}
    </div>
  );
}

export default TrackList;
