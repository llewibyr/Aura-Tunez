
import mongoose from 'mongoose';

const albumSchema = new mongoose.Schema({
  title: String,
  artist: String,
  genre: String,
  releaseDate: Date,
  tracks: [{type: mongoose.Schema.Types.ObjectId, ref: 'Song'  }],
  imageUrl: String
});

const Album = mongoose.model('Album', albumSchema);

export default Album;
