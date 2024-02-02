import { useLocation } from "react-router";
import "./css/index.css";
function PlaylistTableCmpt() {
  const location = useLocation();
  console.log(location);
  const playlistData = location.state?.data || [];
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
      <button disabled={playlistData.length < 1}>Download</button>
    </>
  );
}

export default PlaylistTableCmpt;
