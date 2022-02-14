import React, { useState, useEffect } from 'react';
import { getDocs, collection, collectionGroup, query, orderBy, where, doc, setDoc, serverTimestamp, deleteDoc, onSnapshot, addDoc } from 'firebase/firestore'
import { db } from "../../../../src/firebase";
import { UserState } from "../../../../src/types/user";

const handler = async (req: any, res: any) => {
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

    if (req.method === 'POST') {
        try {
            const yoyakuId = req.query.yoyakuId
            console.log('props:', '===========')
            console.log('props:', yoyakuId)
            // setDoc(doc(db, 'yoyakuPey'), { yoyakuId: { yoyakuId } }, { merge: true })
            const customer = await stripe.customers.create();
            console.log('customer', customer.id)
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                mode: 'setup',
                customer: customer.id,
                // success_url: 'https://example.com/success?session_id={CHECKOUT_SESSION_ID}',

                success_url: `${req.headers.origin}/PagePey?session_id={CHECKOUT_SESSION_ID}`,
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
            console.log('paymentMethod:::', paymentMethod.charges)
            const paymentIntent = await stripe.paymentIntents.create({
                amount: 300,
                currency: 'jpy',
                customer: customer.id,
                payment_method: paymentMethod.id,
                off_session: true,
                confirm: true,
            }); console.log('paymentIntent:::::', paymentIntent)
            console.log('id::::', paymentIntent.amount)
            console.log('id::::', paymentIntent.id)
            // setDoc(doc(db, 'yoyaku'), { pey: paymentIntent.amount, yoyakuId, }, { merge: true })
            // setDoc(doc(db, 'yoyakuPey'), { yoyakuId: { yoyakuId } }, { merge: true })

            setDoc(doc(db, 'yoyakuPay', `${yoyakuId}`), { pey: `${paymentIntent.amount}`, priId: `${paymentIntent.id}`, yoyakuId: `${yoyakuId}` }, { merge: true })
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


            // res.redirect(303, session.url);

            res.redirect(303, "price_1KT7IZIeKRfM8LCe7573kMRN");
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