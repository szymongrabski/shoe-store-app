const validUrl = require('valid-url')

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

function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

function validateDeliveryType(deliveryType) {
    const validTypes = ['paczkomat', 'courier', 'pickup'];
    return validateString(deliveryType) && validTypes.includes(deliveryType);
}



module.exports = {
    validateString,
    validateSizes,
    validatePrice,
    validateUrl,
    validateSex,
    validateEmail,
    validateDeliveryType,
}
