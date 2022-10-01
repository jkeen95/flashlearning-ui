import {Auth} from "aws-amplify";

const SignOut = () => {
    signOut()
    localStorage.clear()
    window.location.replace(document.location.origin)
};

async function signOut() {
    try {
        await Auth.signOut();
    } catch (error) {
        console.log('error signing out: ', error);
    }
}

export default SignOut;