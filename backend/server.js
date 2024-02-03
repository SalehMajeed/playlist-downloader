import express from "express";
import cors from "cors";
import routes from "./routes/index.js";
import "dotenv/config.js";

const PORT = process.env.PORT || 8080;
const app = express();

app.use(cors());

app.get("/say-hello", (req, res) => {
  res.send("Great");
});

app.use("/playlist", routes.playListRoute);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
