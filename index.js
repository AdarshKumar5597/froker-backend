const express = require('express');
const app = express();
const blogRoutes = require('./routes/blogRoutes');
const connectDB = require('./database');
const cors = require('cors');

require('dotenv').config();

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS
app.use(cors({
  origin: '*',
  methods: 'GET, POST, PUT, DELETE',
  allowedHeaders: 'Content-Type, Authorization, Origin, X-Requested-With, Accept',
}));

// Connect to the database
connectDB();

// Routes
app.use('/', blogRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
