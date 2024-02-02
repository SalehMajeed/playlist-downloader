import "./css/index.css";
function PlaylistTableCmpt({ playlistData }) {
  return (
    <>
      <div id={"playlist-container"}>
        {playlistData.map((playlistState, id) => {
          return (
            <ul key={id}>
              <li>
                <input type="checkbox" />
              </li>
              <li>{id + 1}</li>
              <li>{playlistState.title}</li>
              <li>
                {playlistState.duration / 60}min and{" "}
                {playlistState.duration % 60}
                sec
              </li>
            </ul>
          );
        })}
      </div>
      <button>Download</button>
    </>
  );
}

export default PlaylistTableCmpt;
