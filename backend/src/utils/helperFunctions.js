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

        session.close();

        return result.records.length > 0;
    } catch (error) {
        console.error("Error checking product existence:", error);
        throw error;
    }
}

function validateString(string) {
    if (!string || typeof string !== 'string' || string.trim() === '') {
        return false
    }

    return true
}

function validateSizes(sizes) {
    if (!sizes || !Array.isArray(sizes)) {
        return false;
    }

    for (const size of sizes) {
        if (typeof size !== 'object' || typeof size.size !== 'number' || typeof size.amount !== 'number' || size.size < 0 || size.amount < 0) {
            return false;
        }
    }

    return true;
}

function validatePrice(price) {
    return typeof price === 'number' && price >= 0
}

function validateUrl(url) {
    return validUrl.isUri(url)
}

function validateSex(sex) {
    return validateString(sex) && (sex === 'male' || sex === 'female' || sex === 'unisex');
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

        session.close();

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

        session.close();

        const reviewCount = result.records[0].get('reviewCount').toNumber();
        return reviewCount;
    } catch (error) {
        console.error("Error while counting reviews:", error);
        throw error;
    }
}

module.exports = {
    checkIfProductExists,
    validateString,
    validateSizes,
    validatePrice,
    validateUrl,
    validateSex,
    checkIfReviewExists,
    countProductReviews
}
