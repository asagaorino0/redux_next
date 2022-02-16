// import { useStripe } from '@stripe/react-stripe-js';
// import { POST } from '../lib/axios'
import React, { useState, useContext } from "react";
import styles from '../styles/Home.module.css'


const CheckoutForm = (props: any) => {
    const [message, setMessage] = useState<string>('')
    const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
    // const stripe = useStripe()

    const handleSubmit = async () => {
        setMessage('処理中。。。')
        // const result = await POST(`/api/shop/${props.shopId}/buy`, {
        //     customer_id: props.customerId,
        //     item: props.item
        // })

        const confirm_result = window.confirm('選択した商品を購入します。よろしいですか？');

        if (confirm_result) {
            const paymentResult = await stripe.confirmCardPayment({
                customer_id: props.customerId,
                item: props.item
            })
            if (paymentResult.error) {
                setMessage('失敗しました')
            } else {
                setMessage('購入しました')
            }
        } else {
            setMessage('')
        }
    }

    return (
        <div onClick={() => handleSubmit()}>
            <h3>商品</h3>
            <form action={`/api/shop/${props.shopId}/buy`} method="POST">
                {/* <section>
                <button type="submit" role="link">
                  Checkout:pay
                </button>
              </section> */}
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