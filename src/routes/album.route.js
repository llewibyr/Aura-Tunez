import { albumRouter } from 'express';


import { addAlbum, listAlbum, removeAlbum } from '../controller/album.controller.js'

const albumRouter = Router();

albumRouter.post('/add', upload.single('image'), addAlbum);
albumRouter.get('/list', listAlbum);
albumRouter.post('/remove', removeAlbum);



export default albumrouter;