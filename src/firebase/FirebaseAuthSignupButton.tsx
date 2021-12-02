import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'

const clickButton = () => {
    const emailAddress = 'test@example.com'
    const password = 'Password'

    const auth = getAuth()
    createUserWithEmailAndPassword(auth, emailAddress, password)
        .then((userCredential) => {
            console.log('user created')
        })
        .catch((error) => {
            alert(error.message)
            console.error(error)
        })
}

function FirebaseAuthSignupButton() {
    return (
        <div>
            <button onClick={clickButton}>ユーザー作成</button>
        </div>
    );
}

export default FirebaseAuthSignupButton;