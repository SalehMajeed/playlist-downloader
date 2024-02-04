import { useState } from "react";
import { useLocation } from "react-router";
import "./css/index.css";
import { convertIntoTimeLine } from "../../Utils";
import { download } from "../UserInput/api";

function PlaylistTableCmpt() {
  const location = useLocation();
  const playlistData = location.state?.data || [];
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

    const data = await download("/download", selectedVideos);

    console.log(data);
    console.log(selectedVideos);
  }

  function downloadAll(e) {
    e.preventDefault();

    const allUrls = playlistData.map((video) => video.url);

    console.log(allUrls);
  }

  return (
    <>
      <div id={"playlist-container"}>
        <ul>
          {playlistData.slice(startIndex, endIndex).map((playlistState, id) => {
            return (
              <li key={playlistState.id} onChange={selectVideo}>
                <span>
                  <input type="checkbox" data-url={playlistState.url} />
                </span>
                <span>{id + startIndex + 1}</span>
                <span>{playlistState.title}</span>
                <span>{convertIntoTimeLine(playlistState.duration)}</span>
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        <button onClick={handlePrevious} disabled={currentPage === 1}>
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={
            currentPage === Math.ceil(playlistData.length / itemsPerPage)
          }
        >
          Next
        </button>
      </div>
      <button disabled={selectedVideos.length === 0} onClick={dataToDownload}>
        Download
      </button>
      <button onClick={downloadAll}>Download All</button>
    </>
  );
}

export default PlaylistTableCmpt;
