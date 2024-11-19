import mongoose from 'mongoose';

const artistSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    picture: {
      type: String,
      required: false,
    },
    fans: {
      type: Number,
      required: false,
    },
    //link: {
     // type: String,
     // required: true,
   // },
  },
  { timestamps: true }
);

const Artist = mongoose.model('Artist', artistSchema);

export default Artist;
