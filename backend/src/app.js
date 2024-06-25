const express = require('express');
const cors = require('cors');
const session = require('express-session');
const keycloak = require("./middleware/keycloak.js");
require('dotenv').config();

const productRoutes = require('./routes/productRoutes');
const reviewsRoutes = require('./routes/reviewsRoute');
const ratingRoutes = require('./routes/ratingRoutes');
const sizesRoutes = require('./routes/sizesRoutes');
const orderRoutes = require('./routes/orderRoutes');

const PORT = 8000;
const app = express();

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: new session.MemoryStore()
}));

app.use(cors({
  origin: '*',
  credentials: true
}));

app.use(express.json());


app.use(keycloak.middleware({
  logout: '/logout',
  admin: '/' 
}));

app.use(productRoutes);
app.use(reviewsRoutes);
app.use(ratingRoutes);
app.use(sizesRoutes);
app.use(orderRoutes);


app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
