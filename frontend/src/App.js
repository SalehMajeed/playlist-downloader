import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import "./App.css";
import PlaylistTable from "./Components/PlaylistTable";
import UserInput from "./Components/UserInput";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<UserInput />} />
          <Route path="/download-list" element={<PlaylistTable />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
