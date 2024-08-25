import mongoose from 'mongoose';
import express from 'express';
import config from './config.js'; // Ensure this path is correct

mongoose.Promise = global.Promise;

mongoose.connect(config.mongoUri)
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch((err) => console.error(`Unable to connect to database: ${err.message}`));

const app = express();

// Define a route handler for the root URL
app.get("/", (req, res) => {
  res.send("Hello World");
});

const PORT = config.port;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
