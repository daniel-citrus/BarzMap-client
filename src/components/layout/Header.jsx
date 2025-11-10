import LoginButton from '../auth/Login';
import LogoutButton from '../auth/Logout';
import { useAuth0 } from '@auth0/auth0-react';

const Header = () => {
    const { isAuthenticated } = useAuth0();
    return <>{isAuthenticated ? <LogoutButton /> : <LoginButton />}</>;
};

export default Header;
