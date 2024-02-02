import express from "express";
import cors from "cors";
import { PythonShell } from "python-shell";

const PORT = 8080;
const app = express();

app.use(cors());

app.get("/getInfo", async (req, res) => {
  // const playlistAddress = req.query.playlistAddress;

  try {
    const playlistAddress =
      "https://www.youtube.com/watch?v=cF2lQ_gZeA8&list=PLC3y8-rFHvwisvxhZ135pogtX7_Oe3Q3A";

    const options = {
      mode: "text",
      pythonPath: "python3",
      pythonOptions: ["-u"],
      scriptPath: "python_app",
      args: [playlistAddress],
    };

    const result = await PythonShell.run("index.py", options);
    res.send(result);
  } catch (err) {
    res.send(err);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
