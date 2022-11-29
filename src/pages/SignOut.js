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
        console.log("signout")
        // await DataStore.clear();
        // console.log("clear")
        // alert("ok")
    } catch (error) {
        console.log('error signing out: ', error);
    }
}

export default SignOut;