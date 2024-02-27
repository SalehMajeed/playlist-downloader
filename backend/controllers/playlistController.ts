import services from '../services/index';

import { Response, Request } from "express";

function getPlaylistController(req: Request, res: Response) {
    services.playlistService.getPlaylistService(req, res);
}

function getDownloadPlaylistController(req: Request, res: Response) {
    services.playlistService.getDownloadPlaylistService(req, res);
}

export default { getPlaylistController, getDownloadPlaylistController };
