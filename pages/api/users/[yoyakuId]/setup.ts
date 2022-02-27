import { getDocs, collection, collectionGroup, query, orderBy, where, doc, setDoc, serverTimestamp, deleteDoc, onSnapshot, addDoc } from 'firebase/firestore'
import { db } from "../../../../src/firebase";
import { TomareState } from "../../../../src/types/tomare";

const handler = async (req: any, res: any) => {
    require('dotenv').config();
    const yoyakuId = req.query.yoyakuId
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    if (req.method === 'POST') {
        try {
            const yoyakuId = req.query.yoyakuId
            console.log('props:', '===========')
            console.log('props_yoyakuId:', yoyakuId)
            const q = query(collectionGroup(db, 'tomare'), where("yoyakuId", "==", yoyakuId));
            const snapshot = await getDocs(q)
            const tomareData = snapshot.docs.map(
                (doc) => ({ ...doc.data(), }) as TomareState)
            // console.log('props:', '===========')
            // const quantity =
            //     tomareData.map((data: any) => data.quantity)
            // const uid =
            //     tomareData.map((data: any) => data.uid)
            // const tomareId =
            //     tomareData.map((data: any) => data.tomareId)
            // const chip =
            //     tomareData.map((data: any) => data.chip)
            // const chipUrl =
            //     `process.env.STRIPE_SECRET_${tomareData.map((data: any) => data.chip)}`
            // console.log('tomare::::', process.env.STRIPE_SECRET_500, `process.env.STRIPE_SECRET_${chip}`)

            // const customer = await stripe.customers.create();
            const session = await stripe.checkout.sessions.create({
                line_items: [
                    {
                        // price: process.env.NEXT_PUBLIC_STRIPE_PRODUCT_KEY,
                        price: 'price_1KT7IZIeKRfM8LCe7573kMRN',
                        quantity: 10,
                        // quantity: quantity as any * 1,
                    },],
                payment_method_types: ['card'],
                mode: 'payment',
                success_url: `${req.headers.origin}/?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${req.headers.origin}/?canceled=true`,
                // shipping_rates: ['shr_1KXTkfIeKRfM8LCeTmYH0csl']
                // shipping_amount: 500 ×
                // shipping_rates: [chipUrl]
                shipping_rates: [process.env.STRIPE_SECRET_500]
                // shipping_rates: [`process.env.STRIPE_SECRET_${chip}`]
            });
            console.log('session', session)
            console.log('session.payment_intent', session.payment_intent)
            console.log('session.id', session.id)

            // const paymentMethod = await stripe.paymentMethods.create({
            //     type: 'card',
            //     card: {
            //         number: '4242424242424242',
            //         exp_month: 2,
            //         exp_year: 2023,
            //         cvc: '314',
            //     },
            // });
            // console.log('paymentMethod:::', paymentMethod)
            // const paymentIntent = await stripe.paymentIntents.create({
            //     amount: session.amount_total,
            //     currency: 'jpy',
            //     customer: customer.id,
            //     payment_method: paymentMethod.id,
            //     off_session: true,
            //     confirm: true,
            // });
            // const receipt_url =
            //     paymentIntent.charges.data.map((data: any) => data.receipt_url)
            // console.log('paymentIntent*****************', paymentIntent)
            // setDoc(doc(db, 'users', `${uid}`, 'tomare', `${tomareId}`), { cusPay: session.amount_total, cusId: session.id, cusPayId: session.payment_intent }, { merge: true })
            // setDoc(doc(db, 'yoyakuPay', `${yoyakuId}`), { uid: `${uid}`, receipt_url, yoyakuId: yoyakuId, cusPay: session.amount_total, cusId: session.id, cusPayId: session.payment_intent, amount: session.amount_total }, { merge: true })
            ////////////////////////////////////////////////////////////////////////
            // const session = await stripe.checkout.sessions.create({
            //     line_items: [
            //         {
            //             price: process.env.NEXT_PUBLIC_STRIPE_PRODUCT_KEY,
            //             quantity: 1,
            //         },
            //     ],
            //     mode: 'payment',
            //     success_url: `${req.headers.origin}/?success=true`,
            //     cancel_url: `${req.headers.origin}/?canceled=true`,
            // });
            res.redirect(303, session.url)
        } catch (err: any) {
            res.status(500).json(err.message);
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}
export default handler