import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import dotenv from 'dotenv';
import contactRouter from './routes/ContactRoutes.js';
import connectionDB from './config/DB.js';

dotenv.config();

connectionDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Setup Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Request logger
app.use((req, res, next) => {
  console.log('Incoming request:', req.method, req.url);
  next();
});

// Set View Engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(contactRouter);

// GET Routes
app.get('/', (req, res) => {
  res.render('home', { title: 'Home' });
});

app.get('/about', (req, res) => {
  res.render('about', { title: 'About Me' });
});

app.get('/skills', (req, res) => {
  res.render('skills', { title: 'Skills' });
});

app.get('/projects', (req, res) => {
  res.render('projects', { title: 'Projects' });
});

app.get('/contact', (req, res) => {
  res.render('contact', { title: 'Contact' });
});

// 404 Route handling
app.use((req, res, next) => {
  res.status(404).render('home', { title: 'Home' }); // default back to home, or show alert
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled server error:', err);
  if (res.headersSent) {
    return next(err);
  }
  res.status(err.status || 500).json({
    success: false,
    message: 'Server error: unable to process request.',
  });
});

// Start server listening
app.listen(PORT, () => {
  console.log(`Server is running in ${process.env.NODE_ENV || 'development'} mode on http://localhost:${PORT}`);
});
