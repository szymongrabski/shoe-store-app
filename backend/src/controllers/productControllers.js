const neo4jDriver = require('../neo4jConfig');
const helperFunctions = require('../utils/helperFunctions')

async function getAllProducts(req, res) {
    const session = neo4jDriver.session();
    try {
        const result = await session.run(
            `MATCH (p:Product) RETURN p`
        );

        const products = result.records.map(record => {
            return {
                id: record.get('p').identity.low,
                properties: record.get('p').properties
            };
        });

        session.close();

        res.status(200).json({ products });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function getProductById(req, res) {
    const productId = parseInt(req.params.id); 

    const session = neo4jDriver.session(); 

    const productExists = await helperFunctions.checkIfProductExists(productId);
    if(!productExists) {
        return res.status(404).json({error: 'Product does not exist'});
    }

    try {
         const result = await session.run(
            `
            MATCH (p:Product)
            WHERE id(p) = $productId
            RETURN p
            `,
            { productId }
        );

        session.close(); 

        const product = {
            id: result.records[0].get('p').identity.low,
            properties: result.records[0].get('p').properties
        };

        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function addProduct(req, res) {
    const session = neo4jDriver.session();
    const { title, image, brand, price, description, color, sex, sizes } = req.body;

    if (!title || !image || !brand || !price || !description || !color || !sex || !sizes) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    if (!helperFunctions.validateString(title)) {
        return res.status(400).json({error: 'Invalid title'});
    }

    if (!helperFunctions.validateUrl(image)) {
        return res.status(400).json({error: 'Invalid image URL'});
    }

    if (!helperFunctions.validateString(brand)) {
        return res.status(400).json({error: 'Invalid brand'});
    }

    if (!helperFunctions.validateString(description)) {
        return res.status(400).json({error: 'Invalid description'});
    }

    if (!helperFunctions.validatePrice(price)) {
        return res.status(400).json({ error: 'Price should be a positive number' });
    }

    if (!helperFunctions.validateSizes(sizes)) {
        return res.status(400).json({error: 'Invalid sizes'});
    }

    if (!helperFunctions.validateSex(sex)) {
        return res.status(400).json({error: 'Invalid sex'});
    }
    
    try {
        const result = await session.run(
            `
            CREATE (p:Product {
                title: $title,
                image: $image,
                brand: $brand,
                price: $price,
                description: $description,
                color: $color,
                sex: $sex
            })
            WITH p
            CREATE (p)-[:HAS_RATING]->(r:Rating {averageRating: 0, totalRatings: 0})
            WITH p
            UNWIND $sizes AS sizeData
            CREATE (p)-[:HAS_SIZE]->(s:Size {size: sizeData.size, amount: sizeData.amount})
            RETURN p
            `,
            { title, image, brand, price, description, color, sex, sizes }
        );

        session.close();

        res.status(201).json({ message: 'Product added to Neo4j' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function deleteProduct(req, res) {
    const productId = parseInt(req.params.id);
    const session = neo4jDriver.session()
    
    const productExists = await helperFunctions.checkIfProductExists(productId);
    if (!productExists) {
        return res.status(404).json({error: 'Product does not exist'});
    }

    try {
        const result = await session.run(
            `
            MATCH (p:Product)-[r]->(d)
            WHERE id(p) = $productId
            DETACH DELETE p, r, d
            `,
            { productId }
        );

        session.close();

        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}


async function updateProduct(req, res) {
    const productId = parseInt(req.params.id)
    const session = neo4jDriver.session()

    const productExists = await helperFunctions.checkIfProductExists(productId);
    if (!productExists) {
        return res.status(404).json({error: 'Product does not exist'});
    }

    try {
        const {title, image, brand, price, description, color, sex, sizes} = req.body;

        let updateQuery = 'MATCH (p: Product) WHERE id(p) = $productId SET ';
        const params = {productId};

        if (title) {
            if (helperFunctions.validateString(title)) {
                updateQuery += 'p.title = $title, ';
                params.title = title;
            } else {
                return res.status(404).json({error: 'Title invalid'});
            }
        }

        if (image) {
            if (helperFunctions.validateUrl(image)) {
                updateQuery += 'p.image = $image, ';
                params.image = image;
            } else {
                return res.status(404).json({error: 'Image invalid'});
            }
        }

        if (brand) {
            if (helperFunctions.validateString(brand)) {
                updateQuery += 'p.brand = $brand, ';
                params.brand = brand;
            } else {
                return res.status(404).json({error: 'Brand invalid'});
            }
        }

        if (price) {
            if (helperFunctions.validatePrice(price)) {
                updateQuery += 'p.price = $price, ';
                params.price = price;
            } else {
                return res.status(404).json({error: 'Price invalid'});
            }
        }

        if (description) {
            if (helperFunctions.validateString(description)) {
                updateQuery += 'p.description = $description, ';
                params.description = description;
            } else {
                return res.status(404).json({error: 'Description invalid'});
            }
        }

        if (color) {
            if (helperFunctions.validateString(color)) {
                updateQuery += 'p.color = $color, ';
                params.color = color;
            } else {
                return res.status(404).json({error: 'Color invalid'});
            }
        }

        if (sex) {
            if (helperFunctions.validateSex(sex)) {
                updateQuery += 'p.sex = $sex, ';
                params.sex = sex;
            } else {
                return res.status(404).json({error: 'Sex invalid'});
            }
        }

        updateQuery = updateQuery.slice(0, -2);

        const result = await session.run(updateQuery, params);

        session.close();

        res.status(200).json({message: 'Product updated successfully'})

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getAllProducts,
    getProductById,
    addProduct,
    deleteProduct,
    updateProduct
}