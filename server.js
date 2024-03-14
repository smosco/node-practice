require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const productRoute = require('./routes/productRoute');
const errorMiddleware = require('./middleware/errorMiddleware');

const app = express();

const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;

// JSON 형식의 요청 본문(body)을 파싱하기 위해 사용
// 클라이언트가 POST 요청을 보낼 때, JSON 형식으로 데이터를 전송하면 Express 애플리케이션이 이를 쉽게 이해하고 JavaScript 객체로 변환
app.use(express.json());
// URL-encoded 형식의 (form-data 같은 key, value 쌍) 요청 본문을 파싱하기 위해 사용
app.use(express.urlencoded({ entended: false }));

//routes

app.use('/api/products', productRoute);

app.get('/', (req, res) => {
  res.send('Hello NODE API');
});

app.get('/blog', (req, res) => {
  res.send('Blog');
});

app.use(errorMiddleware);

mongoose
  .connect(MONGO_URL)
  .then(() => {
    app.listen(PORT, () => {
      console.log('node api app is running on port 8080');
    });
    console.log('connected mongodb');
  })
  .catch((error) => {
    console.log(error);
  });
