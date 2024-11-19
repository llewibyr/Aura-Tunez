import mongoose from 'mongoose';

const songSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    artist: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Artist',  
    },
    album: {
      type: String, 
      required: false,
    },
    duration: {
      type: Number, 
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    link: {
      type: String, 
      required: true,
    },
  },
  { timestamps: true }
);

const Song = mongoose.model('Song', songSchema);

export default Song;
