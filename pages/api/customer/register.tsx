import React, { useState, useContext } from "react";
import { Elements } from '@stripe/react-stripe-js'
import stripePromise from '../../lib/loadStripe'
import { CustomerContext } from '../../context/CustomerContext'
import styles from '../../../styles/Home.module.css'
import { useDispatch, useSelector } from 'react-redux';
import { addCustomer, selectCustomer } from '../../../src/features/customerSlice';
import CardInputForm from '../../component/CardInputForm'
// const { customerState } = React.useContext(CustomerContext)

const RegisterPage = () => {
    // const { customerState, customerSetter } = useContext(CustomerContext) 
    // const { customerState } = useContext(CustomerContext)
    const user = useSelector(selectCustomer);
    const [name, setName] = useState<string>('名無しさん')
    const [loading, setLoading] = useState<boolean>(false)

    const registerCustomer = async (e: any) => {
        e.preventDefault()
        setLoading(true)
        // const result = await POST('/api/register-customer', { customerName: name })
        // customerSetter({
        //     name: result.name,
        //     id: result.id,
        //     client_secret: result.client_secret
        // })
        setLoading(false)
    }

    return (
        <div>
            <main className={styles.main}>
                {/* {customerState.client_secret ?  */}
                {/* ( */}
                <div>
                    <h4>こちら↓からクレジットカードを登録してください</h4>
                    {/* <p>**テスト用の番号 "4242424242424242" を使用してください**</p> */}
                    {/* {loading ? (
                        '登録中...'
                    ) : ( */}
                    <Elements stripe={stripePromise}>
                        {/* <CardInputForm clientSecret={customerState.client_secret} customerName={customerState.name} /> */}
                    </Elements >
                    {/* )} */}
                </div>
                {/* ) : ( */}
                <div>
                    <h4>お客様のお名前を登録してください</h4>
                    {/* <form action='/api/register-customer' method="POST" onSubmit={(e) => registerCustomer(e)}> */}
                    <form action='/api/register-customer' method="POST">
                        <section>
                            <input type="text" defaultValue={name} onChange={(e) => setName(e.target.value)}></input>
                            <input type="text" onChange={(e) => setName(e.target.value)}></input>
                            <button type="submit" role="link" >
                                名前を登録する
                            </button>
                        </section>
                    </form>
                </div>
                {/* ) */}
                {/* } */}
            </main>
        </div>
    )
}

export const getServerSideProps = async () => {
    return {
        props: {
        }
    }
}

export default RegisterPage