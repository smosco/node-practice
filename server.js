require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const app = express();

//routes
app.get('/', (req, res) => {
  res.send('Hello node api');
});

app.get('/blog', (req, res) => {
  res.send('Blog');
});

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGODB_ID}:${process.env.MONGODB_PASSWORD}@nodeapi.2lpkv26.mongodb.net/?retryWrites=true&w=majority&appName=nodeapi`
  )
  .then(() => {
    app.listen(8080, () => {
      console.log('node api app is running on port 8080');
    });
    console.log('connected mongodb');
  })
  .catch((error) => {
    console.log(error);
  });
