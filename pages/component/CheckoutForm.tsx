import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, selectUser } from '../../src/features/userSlice';
import { db } from "../../src/firebase";
import { getDocs, collection, collectionGroup, query, orderBy, where, doc, setDoc, serverTimestamp, deleteDoc, onSnapshot } from 'firebase/firestore'
import { TomareState } from "../../src/types/tomare";
import { addTomare } from '../../src/features/tomareSlice';
import { UserState } from "../../src/types/user";
import styles from '../../styles/Home.module.css'


const CheckoutForm = (props: any) => {
    const [message, setMessage] = useState<string>('')
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const [userProfile, setUserProfile] = useState<any>([]);
    const [tomare, setTomare] = useState<any>([]);
    useEffect(() => {
        const fetchUser = async () => {
            const q = query(collection(db, 'users'), where("uid", "==", user.uid));
            const snapshot = await getDocs(q)
            const userData = snapshot.docs.map(
                (doc) => ({ ...doc.data() } as UserState))
            console.log('userData:', userData)
            dispatch(addUser(userData))
            setUserProfile(userData)
        }
        fetchUser()
        fetchTomare()
        console.log('User:', user)
        console.log('tomare:', tomare)
    }, []);
    const fetchTomare = async () => {
        const q = query(collection(db, "users", user.uid, 'tomare'), where("uid", "==", user.uid));
        const snapshot = onSnapshot(q, (querySnapshot) => {
            const tomareData = querySnapshot.docs.map(
                (doc) => ({ ...doc.data() } as TomareState))
            // );
            dispatch(addTomare(tomareData))
            setTomare(tomareData)
        });
    }
    const handleSubmit = async () => {
        setMessage('処理中。。。')
        // const result = await POST(`/api/shop/${props.shopId}/buy`, {
        //     customer_id: props.customerId,
        //     item: props.item
        // })

        const confirm_result = window.confirm('選択した商品を購入します。よろしいですか？');

        // if (confirm_result) {
        const paymentMethod = await stripe.paymentMethods.create({
            type: 'card',
            // customer: user.customerId,
            customer: 'cus_L8euSK0HQLBjKg',
            // payment_method: paymentMethods.id,
            // }, {
            // stripeAccount: '{{CONNECTED_ACCOUNT_ID}}',
        });

        console.log('paymentMethod=======', paymentMethod)
        console.log('paymentMethod.id======', paymentMethod.id)
        const paymentIntent = await stripe.paymentIntents.create({
            amount: 999,
            currency: 'jpy',
            // customer: user.customerId,
            customer: 'cus_L8euSK0HQLBjKg',
            payment_method: paymentMethod.id,
            off_session: true,
            confirm: true,
        }); console.log(paymentIntent)

        //     const paymentResult = await stripe.confirmCardPayment({
        //         customer_id: user.customerId,
        //         item: props.item
        //     })
        //     if (paymentResult.error) {
        //         setMessage('失敗しました')
        //     } else {
        //         setMessage('購入しました')
        //     }
        // } else {
        //     setMessage('')
        // }
    }

    return (
        <div onClick={() => handleSubmit()}>
            <h3>商品</h3>
            <form action={`/api/shop/${props.shopId}/buy`} method="POST">
            </form>
            {/* <div>¥{props.item.price}</div> */}
            <div>¥{"100"}</div>
            {message && (
                <div className={styles.title}>{message}</div>
            )}
        </div>
    )
}

export default CheckoutForm