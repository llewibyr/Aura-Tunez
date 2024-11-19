import axios from 'axios';
import Artist from '../models/artist.model.js';
import Song from '../models/song.model.js';

const DEEZER_API_URL = 'https://api.deezer.com';

// Search for music (tracks, albums, artists, playlists)
export const searchDeezer = async (query) => {
  try {
    const response = await axios.get(`${DEEZER_API_URL}/search`, { params: { q: query } });
    return response.data;
  } catch (error) {
    console.error('Error fetching search results from Deezer:', error);
    throw error;
  }
};

// Fetch track details by ID and save to the database
export const getTrackDetails = async (trackId) => {
  try {
    const response = await axios.get(`${DEEZER_API_URL}/track/${trackId}`);
    const trackData = response.data;

    // Save or update song
    const song = await Song.findOneAndUpdate(
      { title: trackData.title },
      {
        title: trackData.title,
        artist: trackData.artist.id,
        album: trackData.album.title,
        duration: trackData.duration,
        genre: trackData.genres.data[0]?.name || 'Unknown',
        link: trackData.link,
      },
      { upsert: true, new: true }
    );

    return song;
  } catch (error) {
    console.error('Error fetching track details from Deezer:', error);
    throw error;
  }
};

// Fetch album details by ID
export const getAlbumDetails = async (albumId) => {
  try {
    const response = await axios.get(`${DEEZER_API_URL}/album/${albumId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching album details from Deezer:', error);
    throw error;
  }
};

// Search for albums
export const searchDeezerAlbums = async (query) => {
  try {
    const response = await axios.get(`${DEEZER_API_URL}/search`, { params: { q: query, type: 'album' } });
    return response.data;
  } catch (error) {
    console.error('Error fetching albums from Deezer:', error);
    throw error;
  }
};

// Fetch artist details by ID and save to the database
export const getArtistDetails = async (artistId) => {
  try {
    const response = await axios.get(`${DEEZER_API_URL}/artist/${artistId}`);
    const artistData = response.data;

    const artist = await Artist.findOneAndUpdate(
      { name: artistData.name },
      {
        name: artistData.name,
        picture: artistData.picture_medium,
        fans: artistData.fans,
        link: artistData.link,
      },
      { upsert: true, new: true }
    );

    return artist;
  } catch (error) {
    console.error('Error fetching artist details from Deezer:', error);
    throw error;
  }
};

// Get Song details by ID from Deezer API 
export const getSongDetails = async (songId) => {
  const response = await axios.get(`https://api.deezer.com/track/${songId}`);
  return response.data;
};

// Search for songs Through Deezer API 
export const searchDeezerSongs = async (query) => {
  const response = await axios.get(`https://api.deezer.com/search`, { params: { q: query } });
  return response.data;
};