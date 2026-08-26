import Tracks from "../Tracks/Tracks";

function TrackList({ tracks, onAdd, onRemove, isRemoval }) {
  return (
    <div>
      {tracks.map((track) => {
        return (
          <Tracks
            track={track}
            key={track.id}
            isRemoval={isRemoval}
            onAdd={onAdd}
            onRemove={onRemove}
          />
        );
      })}
    </div>
  );
}

export default TrackList;
