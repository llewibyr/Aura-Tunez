import { songRouter } from 'express';

const router = Router();

import { addSong, listSong, removeSong } from "../controller/song.controller.js";


songRouter.post('/add', upload.fields([{ name: 'image', maxCount: 1}, { name: 'audio', maxCount: 1}]), addSong);
songRouter.get('/list', listSong);
songRouter.post('/remove', removeSong);

export default songRouter;