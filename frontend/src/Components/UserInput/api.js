import axios from "axios";
import { generateApiUrl } from "../../Utils";

async function fetchMetadatalist(playlistLink) {
  const requestBody = {};
  const { data } = await axios.get(generateApiUrl(playlistLink), requestBody);
  return data;
}

async function download(playlistLink, dataArr) {
  // console.log(playlistLink, dataArr);

  try {
    // const requestBody = {
    //   dataArr,
    // };

    console.log(generateApiUrl(playlistLink));

    const data = await axios.post(generateApiUrl(playlistLink), dataArr);
    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  }
}

export { fetchMetadatalist, download };
