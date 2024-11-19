import express from 'express';
import { getSongDetails, searchDeezerSongs } from '../services/deezerApi.js';
import Song from '../models/song.model.js';

const router = express.Router();

// Route to get song details from the database or Deezer

export const getSongDetailsController =  async (req, res) => {
  const songId = req.params.id;

  try {
    
    let song = await Song.findById(songId);

    if (!song) {
      
      song = await getSongDetails(songId);

      if (!song) {
        return res.status(404).json({ success: false, message: 'Song not found on Deezer.' });
      }

      
      const newSong = new Song(song);
      await newSong.save();
      song = newSong;
    }

    res.json({ success: true, song });
  } catch (error) {
    console.error('Error fetching song details:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch song details.' });
  }
};

// Route to search for songs on Deezer
export const searchSongsController =  async (req, res) => {
  const query = req.query.q;

  if (!query) {
    return res.status(400).json({ success: false, message: 'Query parameter "q" is required.' });
  }

  try {
    const data = await searchDeezerSongs(query);
    const songs = data.data.filter(item => item.type === 'track'); 
    res.json({ success: true, songs });
  } catch (error) {
    console.error('Error searching for songs:', error);
    res.status(500).json({ success: false, message: 'Failed to search songs on Deezer.' });
  }
};

// Route to create a new song (optional, if you want to add songs manually to the database)
export const addSongController = async (req, res) => {
  const { title, artist, album, genre, duration, audioUrl, imageUrl } = req.body;

  if (!title || !artist || !album || !audioUrl || !imageUrl) {
    return res.status(400).json({ success: false, message: 'Title, artist, album, audio URL, and image URL are required.' });
  }

  try {
    const newSong = new Song({
      title,
      artist,
      album,
      genre,
      duration,
      audioUrl,
      imageUrl,
    });

    await newSong.save();
    res.json({ success: true, message: 'Song added successfully', song: newSong });
  } catch (error) {
    console.error('Error adding new song:', error);
    res.status(500).json({ success: false, message: 'Failed to add new song.' });
  }
};

// Route to update an existing song (optional)
export const updateSongController = ('/:id/update', async (req, res) => {
  const songId = req.params.id;
  const { title, artist, album, genre, duration, audioUrl, imageUrl } = req.body;

  try {
    const updatedSong = await Song.findByIdAndUpdate(
      songId,
      { title, artist, album, genre, duration, audioUrl, imageUrl },
      { new: true }
    );

    if (!updatedSong) {
      return res.status(404).json({ success: false, message: 'Song not found.' });
    }

    res.json({ success: true, message: 'Song updated successfully', song: updatedSong });
  } catch (error) {
    console.error('Error updating song:', error);
    res.status(500).json({ success: false, message: 'Failed to update song.' });
  }
});

// Route to delete a song (optional)
export const deleteSongController = ('/:id/delete', async (req, res) => {
  const songId = req.params.id;

  try {
    const deletedSong = await Song.findByIdAndDelete(songId);

    if (!deletedSong) {
      return res.status(404).json({ success: false, message: 'Song not found.' });
    }

    res.json({ success: true, message: 'Song deleted successfully' });
  } catch (error) {
    console.error('Error deleting song:', error);
    res.status(500).json({ success: false, message: 'Failed to delete song.' });
  }
});

// Route to get all songs
export const getAllSongsController = async (req, res) => {
  try {
    const songs = await Song.find();  

    if (!songs.length) {
      return res.status(404).json({ success: false, message: 'No songs found.' });
    }

    res.json({ success: true, songs });
  } catch (error) {
    console.error('Error fetching all songs:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch all songs.' });
  }
};

export default router;
