import React, { useState, useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { addUser, selectUser } from '../../src/features/userSlice';
import { getDocs, collection, collectionGroup, query, orderBy, where, doc, setDoc, serverTimestamp, deleteDoc, onSnapshot } from 'firebase/firestore'
import { db } from "../../src/firebase";


// export default async function handler(req: any, res: any) {
const handler = async (req: any, res: any) => {
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

    // const [customerId, setCustomerId] = useState<string>('');
    // const [customerId, setCustomerId] = React.useState('')
    // const [name, setName] = React.useState('名無しさん')
    // const dispatch = useDispatch();

    if (req.method === 'POST') {
        try {
            const customer = await stripe.customers.create();
            console.log('customer:::::', customer.id)
            // setDoc(doc(db, 'users', `${user.uid}`), { costomerId: `${customer.id}` }, { merge: true })
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                mode: 'setup',
                customer: customer.id,
                // success_url: 'https://example.com/success?session_id={CHECKOUT_SESSION_ID}',
                success_url: `${req.headers.origin}/?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: 'https://example.com/cancel',

            });

            const setupIntent = await stripe.setupIntents.create({
                payment_method_types: ['card'],
                customer: customer.id,
                // name: customer.name,
                // client_secret: setupIntent.client_secret
            })
            // const user = useSelector(selectUser);
            setDoc(doc(db, 'users', `Ud4659ddaee321b794de35beeb141cec6`), { costomerId: `${customer.id}`, client_secret: `${setupIntent.client_secret}` }, { merge: true })
            // console.log(user)

            console.log('setupIntent:::::', setupIntent.client_secret)
            // setDoc(doc(db, 'users', `k11111`), { client_secret: `${setupIntent.client_secret}` }, { merge: true })
            // const user = useSelector(selectUser);
            // setDoc(doc(db, 'users', `${user.uid}`), { costomerId: `${customer.id}` }, { merge: true })

            const paymentMethods = await stripe.customers.listPaymentMethods(
                customer.id,
                // 'cus_L8DD9jgN3R3W4x',
                { type: 'card' }
            );

            // const paymentMethod = await stripe.paymentMethods.create({
            //     // type: 'card',
            //     customer: customer.id,
            //     payment_method: paymentMethods.id,
            //     // }, {
            //     // stripeAccount: '{{CONNECTED_ACCOUNT_ID}}',
            // });

            // console.log('paymentMethods', paymentMethods)

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

            res.redirect(303, session.url);

            // const user = useSelector(selectUser);
            // setDoc(doc(db, 'users', `${user.uid}`), { costomerId: `${customer.id}` }, { merge: true })
            // console.log(user)

            console.log('paymentMethodsId:::::', paymentMethods.id)
            // const [customerId, setCustomerId] = React.useState('')
            // setCustomerId(`${customer.id}`)
            // const dispatch = useDispatch();
            // dispatch(addUser(`customerId:${customer.id}`))



        } catch (err: any) {
            res.status(500).json(err.message);
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}

export default handler