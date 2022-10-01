import React from "react";
import {Authenticator} from "@aws-amplify/ui-react";

const Login = () => {
    return (
        <div>
            <Authenticator signUpAttributes={[
                'birthdate',
                'email',
                'name',
            ]}>
                {({ user }) => (
                    <div>
                        {console.log("login" + JSON.stringify(user))}
                        {localStorage.setItem("currentUser", JSON.stringify(user))}
                        {window.location.replace(document.location.origin)}
                    </div>
                )}
            </Authenticator>
        </div>
    );
}

export default Login;