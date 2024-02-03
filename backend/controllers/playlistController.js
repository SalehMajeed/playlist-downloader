import services from "../services/index.js";

function getPlaylistController(req, res) {
  services.playlistService.getPlaylistService(req, res);
}

export default { getPlaylistController };
