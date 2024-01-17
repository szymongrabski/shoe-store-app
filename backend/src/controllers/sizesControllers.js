const neo4jDriver = require('../neo4jConfig');
const helperFunctions = require('../utils/helperFunctions')


async function getSizes(req, res) {
    const productId = parseInt(req.params.id)
    const session = neo4jDriver.session();


    const productExists = await helperFunctions.checkIfProductExists(productId);
    if(!productExists) {
        return res.status(404).json({error: 'Product does not exist'});
    }

    try {
        const result = await session.run(
            `
            MATCH (p: Product)-[HAS_SIZE]->(s:Size)
            WHERE id(p) = $productId
            RETURN s
            `,
            {productId}
        )

        session.close()

        const sizes = result.records.map(record => {
            return {
                id: record.get('s').identity.low,
                properties: record.get('s').properties
            };
        });

        return res.status(200).json(sizes)

    } catch (error) {
        return res.status(500).json({error: error.message})
    }

}

async function getAvailableSizes(req, res) {
    const productId = parseInt(req.params.id)
    const session = neo4jDriver.session();


    const productExists = await helperFunctions.checkIfProductExists(productId);
    if(!productExists) {
        return res.status(404).json({error: 'Product does not exist'});
    }

    try {
        const result = await session.run(
            `
            MATCH (p: Product)-[HAS_SIZE]->(s:Size)
            WHERE id(p) = $productId AND s.amount > 0
            RETURN s
            `,
            {productId}
        )

        session.close()

        const sizes = result.records.map(record => {
            return {
                id: record.get('s').identity.low,
                properties: record.get('s').properties
            };
        });

        return res.status(200).json(sizes)

    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}


module.exports = {
    getSizes,
    getAvailableSizes,
}