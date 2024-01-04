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


module.exports = {
    checkIfProductExists,
    validateString,
    validateSizes,
    validatePrice,
    validateUrl,
    validateSex
}
