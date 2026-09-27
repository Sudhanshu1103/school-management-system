const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

// Load environment variables
dotenv.config({ path: path.join(__dirname, 'config', '.env') });
dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}

// Routes
const contactRoutes = require('./routes/contactRoutes');
const eventRoutes = require('./routes/eventRoutes');
const galleryRoutes = require('./routes/galleryRoutes');
const noticeRoutes = require('./routes/noticeRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const userRoutes = require('./routes/userRoutes');

// Mount routes - supporting both plural and singular forms
app.use('/api/contacts', contactRoutes);
app.use('/api/contact', contactRoutes);

app.use('/api/events', eventRoutes);
app.use('/api/event', eventRoutes);

app.use('/api/galleries', galleryRoutes);
app.use('/api/gallery', galleryRoutes);

app.use('/api/notices', noticeRoutes);
app.use('/api/notice', noticeRoutes);

app.use('/api/teachers', teacherRoutes);
app.use('/api/teacher', teacherRoutes);

app.use('/api/users', userRoutes);
app.use('/api/user', userRoutes);
app.use('/api/auth', userRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({
    status: 'online',
    message: 'School Management System API is running',
    version: '1.0.0',
    endpoints: [
      '/api/contacts',
      '/api/events',
      '/api/galleries',
      '/api/notices',
      '/api/teachers',
      '/api/auth',
      '/api/users'
    ]
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});

module.exports = app;
