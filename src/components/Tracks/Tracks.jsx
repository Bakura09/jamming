// items > artists [] > name

function Tracks({ track }) {
  return (
    <div>
      <h3>{track.name}</h3>
      <div>
        {track.artists?.map((artist) => artist.name).join(", ")} |{" "}
        {track.album?.name}
      </div>
    </div>
  );
}

export default Tracks;
