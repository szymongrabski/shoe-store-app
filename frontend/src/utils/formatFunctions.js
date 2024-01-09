export const formatCurrency = (amount) => {
    if (typeof amount === 'number') {
        const formattedAmount = amount.toFixed(2);
        return `${formattedAmount.replace(/\B(?=(\d{3})+(?!\d))/g, ",")} zł`;
    } else {
        return null
    }
}

export const formatRating = (rating) => {
    let updatedRating = rating;
    if (typeof rating === 'object') {
        updatedRating = rating.low
    } 
    return Math.round(updatedRating * 2) / 2;
}

export const formatNeo4jNumber = (number) => {
    if (typeof number === 'object') {
        return (number.low)
    } else return number
}