import { useCallback } from "react";

function Tracks({ track, onAdd, onRemove, isRemoval }) {
  const addTrack = useCallback(() => {
    onAdd(track);
  }, [onAdd, track]);

  const removeTrack = useCallback(() => {
    onRemove(track);
  }, [onRemove, track]);

  const renderAction = () => {
    if (isRemoval) {
      return (
        <button type="button" onClick={addTrack}>
          +
        </button>
      );
    }

    return (
      <button type="button" onClick={removeTrack}>
        -
      </button>
    );
  };

  return (
    <div>
      <div>
        <h3>{track.name}</h3>
        <p>
          <strong>Artists:</strong>{" "}
          {track.artists.map((artist) => artist.name).join(" ")} | {track.album}
        </p>
        <p>
          <a href={track.external_urls} target="_blank">
            Track Link
          </a>
        </p>
      </div>
      {renderAction()}
    </div>
  );
}

export default Tracks;
