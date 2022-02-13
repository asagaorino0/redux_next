const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req: any, res: any) {
    if (req.method === 'POST') {
        try {
            const customer = await stripe.customers.create();
            console.log('customer', customer.id)
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                mode: 'setup',
                customer: customer.id,
                // success_url: 'https://example.com/success?session_id={CHECKOUT_SESSION_ID}',
                success_url: `${req.headers.origin}/?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: 'https://example.com/cancel',
            });
            const paymentMethod = await stripe.paymentMethods.create({
                type: 'card',
                card: {
                    number: '4242424242424242',
                    exp_month: 2,
                    exp_year: 2023,
                    cvc: '314',
                },
            });
            console.log('paymentMethod', paymentMethod.id)
            const paymentIntent = await stripe.paymentIntents.create({
                amount: 999,
                currency: 'jpy',
                customer: customer.id,
                payment_method: paymentMethod.id,
                off_session: true,
                confirm: true,
            }); console.log(paymentIntent)
            res.redirect(303, session.url);

        } catch (err: any) {
            res.status(500).json(err.message);
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}
