import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { PythonShell } from "python-shell";

async function getPlaylistService(data, res) {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const backendPath = join(__dirname, "..", "../backend/python_app");
  console.log(backendPath);
  try {
    const playlistAddress =
      "https://www.youtube.com/playlist?list=PLta1A4corVqsTLierHoDrPxlnSSyoZ8J_";

    const options = {
      mode: "text",
      pythonPath: "python",
      pythonOptions: ["-u"],
      scriptPath: backendPath,
      args: [playlistAddress],
    };

    const result = await PythonShell.run("index.py", options);
    const jsonData = JSON.parse(result);
    res.send({ data: jsonData });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
}

export default { getPlaylistService };
