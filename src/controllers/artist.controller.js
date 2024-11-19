import Artist from '../models/artist.model.js';
import express from 'express';
const router = express.Router();

// Controller to get artist details by ID
export const getArtistDetailsController = async (req, res) => {
  const artistId = req.params.id;
  
  try {
    const artist = await Artist.findById(artistId);
    
    if (!artist) {
      return res.status(404).json({ success: false, message: 'Artist not found.' });
    }

    res.json({ success: true, artist });
  } catch (error) {
    console.error('Error fetching artist details:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch artist details.' });
  }
};

// Controller to search for artists by name
export const searchArtistsController = async (req, res) => {
  const query = req.query.q;

  if (!query) {
    return res.status(400).json({ success: false, message: 'Query parameter "q" is required.' });
  }

  try {
    const artists = await Artist.find({ name: { $regex: query, $options: 'i' } }); 
    res.json({ success: true, artists });
  } catch (error) {
    console.error('Error searching for artists:', error);
    res.status(500).json({ success: false, message: 'Failed to search artists.' });
  }
};

// Controller to add a new artist
export const addArtistController = async (req, res) => {
  const { name, picture, fans, link } = req.body;

  if (!name 
    //|| !link
  ) {
    return res.status(400).json({ success: false, message: 'Name and link are required.' });
  }

  try {
    const newArtist = new Artist({
      name,
      picture,
      fans,
      //link    
    });

    await newArtist.save();
    res.json({ success: true, message: 'Artist added successfully', artist: newArtist });
  } catch (error) {
    console.error('Error adding new artist:', error);
    res.status(500).json({ success: false, message: 'Failed to add new artist.' });
  }
};

// Controller to update artist details
export const updateArtistController = async (req, res) => {
  const artistId = req.params.id;
  const { name, picture, fans, link } = req.body;

  try {
    const updatedArtist = await Artist.findByIdAndUpdate(
      artistId,
      { name, picture, fans, link },
      { new: true }
    );

    if (!updatedArtist) {
      return res.status(404).json({ success: false, message: 'Artist not found.' });
    }

    res.json({ success: true, message: 'Artist updated successfully', artist: updatedArtist });
  } catch (error) {
    console.error('Error updating artist:', error);
    res.status(500).json({ success: false, message: 'Failed to update artist.' });
  }
};

// Controller to delete an artist
export const deleteArtistController = async (req, res) => {
  const artistId = req.params.id;

  try {
    const deletedArtist = await Artist.findByIdAndDelete(artistId);

    if (!deletedArtist) {
      return res.status(404).json({ success: false, message: 'Artist not found.' });
    }

    res.json({ success: true, message: 'Artist deleted successfully' });
  } catch (error) {
    console.error('Error deleting artist:', error);
    res.status(500).json({ success: false, message: 'Failed to delete artist.' });
  }
};

// Route to get all artists
export const getAllArtistsController = async (req, res) => {
  try {
    const artists = await Song.distinct('artist');  // Get distinct artists

    if (!artists.length) {
      return res.status(404).json({ success: false, message: 'No artists found.' });
    }

    res.json({ success: true, artists });
  } catch (error) {
    console.error('Error fetching all artists:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch all artists.' });
  }
};

export default router;