import express from 'express';
import dotenv from 'dotenv';

import { connectDB } from "./lib/db.js";




import songRoutes from './routes/song.route.js';
import albumRoutes from './routes/album.route.js';


dotenv.config();

const app = express();
const PORT = process.env.PORT;


app.use(express.json());
app.use(cors());


app.use('/api/songs', songRoutes)
app.use('/api/albums', albumRoutes)




app.listen(PORT, () => {
    console.log('Server is running on port' + PORT);
    connectDB();
});