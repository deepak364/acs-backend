require('dotenv').config();
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const authRoutes = require('./src/routes/auth.routes');
const campaignRoutes = require('./src/routes/campaign.routes');
const businessRoutes = require('./src/routes/business.routes');

const app = express();
app.set('trust proxy', 1);
const PORT = process.env.PORT || 5000;


const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 200,
  message: { message: 'Too many requests from this IP. Please try again shortly.' },
  standardHeaders: true,
  legacyHeaders: false,
});


app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:3000', credentials: true }));
app.use(express.json({ limit: '10kb' })); 
app.use(globalLimiter);


app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  next();
});


app.use('/api/auth', authRoutes);
app.use('/api/campaigns', campaignRoutes);
app.use('/api/businesses', businessRoutes);


app.get('/api/health', (req, res) => {
  res.json({ status: 'ACS API running ✅', timestamp: new Date() });
});


app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.message);
  res.status(err.status || 500).json({
    message: err.message || 'Something went wrong. Please try again.'
  });
});


app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.method} ${req.path} not found.` });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
