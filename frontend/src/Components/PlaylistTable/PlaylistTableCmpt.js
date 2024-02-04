import { useState } from "react";
import { useLocation } from "react-router";
import "./css/index.css";
import { convertIntoTimeLine } from "../../Utils";

function PlaylistTableCmpt() {
  const location = useLocation();
  const playlistData = location.state?.data || [];
  console.log(playlistData);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    console.log(Math.ceil(playlistData.length / itemsPerPage));
    console.log(currentPage < Math.ceil(playlistData.length / itemsPerPage));
    if (currentPage < Math.ceil(playlistData.length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, playlistData.length);

  return (
    <>
      <div id={"playlist-container"}>
        {playlistData.slice(startIndex, endIndex).map((playlistState, index) => {
          return (
            <ul key={startIndex + index}>
              <li>
                <input type="checkbox" />
              </li>
              <li>{startIndex + index + 1}</li>
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
        <button onClick={handleNext} disabled={currentPage === Math.ceil(playlistData.length / itemsPerPage)}>
          Next
        </button>
      </div>
      <button disabled={playlistData.length < 1}>Download</button>
    </>
  );
}

export default PlaylistTableCmpt;
