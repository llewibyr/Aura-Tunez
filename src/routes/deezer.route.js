import express from 'express';
import { getSongDetails,searchDeezer, getTrackDetails, getArtistDetails } from '../services/deezerApi.js';

const router = express.Router();

// Search for tracks, albums, or artists
router.get('/search', async (req, res) => {
  const query = req.query.q;
  if (!query) {
    return res.status(400).json({ success: false, message: 'Query parameter "q" is required.' });
  }
  try {
    const data = await searchDeezer(query);
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch search results.' });
  }
});

// Get track details and save to DB
router.get('/track/:id', async (req, res) => {
  const trackId = req.params.id;
  try {
    const track = await getTrackDetails(trackId);
    res.json({ success: true, data: track });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch track details.' });
  }
});

// Get artist details and save to DB
router.get('/artist/:id', async (req, res) => {
  const artistId = req.params.id;
  try {
    const artist = await getArtistDetails(artistId);
    res.json({ success: true, data: artist });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch artist details.' });
  }
});






export default router;
