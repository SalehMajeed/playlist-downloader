import { useLocation } from "react-router";
import "./css/index.css";
import { convertIntoTimeLine } from "../../Utils";
function PlaylistTableCmpt() {
  const location = useLocation();
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
                {convertIntoTimeLine(playlistState.duration)}
              </li>
            </ul>
          );
        })}
      </div>
      <button id={"downloadBtn"} disabled={playlistData.length < 1}>Download</button>
    </>
  );
}

export default PlaylistTableCmpt;
