import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

const clickButton = () => {
    try {
        const auth = getAuth();
        const emailAddress = 'test@example.com'
        const password = 'Password'

        signInWithEmailAndPassword(auth, emailAddress, password)
            .then((user) => {
                console.log('ログイン成功', user)
            })
            .catch((error) => {
                console.error(error)
            })
    } catch (e) {
        console.error(e)
    }
}

function FirebaseAuthSigninButton() {
    return (
        <div>
            <button onClick={clickButton}>ログイン</button>
        </div>
    );
}

export default FirebaseAuthSigninButton;
