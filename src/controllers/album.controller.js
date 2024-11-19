import Album from '../models/album.model.js';
import { searchDeezerAlbums, getAlbumDetails } from '../services/deezerApi.js';
import express from 'express';

const router = express.Router();

// Controller for searching albums
export const searchAlbumsController = async (req, res) => {
  const query = req.query.q;
  if (!query) {
    return res.status(400).json({ success: false, message: 'Query parameter "q" is required.' });
  }

  try {
    const data = await searchDeezerAlbums(query);
    res.json({ success: true, albums: data.data });
  } catch (error) {
    console.error('Error searching albums:', error);
    res.status(500).json({ success: false, message: 'Failed to search albums.' });
  }
};

// Controller to get album details
export const getAlbumDetailsController = async (req, res) => {
  const albumId = req.params.id;
  try {
    const album = await getAlbumDetails(albumId);
    if (!album) {
      return res.status(404).json({ success: false, message: 'Album not found.' });
    }
    res.json({ success: true, album });
  } catch (error) {
    console.error('Error fetching album details:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch album details.' });
  }
};

// Controller to add a new album
export const addAlbumController = async (req, res) => {
  const { title, artist, releaseYear, imageUrl, songs } = req.body;

  if (!title || !artist || !releaseYear || !imageUrl) {
    return res.status(400).json({ success: false, message: 'Title, artist, release year, and image URL are required.' });
  }

  try {
    const newAlbum = new Album({
      title,
      artist,
      releaseYear,
      imageUrl,
      songs,
    });

    await newAlbum.save();
    res.json({ success: true, message: 'Album added successfully', album: newAlbum });
  } catch (error) {
    console.error('Error adding new album:', error);
    res.status(500).json({ success: false, message: 'Failed to add new album.' });
  }
};

// Controller to delete an album
export const deleteAlbumController = async (req, res) => {
  const albumId = req.params.id;

  try {
    const deletedAlbum = await Album.findByIdAndDelete(albumId);
    if (!deletedAlbum) {
      return res.status(404).json({ success: false, message: 'Album not found.' });
    }
    res.json({ success: true, message: 'Album deleted successfully' });
  } catch (error) {
    console.error('Error deleting album:', error);
    res.status(500).json({ success: false, message: 'Failed to delete album.' });
  }
};

// Route to get all albums
export const getAllAlbumsController = async (req, res) => {
  try {
    const albums = await Song.distinct('album'); 

    if (!albums.length) {
      return res.status(404).json({ success: false, message: 'No albums found.' });
    }

    res.json({ success: true, albums });
  } catch (error) {
    console.error('Error fetching all albums:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch all albums.' });
  }
};

export default router;