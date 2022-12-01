import {Auth, DataStore} from "aws-amplify";


export async function signOut() {
    try {
        await Auth.signOut();
        console.log("signout")
    } catch (error) {
        console.log('error signing out: ', error);
    }
}