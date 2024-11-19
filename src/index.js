import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';

import { connectDB } from "./config/db.js";




import songRoutes from './routes/song.route.js';
import albumRoutes from './routes/album.route.js';
import artistRoutes from './routes/artist.route.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

app.use('/api/songs', songRoutes);
app.use('/api/albums', albumRoutes);
app.use('/api/artists', artistRoutes);

connectDB();


app.listen(PORT, () => {
    console.log('Server is running on port' + PORT);
    connectDB();
});