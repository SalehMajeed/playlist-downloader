import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import "./css/index.css";
import { convertIntoTimeLine } from "../../Utils";
import { download } from "../UserInput/api";

function PlaylistTableCmpt() {
  const location = useLocation();
  const playlistData = location.state?.data || [];
  const playlistUrl = location.state?.playlist_url;
  const [selectedVideos, setSelectedVideos] = useState([]);
  const [pageData, setPageData] = useState(playlistData);

  const [isSelectAll, setIsSelectAll] = useState(false);

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, playlistData.length);

  function handlePrevious() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function handleNext() {
    if (currentPage < Math.ceil(playlistData.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  }

  useEffect(() => {
    checkSelectAll();

    // const page = playlistData.slice(startIndex, endIndex);

    // setPageData(page);
  }, [startIndex, endIndex]);

  function checkSelectAll() {
    setIsSelectAll(
      pageData.slice(startIndex, endIndex).every((item) => item.checked)
    );
  }

  function selectVideo(e) {
    const url = e.target.dataset.url;

    checkSelectAll();
    if (e.target.checked) {
      setSelectedVideos((videos) => [...videos, url]);
    } else {
      setIsSelectAll(false);
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

  // function selectAll(e) {
  //   setSelectedVideos([]);
  //   if (e.target.checked) {
  //     const page = pageData.map((item) => {
  //       setSelectedVideos((videos) => [...videos, item.url]);
  //       return { ...item, checked: true };
  //     });

  //     setIsSelectAll(true);
  //     setPageData(page);
  //   } else {
  //     const page = pageData.map((item) => {
  //       setSelectedVideos([]);
  //       return { ...item, checked: false };
  //     });
  //     setIsSelectAll(false);
  //     setPageData(page);
  //   }
  // }

  function selectAll(e) {
    if (e.target.checked) {
      const page = pageData.map((item, index) => {
        if (index >= startIndex && index < endIndex && !item.checked) {
          setSelectedVideos((videos) => [...videos, item.url]);
          return { ...item, checked: true };
        } else {
          return { ...item };
        }
      });

      setIsSelectAll(true);
      setPageData(page);
    } else {
      const page = pageData.map((item, index) => {
        if (index >= startIndex && index < endIndex) {
          setSelectedVideos((videos) =>
            videos.filter((video) => video !== item.url)
          );
          return { ...item, checked: false };
        } else {
          return { ...item };
        }
      });
      setIsSelectAll(false);
      setPageData(page);
    }
  }

  return (
    <>
      <div id={"playlist-container"}>
        <label>
          <input type="checkbox" checked={isSelectAll} onChange={selectAll} />
          <span>select all</span>
        </label>
        {pageData.slice(startIndex, endIndex).map((playlistState, id) => {
          return (
            <ul key={playlistState.id} onChange={selectVideo}>
              <li>
                <input
                  type="checkbox"
                  data-url={playlistState.url}
                  onChange={() => {
                    playlistState.checked = !playlistState.checked;
                  }}
                  checked={playlistState.checked}
                />
              </li>
              <li>{id + startIndex + 1}</li>
              <li>{playlistState.title}</li>
              <li>{convertIntoTimeLine(playlistState.duration)}</li>
            </ul>
          );
        })}
      </div>
      <div className="button-container">
        <button
          className="previous-btn"
          onClick={handlePrevious}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>{currentPage}</span>
        <button
          className="next-btn"
          onClick={handleNext}
          disabled={
            currentPage === Math.ceil(playlistData.length / itemsPerPage)
          }
        >
          Next
        </button>
      </div>
      <div className="download-btn-container">
        <button
          className="downloadBtn"
          disabled={selectedVideos.length < 1}
          onClick={dataToDownload}
        >
          Download
        </button>
        <button className="downloadBtn" onClick={downloadAll}>
          Download All
        </button>
      </div>
    </>
  );
}

export default PlaylistTableCmpt;
