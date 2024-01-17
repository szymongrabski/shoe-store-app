const {
    checkIfProductsExist,
    checkAvailability,
    removeAmountFromSize,
    createOrderProductRelation
} = require('../utils/helperFunctions');

const {
    validateString,
    validatePrice,
    validateEmail,
    validateDeliveryType,
} = require('../utils/validationFunctions')

const neo4jDriver = require('../neo4jConfig');

async function addOrder(req, res) {
    const session = neo4jDriver.session()
    const {email, order, deliveryType, deliveryFee, totalPrice, address} = req.body;
    const productIds = order.map(product => product.id)
    const tx = session.beginTransaction();
    
    if (!email || !order || !deliveryType || !totalPrice || !address) {
        return res.status(400).json({error: 'All fields are required' })
    }

    const allProductsExist = await checkIfProductsExist(productIds);
    if (!allProductsExist) {
        return res.status(400).json({ error: 'Product does not exist' });
    }

    const allAvailable = await Promise.all(order.map(async (order) => {
        const { id, order: { size } } = order;
        try {
            const amount = await checkAvailability(id, size);
            return amount > 0
        } catch (error) {
            console.error("Error checking availability for order:", error);
            return false; 
        }
    }));
    
    const isAllAvailable = allAvailable.every((availability) => availability);
    
    if (!isAllAvailable) {
        return res.status(400).json({ error: 'Products not available' })
    }
    
    if (!validateEmail(email)) {
        return res.status(400).json({ error: 'Invalid email' });
    }

    if (!validateDeliveryType(deliveryType)) {
        return res.status(400).json({ error: 'Imvalid delivery type' })
    }

    if (!validatePrice(deliveryFee)) {
        return res.status(400).json({ error: 'Invalid delivery fee' })
    }

    if (!validatePrice(totalPrice)) {
        return res.status(400).json({ error: 'Invalid total price' })
    }

    if (!validateString(address)) {
        return res.status(400).json({ error: 'Invalid address' })
    }

    try {
        const deleteSizeAmountsResult = await Promise.all(order.map(async order => {
            const {id, order: {size, amount}} = order
            await removeAmountFromSize(tx, id, size, amount)
        }))

        const createOrderResult = await tx.run(
            `
            CREATE (o:Order {
                email: $email,
                deliveryType: $deliveryType,
                deliveryFee: $deliveryFee,
                totalPrice: $totalPrice,
                address: $address
            })
            RETURN o
            `,
            { email, deliveryType, deliveryFee, totalPrice, address }
        );

        const orderId = createOrderResult.records[0].get('o').identity.low;
        
        const createRelationResults = await Promise.all(order.map(async (order) => {
            const result = await createOrderProductRelation(tx, orderId, order.id, order.order.size, order.order.amount);
            return result[0];
        }));

        if (deleteSizeAmountsResult && createOrderResult && createRelationResults) {
            await tx.commit()
            res.status(201).json({ success: 'Order added successfully' });
        } else {
            await tx.rollback()
            res.status(500).json({ error: 'Failed to add order' });
        }

    } catch (error) {
        await tx.rollback()
        console.error('Error while adding order', error);
        res.status(500).json({ error: 'Failed to add order' });
    } finally {
        session.close()
    }
}

module.exports = {
    addOrder,
}