const neo4jDriver = require('../neo4jConfig');
const helperFunctions = require('../utils/helperFunctions')


async function getRating(req, res) {
    const productId = parseInt(req.params.id)
    const session = neo4jDriver.session();

    try {
        const result = await session.run(
            `
            MATCH (p: Product)-[HAS_RATING]->(r:Rating)
            WHERE id(p) = $productId
            RETURN r
            `,
            {productId}
        )

        if (result.records.length === 0) {
            return res.status(404).json({ error: 'Rating not found' });
        }

        session.close()

        const ratingId = result.records[0].get('r').identity.low;
        const ratingProperties = result.records[0].get('r').properties

        const rating = {
            id: ratingId,
            properties: ratingProperties
        }

        return res.status(200).json(rating)

    } catch (error) {
        return res.status(500).json({error: error.message})
    }

}

module.exports = {
    getRating,
}