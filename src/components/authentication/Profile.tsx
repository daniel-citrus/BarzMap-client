import { useAuth0 } from '@auth0/auth0-react';

const Profile = () => {
    const { user, isAuthenticated } = useAuth0();
    return (
        isAuthenticated && user && (
            <div>
                <img src={user.picture} alt={user.name ?? 'User'} />
                <h2>{user.name}</h2>
                <p>{user.email}</p>
            </div>
        )
    );
};

export default Profile;
