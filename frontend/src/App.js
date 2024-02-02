import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";
import PlaylistTable from "./Components/PlaylistTable";
import UserInput from "./Components/UserInput";

function App() {
  const [playlistAddress, setPlaylistAddress] = useState("");
  const [playlistData, setPlaylistData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      if (playlistAddress !== "") {
        const playlist_url = encodeURIComponent(playlistAddress);
        const fetchedReq = await axios.get(
          `${process.env.REACT_APP_BASE_URL}/getInfo?playlistAddress=${playlist_url}`
        );
        const reqData = fetchedReq.data;
        setPlaylistData(reqData.data);
      }
    };

    fetchData();
  }, [playlistAddress]);

  return (
    <div className="App">
      <UserInput setPlaylistAddress={setPlaylistAddress} />
      <PlaylistTable playlistData={playlistData} />
    </div>
  );
}

export default App;
