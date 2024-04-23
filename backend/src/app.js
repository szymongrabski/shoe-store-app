const PORT = 8000
const express = require('express');
const cors = require('cors');
const productRoutes = require('./routes/productRoutes')
const reviewsRoutes = require('./routes/reviewsRoute')
const ratingRoutes = require('./routes/ratingRoutes')
const sizesRoutes = require('./routes/sizesRoutes')
const orderRoutes = require('./routes/orderRoutes')

const app = express();

app.use(cors())
app.use(express.json());

app.use(productRoutes)
app.use(reviewsRoutes)
app.use(ratingRoutes)
app.use(sizesRoutes)
app.use(orderRoutes)

app.listen(PORT, () => console.log('Server running on Port ' 
+ PORT))
