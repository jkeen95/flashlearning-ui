import {Authenticator} from '@aws-amplify/ui-react';

const Login = () => {
    return (
        <Authenticator signUpAttributes={[
              'birthdate',
              'email',
              'name',
            ]}>
         </Authenticator>
    );
};

export default Login;