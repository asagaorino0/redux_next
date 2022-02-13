const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async (req: any, res: any) => {
    try {
        const customerName = req.body.customerName

        // Stripeに顧客のアカウント情報を登録する
        const customer = await stripe.customers.create({
            name: customerName
        })

        // クレジットカード登録用のセットアップを行う
        const setupIntent = await stripe.setupIntents.create({
            payment_method_types: ['card'],
            customer: customer.id
        });

        // フロント側にclient_secretを渡す
        res.statusCode = 201
        res.json({
            id: customer.id,
            name: customer.name,
            client_secret: setupIntent.client_secret
        })
    } catch (err: any) {
        res.status(500).json(err.message);
    }
}