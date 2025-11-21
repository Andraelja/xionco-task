require('dotenv').config();
const express = require('express')
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./routes/index')
const path = require('path');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const port = 3000;

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/login', (req, res) => {
  res.render('admin/login');
});

app.get('/admin', (req, res) => {
  res.render('admin/login');
});

app.get('/logout', (req, res) => {
  res.redirect('/login');
});

app.get('/admin/dashboard', (req, res) => {
  res.render('admin/dashboard');
});

app.get('/admin/produk', (req, res) => {
  res.render('admin/produk');
});

app.get('/admin/pembelian', (req, res) => {
  res.render('admin/pembelian');
});

app.get('/admin/stock', (req, res) => {
  res.render('admin/stock');
});

app.get('/chatbot', (req, res) => {
  res.render('chatbot/index');
});

app.use('/api', router);

const errorHandler = require("./middlewares/errorHandler");
app.use(errorHandler);

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
})
