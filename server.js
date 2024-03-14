require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/projectModel');
const app = express();

// JSON 형식의 요청 본문(body)을 파싱하기 위해 사용
// 클라이언트가 POST 요청을 보낼 때, JSON 형식으로 데이터를 전송하면 Express 애플리케이션이 이를 쉽게 이해하고 JavaScript 객체로 변환
app.use(express.json());

//routes
app.get('/', (req, res) => {
  res.send('Hello node api');
});

app.get('/blog', (req, res) => {
  res.send('Blog');
});

app.post('/product', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
});

app.get('/products', async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

mongoose
  .connect(
    // net/ 다음에 콜렉션 이름을 써주세요 안 쓰면 test라는 이름의 콜렉션이 생김
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
