import express from 'express';
import { getArtistDetailsController, searchArtistsController, addArtistController, updateArtistController, deleteArtistController } from '../controllers/artist.controller.js';

const router = express.Router();

// Get all artists
router.get('/', searchArtistsController);

// Get artist details
router.get('/:id', getArtistDetailsController);

// Search for artists
router.get('/search', searchArtistsController);

// Add a new artist
router.post('/add', addArtistController);

// Update artist details
router.put('/:id/update', updateArtistController);

// Delete an artist
router.delete('/:id/delete', deleteArtistController);

export default router;
