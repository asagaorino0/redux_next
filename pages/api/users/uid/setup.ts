import React, { useState, useEffect } from 'react';
import { getDocs, collection, collectionGroup, query, orderBy, where, doc, setDoc, serverTimestamp, deleteDoc, onSnapshot, addDoc } from 'firebase/firestore'
import { db } from "../../../../src/firebase";
import { UserState } from "../../../../src/types/user";
import { selectTomare } from '../../../../src/features/tomareSlice';
import { useDispatch, useSelector } from 'react-redux';
const handler = async (req: any, res: any) => {
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    const tomare = useSelector(selectTomare);
    if (req.method === 'POST') {
        try {
            const uid = req.query.uid
            console.log('props:', '===========')
            console.log('props:', uid)
            // setDoc(doc(db, 'yoyakuPey'), { yoyakuId: { yoyakuId } }, { merge: true })
            // const customer = await stripe.customers.create();

            const session = await stripe.checkout.sessions.create({
                line_items: [
                    {
                        // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
                        price: 'price_1KT7IZIeKRfM8LCe7573kMRN',
                        // quantity: 10,
                        quantity: `${tomare.quantity}`,

                    },
                ],
                mode: 'payment',
                success_url: `${req.headers.origin}/?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: `${req.headers.origin}/?canceled=true`,
            }); console.log('session', session)
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
            // console.log('paymentMethod:::', paymentMethod.charges)
            // const paymentIntent = await stripe.paymentIntents.create({
            //     amount: 500,
            //     currency: 'jpy',
            //     customer: customer.id,
            //     payment_method: paymentMethod.id,
            //     off_session: true,
            //     confirm: true,
            // }); console.log('paymentIntent:::::', paymentIntent)
            // console.log('id::::', paymentIntent.amount)
            // console.log('id::::', paymentIntent.id)
            // setDoc(doc(db, 'yoyaku'), { pey: paymentIntent.amount, yoyakuId, }, { merge: true })
            // setDoc(doc(db, 'yoyakuPey'), { yoyakuId: { yoyakuId } }, { merge: true })

            // setDoc(doc(db, 'yoyakuPay', `${yoyakuId}`), { pey: `${paymentIntent.amount}`, priId: `${paymentIntent.id}`, yoyakuId: `${yoyakuId}` }, { merge: true })
            // const session = await stripe.checkout.sessions.create({
            //     line_items: [
            //         {
            //             // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
            //             price: process.env.NEXT_PUBLIC_STRIPE_PRODUCT_KEY,
            //             quantity: 1,
            //         },
            //     ],
            //     mode: 'payment',
            //     success_url: `${req.headers.origin}/?success=true`,
            //     cancel_url: `${req.headers.origin}/?canceled=true`,
            // });
            // useEffect(() => {
            //     const fetchUser = async () => {
            //         const q = query(collection(db, 'users'), where("uid", "==", uid));
            //         const snapshot = await getDocs(q)
            //         const userData = snapshot.docs.map(
            //             (doc) => ({ ...doc.data() } as UserState))
            //         console.log('userData:', userData)
            //         // dispatch(addUser(userData))
            //         // setUserProfile(userData)
            //     }
            //     fetchUser()
            //     // fetchTomare()
            //     // console.log('User:', user)
            //     // console.log('tomare:', tomare)
            // }, []);

            // setDoc(doc(db, 'yoyakuPey'), { pey: paymentIntent.amount }, { merge: true })
            res.redirect(303, session.url);

            // res.redirect(303, "https://pay.stripe.com/receipts/acct_1JdlUwIeKRfM8LCe/ch_3KUn1iIeKRfM8LCe2WRisFGa/rcpt_LB9LEwgb88WXEl4YPJdBw2nfquGoW31");
            // setDoc(doc(db, 'yoyakuPey', yoyakuId), { pey: paymentIntent.amount }, { merge: true })

        } catch (err: any) {
            res.status(500).json(err.message);
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method Not Allowed');
    }
}
export default handler