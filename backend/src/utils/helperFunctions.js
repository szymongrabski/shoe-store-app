const neo4jDriver = require('../neo4jConfig');
const validUrl = require('valid-url')

async function checkIfProductExists(productId) {
    const session = neo4jDriver.session();

    try {
        const result = await session.run(
            `
            MATCH (p:Product)
            WHERE id(p) = $productId
            RETURN p
            `,
            { productId }
        );

        return result.records.length > 0;

    } catch (error) {
        console.error("Error checking product existence:", error);
        throw error;
    }
}

async function checkIfProductsExist(ids) {
    for (const id of ids) {
        const productExists = await checkIfProductExists(id);
        if (!productExists) {
            return false; 
        }
    }
    return true; 
}

async function checkAvailability(id, size) {
    const session = neo4jDriver.session();
    const cypherQuery = `
        MATCH (p:Product)-[:HAS_SIZE]->(s:Size {size: $size})
        WHERE id(p) = $id
        RETURN s.amount AS amount
    `;
    try {
        const result = await session.run(cypherQuery, { id, size });
        const amount = result.records[0].get('amount')
        return amount
    } catch (error) {
        console.error("Error while checking availability:", error);
        throw error;
    }
}

async function removeAmountFromSize(tx, productId, size, amount) {
    const cypherQuery = `
        MATCH (p:Product)-[:HAS_SIZE]->(s:Size {size: $size})
        WHERE id(p) = $productId
        SET s.amount = s.amount - $amount
        RETURN p, s
    `;

    try {
        const result = await tx.run(cypherQuery, { productId, size, amount });
        return result.records;
    } catch (error) {
        console.error("Error while removing amount from", error);
        throw error;
    } 
}

async function createOrderProductRelation (tx, orderId, productId, size, amount) {
    const cypherQuery = `
        MATCH (o:Order), (p:Product)
        WHERE id(o) = $orderId AND id(p) = $productId
        CREATE (o)-[:CONTAINS {size: $size, amount: $amount}]->(p)
        RETURN o, p
    `;

    try {
        const result = await tx.run(cypherQuery, {orderId, productId, size, amount})
        return result.records
    } catch (error) {
        console.error("Error while creating Order Product relation", error)
    }
}

async function checkIfReviewExists(reviewId) {
    const session = neo4jDriver.session();

    try {
        const result = await session.run(
            `
            MATCH (r:Review)
            WHERE id(r) = $reviewId
            RETURN r
            `,
            { reviewId }
        );

        return result.records.length > 0;

    } catch (error) {
        console.error("Error checking review existence:", error);
        throw error;
    }
}

async function countProductReviews(productId) {
    const session = neo4jDriver.session();

    try {
        const result = await session.run(
            `
            MATCH (p:Product)-[:HAS_REVIEW]->(r:Review)
            WHERE id(p) = $productId
            RETURN COUNT(r) AS reviewCount
            `,
            { productId }
        );

        const reviewCount = result.records[0].get('reviewCount').toNumber();
        return reviewCount;
    } catch (error) {
        console.error("Error while counting reviews:", error);
        throw error;
    }
}

module.exports = {
    checkIfProductExists,
    checkIfProductsExist,
    checkAvailability,
    removeAmountFromSize,
    createOrderProductRelation,
    checkIfReviewExists,
    countProductReviews
}
