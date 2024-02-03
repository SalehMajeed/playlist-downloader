import React, { useState } from "react";
import { useNavigate } from "react-router";
import ROUTES from "../../Constants/routes";
import { fetchMetadatalist } from "./api";

function UserInputCmpt() {
  const [userInput, setUserInput] = useState("");
  const [loadingData, setLoadingData] = useState(false);
  const navigate = useNavigate();

  const HandleInput = (event) => {
    const inputValue = event.target.value;
    setUserInput(inputValue);
  };

  const HandleDownload = async () => {
    if (userInput.trim() !== "") {
      setLoadingData(true);
      const playlist_url = userInput.trim();
      const fetchedReq = await fetchMetadatalist(
        `/playlist/get-metadata-list?playlistAddress=${playlist_url}`
      );
      const reqData = fetchedReq.data;
      setLoadingData(false);
      navigate(ROUTES.SHOW_METADATA_LIST, { state: { data: reqData } });
    }
    setUserInput("");
  };

  return (
    <div>
      oye
      <input
        type="text"
        placeholder="enter your text"
        value={userInput}
        onChange={HandleInput}
      />
      <br />
      <button onClick={HandleDownload} disabled={loadingData}>
        Get Your Playlist
      </button>
      {loadingData && <h1>Loading....</h1>}
    </div>
  );
}

export default UserInputCmpt;
