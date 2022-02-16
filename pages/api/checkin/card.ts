import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux';
// import { addUser, selectUser } from '../../src/features/userSlice';
import { getDocs, collection, collectionGroup, query, orderBy, where, doc, setDoc, serverTimestamp, deleteDoc, onSnapshot } from 'firebase/firestore'
import { db } from "../../../src/firebase";


// export default async function handler(req: any, res: any) {
// const handler = async ({ query: { uid } }: { query: { uid: string } }, req: any, res: any) => {
const handler = async (req: any, res: any) => {
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    // const [customerId, setCustomerId] = useState<string>('');
    // const [customerId, setCustomerId] = React.useState('')
    // const [name, setName] = React.useState('名無しさん')
    // const dispatch = useDispatch();

    if (req.method === 'POST') {
        try {
            const uid = req.query.uid
            const customer = await stripe.customers.create();
            console.log('props:', '===========')
            console.log('customer:', customer.id)
            console.log('props:', uid)

            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                mode: 'setup',
                customer: customer.id,
                success_url: `${req.headers.origin}/?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: 'https://example.com/cancel',

            });

            const setupIntent = await stripe.setupIntents.create({
                payment_method_types: ['card'],
                customer: customer.id,
                // name: customer.name,
                // client_secret: setupIntent.client_secret
            })
            console.log('props:', '===========')
            setDoc(doc(db, 'users', uid), { costomerId: `${customer.id}`, client_secret: `${setupIntent.client_secret}` }, { merge: true })
            console.log('setupIntent:', setupIntent.payment_method)

            const paymentMethod = await stripe.paymentMethods.create({
                type: 'card',
                card: {
                    number: '4242424242424242',
                    exp_month: 2,
                    exp_year: 2023,
                    cvc: '314',
                },
            });
            console.log('paymentMethod:', paymentMethod.id)
            console.log('paymentMethod.mathod:', paymentMethod.payment_method)
            console.log('paymentMethods.method:', stripe.paymentMethods.payment_method)
            console.log('paymentMethods:', stripe.paymentMethods)
            setDoc(doc(db, 'users', uid), { paymentMethodd: `${paymentMethod.id}` }, { merge: true })
            // const paymentMethod = await stripe.paymentMethods.create({
            //     type: 'card',
            //     customer: customer.id,
            //     // payment_method: paymentMethods.id,
            //     // }, {
            //     // stripeAccount: '{{CONNECTED_ACCOUNT_ID}}',
            // });

            // console.log('paymentMethod=======', paymentMethod)
            // console.log('paymentMethod.id======', paymentMethod.id)

            // const paymentIntent = await stripe.paymentIntents.create({
            //     amount: 1099,
            //     currency: 'jpy',
            //     customer: customer.id,
            //     // payment_method_types: ['card'],
            //     // payment_method: '{{PAYMENT_METHOD_ID}}',
            //     payment_method: paymentMethod.id,
            //     off_session: true,
            //     confirm: true,
            // }); console.log(paymentIntent)
            // const [customerId, setCustomerId] = useState<string>('');
            console.log('props:', '===========')

            res.redirect(303, session.url);
            console.log('props:', '===========')


        } catch (err: any) {
            res.status(500).json(err.message);
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}

export default handler