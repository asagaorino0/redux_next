import styles from '../styles/Home.module.css'

const RegisterPage = () => {
    return (
        <div>
            <main className={styles.main}>
                <form action='/api/create-connect-account' method="POST">
                    <section>
                        <h2>店舗メニュー</h2>
                        <button type="submit" role="link" className={styles.card} >
                            銀行口座を登録する
                        </button>
                    </section>
                </form>
            </main>
        </div>
    )
}

export const getServerSideProps = async () => {
    return {
        props: {}
    }
}

export default RegisterPage

