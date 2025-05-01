const express = require('express');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');
const cors = require('cors');
const dotenv = require('dotenv');  // Use dotenv for managing environment variables
const morgan = require('morgan');  // Optional: For logging HTTP requests
const postRoutes = require('./routes/postRoutes');
const userRoutes = require('./routes/userRoutes');
// Initialize dotenv to use environment variables
dotenv.config();

const app = express();

// CORS configuration: Allow requests from the frontend
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',  // Use environment variable or fallback to localhost
  methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allowed HTTP methods
  credentials: true,  // Allow cookies or authentication headers
};

// Apply CORS middleware with the above options
app.use(cors(corsOptions));

// Use morgan for HTTP request logging (optional)
app.use(morgan('tiny'));  // Log only minimal information

app.use(express.json());  // Parse JSON bodies

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/sportsblog', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Use auth route
app.use('/api/auth', authRoute);
app.use('/api/users', userRoutes);
app.use('/api/posts', postRoutes);
// Global error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);  // Log the error stack to the console
  res.status(500).json({ message: 'Something went wrong, please try again later.' });  // Send a generic error message
});

// Start the server
const PORT = process.env.PORT || 5000;  // Use environment variable for port or default to 5000
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
