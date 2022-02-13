import styles from '../../../styles/Home.module.css'
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
// import Layout from '../../../component/Layout'

const RegisterPage = (props: any) => {
    console.log(props)
    return (
        <div>
            <main className={styles.main}>
                <h2>店舗画面</h2>
                <div className={styles.grid}>
                    <a href={props.loginLinkUrl} className={styles.card}>
                        <h3>店舗の口座情報を確認する</h3>
                    </a>
                </div>
            </main>
        </div>
    )
}

export const getServerSideProps = async (ctx: any) => {
    const accountId = ctx.query.id
    const loginLink = await stripe.accounts.createLoginLink(accountId)
    return {
        props: {
            loginLinkUrl: loginLink.url,
            shopId: ctx.query.id
        }
    }
}

export default RegisterPage
