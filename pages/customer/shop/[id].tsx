import React from "react";
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
// import { CustomerState } from '../../../src/types/customer'
import styles from '../../../styles/Home.module.css'
import CheckoutForm from '../../component/CheckoutForm'
// const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const RegisterPage = (props: any) => {
    // const { CustomerState } = React.useContext(CustomerContext)

    const stripePromise = loadStripe(
        'pk_test_51JdlUwIeKRfM8LCelTFny3MzSaui9gqP0ZnZwB16Kv9AxVnLwr8UkugHmiaHV8wQyhbXiZnw7ozQE47SZH058Uss00l7jX4hKz',
        // process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
        { stripeAccount: props.shopId }
    )

    return (
        <div>
            <main className={styles.main}>
                <h2>商品一覧</h2>
                <Elements stripe={stripePromise}>
                    <div className={styles.grid}>
                        {props.itemList.map((item: any, index: any) =>
                            <div className={styles.card} key={index}>
                                {/* <CheckoutForm item={item} customerId={user.customerId} shopId={props.shopId} /> */}
                            </div>
                        )}
                    </div>
                </Elements>
            </main>
        </div>
    )
}

export const getServerSideProps = async (ctx: any) => {
    const itemList = [
        {
            name: 'キノコのかさ',
            price: 100,
        },
        {
            name: 'キノコのスツール',
            price: 200
        },
        {
            name: 'キノコのかべがみ',
            price: 300
        },
    ]

    return {
        props: {
            itemList: itemList,
            shopId: ctx.query.id
        }
    }
}

export default RegisterPage