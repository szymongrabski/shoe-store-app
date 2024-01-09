const neo4jDriver = require('../neo4jConfig');
const helperFunctions = require('../utils/helperFunctions')


async function getReviews(req, res) {
    const productId = parseInt(req.params.id)
    const session = neo4jDriver.session();


    const productExists = await helperFunctions.checkIfProductExists(productId);
    if(!productExists) {
        return res.status(404).json({error: 'Product does not exist'});
    }

    try {
        const result = await session.run(
            `
            MATCH (p: Product)-[HAS_REVIEW]->(r:Review)
            WHERE id(p) = $productId
            RETURN r
            `,
            {productId}
        )

        const reviews = result.records.map(review => {
            return {
                id: review.get('r').identity.low,
                properties: review.get('r').properties
            };
        });

        return res.status(200).json(reviews)

    } catch (error) {
        return res.status(500).json({error: error.message})
    }

}


async function addReview(req, res) {
    const productId = parseInt(req.params.id);
    const { rate, comment } = req.body;

    const session = neo4jDriver.session();

    const productExists = await helperFunctions.checkIfProductExists(productId);
    if (!productExists) {
        return res.status(404).json({error: 'Product does not exist'});
    }


    try {

        if (isNaN(rate) || rate < 1 || rate > 5) {
            return res.status(400).json({ error: 'Rate should be a number between 1 and 5' });
        }

        const reviewResult = await session.run(
            `
            MATCH (p:Product)
            WHERE id(p) = $productId
            CREATE (p)-[:HAS_REVIEW]->(r:Review {rate: $rate, comment: $comment})
            RETURN r
            `,
            { productId: productId, rate, comment }
        );
        const ratingResult = await session.run(
            `
            MATCH (p:Product)
            WHERE id(p) = $productId
            MATCH (p)-[rel:HAS_RATING]->(r:Rating)
            SET r.averageRating = (r.averageRating * r.totalRatings + $rate) / (r.totalRatings + 1)
            SET r.totalRatings = r.totalRatings + 1
            RETURN r
            `,
            { productId: productId, rate }
        );

        const newReview = {
            id: reviewResult.records[0].get('r').identity.low,
            properties: reviewResult.records[0].get('r').properties
        };

        session.close();
        res.status(201).json({ message: 'Review added to Neo4j', review: newReview });
        
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

async function deleteReview(req, res) {
    const productId = parseInt(req.params.productId);
    const reviewId = parseInt(req.params.reviewId);
    const session = neo4jDriver.session();

    const productExists = await helperFunctions.checkIfProductExists(productId);
    if (!productExists) {
        return res.status(404).json({error: 'Product does not exist'});
    }

    const reviewExists = await helperFunctions.checkIfReviewExists(reviewId)
    if(!reviewExists) {
        return res.status(404).json({error: 'Review does not exist'})
    }

    try {
        const deleteReview = await session.run(
            `
            MATCH (r:Review)
            WHERE id(r) = $reviewId
            DETACH DELETE r
            `,
            { reviewId }
        );

        const reviewCount = await helperFunctions.countProductReviews(productId)

        if (reviewCount === 0) {
            const updateRating = await session.run(
                `
                MATCH (p:Product)-[:HAS_RATING]->(r:Rating)
                WHERE id(p) = $productId
                SET r.averageRating = 0,
                r.totalRatings = 0
                `,
                { productId }
            );
        } else {
            const updateRating = await session.run(
                `
                MATCH (p:Product)-[:HAS_REVIEW]->(r:Review)
                WHERE id(p) = $productId
                WITH AVG(r.rate) AS newAverageRating, COUNT(r) AS totalRatings
                MATCH (p:Product)-[rel:HAS_RATING]->(rating:Rating)
                WHERE id(p) = $productId
                SET rating.averageRating = newAverageRating,
                rating.totalRatings = totalRatings
                `,
                { productId }
            );
        }
        
        session.close();

        res.status(200).json({ message: 'Review deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    getReviews,
    addReview,
    deleteReview
}