import { useAuth0 } from '@auth0/auth0-react';

const LoginButton = () => {
    const { loginWithRedirect: login } = useAuth0();

    return <button onClick={() =>
        login({ authorizationParams: { screen_hint: "signup" } })
    }>Log In</button>;
};

export default LoginButton;
