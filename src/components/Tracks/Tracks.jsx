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
    <>
      <li>
        <h3>{track.name}</h3>
        <p>
          {track.artists?.map((artist) => artist.name).join(", ")} |{" "}
          {track.album?.name} |{" "}
          <a href={track.external_urls?.spotify} target="_blank">
            Track Link
          </a>
        </p>
        {renderAction()}
      </li>
    </>
  );
}

export default Tracks;
