import {Auth} from "aws-amplify";

const SignOut = () => {
    return (
        <div>
            {signOut()}
        </div>
    );
};

async function signOut() {
    try {
        await Auth.signOut();
    } catch (error) {
        console.log('error signing out: ', error);
    }
}

export default SignOut;