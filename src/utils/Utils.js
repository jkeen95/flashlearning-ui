import {Auth} from "aws-amplify";

async function checkUser() {
    return await Auth.currentAuthenticatedUser()
        .then(user => console.log(typeof user))
        .catch()
}

let currentUser = {}


async function checkSession() {
    try {
       return await Auth.currentSession();
    } catch (err) {
        console.log('error happened', err)
    }
}

function getCurrentUser() {
    checkUser();
    console.log("currentUser: " + JSON.stringify(currentUser));
    return currentUser;
}

async function signOut() {
    try {
        await Auth.signOut();
        return true;
    } catch (error) {
        console.log('error signing out: ', error);
    }
}

function callSignOut() {
    signOut();
}

export {checkUser, getCurrentUser, checkSession, callSignOut}