
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


export default async (req: any, res: any) => {
    try {
        // フロントからPOSTされた商品データ
        const item = req.body.item
        const stripeConnectedAccountId = req.query.id
        const customerId = req.body.customer_id

        // 顧客のカードの登録情報を取得（複数のカードが登録されている場合は、複数件のカード情報をする）
        const paymentMethodData = await stripe.paymentMethods.list({
            // customer: customerId,
            customer: 'cus_L8DD9jgN3R3W4x',
            type: 'card',
        });

        // 店舗毎(stripeConnectedAccountId)にクレジットカード情報(payment_method)を複製
        const clonedPaymentMethod = await stripe.paymentMethods.create({
            // customer: customerId,
            customer: 'cus_L8DD9jgN3R3W4x',
            payment_method: paymentMethodData.data[0].id,
        }, {
            stripeAccount: stripeConnectedAccountId,
        });

        // 店舗毎(stripeConnectedAccountId)に顧客情報を複製(customer))を複製
        const clonedCustomer = await stripe.customers.create({
            payment_method: clonedPaymentMethod.id,
        }, {
            stripeAccount: stripeConnectedAccountId,
        })

        // 上記の複製したpayment_methodとaccountを使用し、支払いのためのセットアップを行う
        const paymentIntent = await stripe.paymentIntents.create({
            amount: item.price,
            currency: 'jpy',
            payment_method_types: ['card'],
            payment_method: clonedPaymentMethod.id,
            customer: clonedCustomer.id,
            description: `${item.name}の購入代金`,
            metadata: { 'name': item.name, 'price': item.price }
        }, {
            stripeAccount: stripeConnectedAccountId,
        });

        // 支払い処理自体はブラウザから行う必要があるため、決済に必要なキー(client_secret)をフロントに渡す
        res.statusCode = 201
        res.json({
            client_secret: paymentIntent.client_secret
        })
    } catch (err) {
        console.error(err)
        // res.status(500).send({
        //     error: err.message
        // });
    }
}