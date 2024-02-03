import axios from "axios";
import { generateApiUrl } from "../../Utils";

async function fetchMetadatalist(playlistLink) {
  const requestBody = {};
  const { data } = await axios.get(generateApiUrl(playlistLink), requestBody);
  return data
}

export { fetchMetadatalist };
