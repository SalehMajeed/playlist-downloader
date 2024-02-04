import services from "../services/index.js";

function getPlaylistController(req, res) {
  services.playlistService.getPlaylistService(req, res);
}

function getDownloadPlaylistController(req, res) {
  services.playlistService.getDownloadPlaylistService(req, res);
}

export default { getPlaylistController, getDownloadPlaylistController };
