import { useState } from "react";
import { useLocation } from "react-router";
import "./css/index.css";
import { convertIntoTimeLine } from "../../Utils";
import { download } from "../UserInput/api";

function PlaylistTableCmpt() {
  const location = useLocation();
  const playlistData = location.state?.data || [];
  const playlistUrl = location.state?.playlist_url;
  const [selectedVideos, setSelectedVideos] = useState([]);

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < Math.ceil(playlistData.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, playlistData.length);

  function selectVideo(e) {
    const url = e.target.dataset.url;

    if (e.target.checked) {
      setSelectedVideos((videos) => [...videos, url]);
    } else {
      setSelectedVideos((videos) => videos.filter((video) => video !== url));
    }
  }

  async function dataToDownload(e) {
    e.preventDefault();

    await download("/download", { playlistUrl, selectedVideos });

    console.log({ playlistUrl, selectedVideos });
  }

  function downloadAll(e) {
    e.preventDefault();

    console.log({ playlistUrl, playlistData });
  }

  return (
    <>
      <div id={"playlist-container"}>
        {playlistData.slice(startIndex, endIndex).map((playlistState, id) => {
          return (
            <ul key={playlistState.id} onChange={selectVideo}>
              <li>
                <input type="checkbox" data-url={playlistState.url} />
              </li>
              <li>{id + startIndex + 1}</li>
              <li>{playlistState.title}</li>
              <li>{convertIntoTimeLine(playlistState.duration)}</li>
            </ul>
          );
        })}
      </div>
      <div>
        <button onClick={handlePrevious} disabled={currentPage === 1}>
          Previous
        </button>
        <span>{currentPage}</span>
        <button
          onClick={handleNext}
          disabled={
            currentPage === Math.ceil(playlistData.length / itemsPerPage)
          }
        >
          Next
        </button>
      </div>
      <button id={"downloadBtn"} disabled={playlistData.length < 1} onClick={dataToDownload}>
        Download
      </button>
    </>
  );
}

export default PlaylistTableCmpt;
