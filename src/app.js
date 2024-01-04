const PORT = 8000
const express = require('express');
const neo4jDriver = require('./neo4jConfig');
const app = express();
const productRoutes = require('./routes/productRoutes')

app.use(express.json());

app.use('/api', productRoutes)

app.listen(PORT, () => console.log('Server running on Port ' 
+ PORT))
