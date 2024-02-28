import { Router } from 'express';
import Controller from '../controllers/index.js';

const playlistRoute = Router();

playlistRoute.get(
    '/get-metadata-list',
    Controller.playlistController.getPlaylistController
);

playlistRoute.post(
    '/download',
    Controller.playlistController.getDownloadPlaylistController
);

export default playlistRoute;
