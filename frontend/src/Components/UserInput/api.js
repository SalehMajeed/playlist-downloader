import axios from "axios";
import { generateApiUrl } from "../../Utils";
import "./css/userinput.css";


async function fetchMetadatalist(playlistLink) {
  const requestBody = {};
  const { data } = await axios.get(generateApiUrl(playlistLink), requestBody);
  return data
}

export { fetchMetadatalist };
