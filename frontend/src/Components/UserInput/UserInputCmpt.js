import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

function UserInputCmpt() {
  const [userInput, setUserInput] = useState("");
  const [loadingData, setLoadingData] = useState(false);
  const [playlistAddress, setPlaylistAddress] = useState("");
  const navigate = useNavigate();

  const HandleInput = (event) => {
    const data = event.target.value;
    setUserInput(data);
  };

  const HandleDownload = async () => {
    if (playlistAddress.trim() !== "") {
      setLoadingData(true);
      const playlist_url = playlistAddress.trim();
      const fetchedReq = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/get-info?playlistAddress=${playlist_url}`
      );
      const reqData = fetchedReq.data;
      setLoadingData(false);
      navigate("/download-list", { state: { data: reqData.data } });
    }

    setPlaylistAddress(userInput);
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
