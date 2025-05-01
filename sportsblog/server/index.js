const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('../routes/userRoutes');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('YOUR_MONGODB_URI', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.use('/api', userRoutes);

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});
