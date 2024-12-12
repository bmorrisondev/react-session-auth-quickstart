import express from 'express';
import path from 'path';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();

import { createProxyMiddleware } from 'http-proxy-middleware';
import authRoutes from './routes/auth';
// import { requireAuth } from './middleware/auth';

console.log(`NODE_ENV: ${process.env.NODE_ENV}`);

const app = express();
const PORT = process.env.PORT || 3000;
const VITE_PORT = process.env.VITE_PORT || 5173;

// Middleware
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? process.env.FRONTEND_URL 
    : 'http://localhost:5173',
  credentials: true
}));
app.use(cookieParser());
app.use(express.json());

// API routes
app.use('/api', (req, res, next) => {
  console.log(`API Request: ${req.method} ${req.url}`);
  next();
});

// Public routes
app.use('/api/auth', authRoutes);

// Protected routes
// Example: app.use('/api/articles', requireAuth, articlesRouter);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Development: Proxy all non-API requests to Vite dev server
if (process.env.NODE_ENV !== 'production') {
  app.use(
    '/',
    createProxyMiddleware({
      target: `http://localhost:${VITE_PORT}`,
      changeOrigin: true,
      ws: true,
      // Don't proxy /api requests
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      filter: (pathname: string) => !pathname.startsWith('/api'),
    })
  );
} else {
  // Production: Serve static files
  app.use(express.static(path.join(__dirname, './public')));
  
  // Handle React routing in production
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api')) {
      res.sendFile(path.join(__dirname, './public/index.html'));
    }
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  if (process.env.NODE_ENV !== 'production') {
    console.log(`Proxying non-API requests to http://localhost:${VITE_PORT}`);
  }
});
