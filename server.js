const express = require('express');
const app = express();

//routes
app.get('/', (req, res) => {
  res.send('Hello node api');
});

app.listen(8080, () => {
  console.log('node api app is running on port 8080');
});
