import express from 'express';
import {
  getSongDetailsController,
  getAllSongsController,
  searchSongsController,
  addSongController,
  updateSongController,
  deleteSongController
} from '../controllers/song.controller.js';

const router = express.Router();

// Get all songs from database
router.get('/', getAllSongsController);

// Get all song details
router.get('/:id', getSongDetailsController);

// Search for songs
router.get('/search', searchSongsController);

// Add a Song
router.post('/add', addSongController);

// Update a Song
router.put('/:id/update', updateSongController);

// Delete a Song
router.delete('/:id/delete', deleteSongController);

export default router;
