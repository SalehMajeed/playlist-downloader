import { useLocation } from "react-router";
import "./css/index.css";
import { convertIntoTimeLine } from "../../Utils";
import { useState } from "react";

function PlaylistTableCmpt() {
  const location = useLocation();
  const playlistData = location.state?.data || [];
  const [selectedVideos, setSelectedVideos] = useState([]);

  function selectVideo(e) {
    const url = e.target.dataset.url;

    if (e.target.checked) {
      setSelectedVideos((videos) => [...videos, url]);
    } else {
      setSelectedVideos((videos) => videos.filter((video) => video !== url));
    }
  }

  function dataToDownload(e) {
    e.preventDefault();
    console.log(selectedVideos);
  }

  function downloadAll(e) {
    e.preventDefault();

    const allUrls = playlistData.map((video) => video.url);

    console.log(allUrls);
  }

  // console.log(playlistData);
  return (
    <>
      <div id={"playlist-container"}>
        <ul>
          {playlistData.map((playlistState, id) => {
            return (
              <li key={playlistState.id} onChange={selectVideo}>
                <span>
                  <input type="checkbox" data-url={playlistState.url} />
                </span>
                <span>{id + 1}</span>
                <span>{playlistState.title}</span>
                <span>{convertIntoTimeLine(playlistState.duration)}</span>
              </li>
            );
          })}
        </ul>
      </div>
      <button disabled={selectedVideos.length === 0} onClick={dataToDownload}>
        Download
      </button>
      <button onClick={downloadAll}>Download All</button>
    </>
  );
}

export default PlaylistTableCmpt;
