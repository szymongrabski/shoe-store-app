const PORT = 8000
const express = require('express');
const app = express();
const productRoutes = require('./routes/productRoutes')
const reviewsRoutes = require('./routes/reviewsRoute')

app.use(express.json());

app.use('/api', productRoutes)
app.use('/api', reviewsRoutes)

app.listen(PORT, () => console.log('Server running on Port ' 
+ PORT))
