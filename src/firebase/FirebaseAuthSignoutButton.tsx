import { getAuth, signOut } from 'firebase/auth'
// import { firebaseConfig } from "../plugins/firebase";

const clickButton = () => {
    // console.log(firebaseConfig)
    console.log('firebase')
    const auth = getAuth()
    signOut(getAuth()).then(() => {
        // Sign-out successful.
        alert('サインアウトしました。')
    }).catch((error) => {
        // An error happened.
        console.error(error)
    })
}

function FirebaseAuthSignoutButton() {
    return (
        <div>
            <button onClick={clickButton}>ログアウト</button>
        </div>
    );
}

export default FirebaseAuthSignoutButton;