import {Auth, DataStore} from "aws-amplify";

const SignOut = async () => {
    await signOut()
    localStorage.clear()
    window.location.replace(document.location.origin)
    return ""
};

export async function signOut() {
    try {
        await Auth.signOut();
        await DataStore.clear();
    } catch (error) {
        console.log('error signing out: ', error);
    }
}

export default SignOut;