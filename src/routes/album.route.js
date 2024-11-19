import express from 'express';
import { getAlbumDetailsController, searchAlbumsController, addAlbumController, deleteAlbumController, getAllAlbumsController } from '../controllers/album.controller.js';

const router = express.Router();

//get all albums
router.get('/albums', getAllAlbumsController);

// Get album details
router.get('/:id', getAlbumDetailsController);

// Search for albums
router.get('/search', searchAlbumsController);

// Add a new album
router.post('/add', addAlbumController);

// Delete an album
router.delete('/:id/delete', deleteAlbumController);

export default router;
