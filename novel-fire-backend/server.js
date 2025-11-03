import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';

import connectDB from './config/db.js';
import { errorHandler } from './middleware/errorMiddleware.js';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import bookRoutes from './routes/bookRoutes.js';
import chapterRoutes from './routes/chapterRoutes.js';
import reviewRoutes from './routes/reviewRoutes.js';
import libraryRoutes from './routes/libraryRoutes.js';

// __dirname replacement in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();
connectDB();

const app = express();
app.use(morgan('dev'));
app.use(express.json());

// Security & performance
app.use(cors({
  origin: 'http://localhost:5173', // React dev port
  credentials: true
}));
const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 200 });
app.use(limiter);

// Debug: log all incoming requests (helps verify correct server is handling traffic)
app.use((req, res, next) => {
  console.log('[HTTP]', req.method, req.originalUrl);
  next();
});

// Serve uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => res.send('API is running...'));

console.log('[Boot] Mounting /api routes');
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/books', bookRoutes);
app.use('/api/chapters', chapterRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/library', libraryRoutes);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
