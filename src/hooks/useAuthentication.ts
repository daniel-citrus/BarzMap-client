import { useAuth0 } from '@auth0/auth0-react';
import { useState, useEffect } from 'react';
import { AuthenticatedUserDetails } from '../types/authentication';

const useAuthentication = () => {
    const { user, getAccessTokenSilently } = useAuth0();
    const [userToken, setUserToken] = useState<string | null>(null);
    const [barzUser, setBarzUser] = useState<AuthenticatedUserDetails | null>(null);

    // Fetch access token
    useEffect(() => {
        async function fetchData() {
            try {
                const accessToken = await getAccessTokenSilently();
                setUserToken(accessToken);
            } catch (e) {
                console.error('useAuthentication Error: ', e);
            }
        }

        fetchData();
    }, [user, getAccessTokenSilently]);

    // User login sequence
    useEffect(() => {
        async function processUser() {
            const baseUrl = import.meta.env.VITE_BACKEND_API || 'http://127.0.0.1:8000';
            const url = new URL(`${baseUrl}/api/events/`);
            const payload = {
                userToken,
                auth0Id: user?.user_id,
                firstName: user?.given_name,
                lastName: user?.family_name,
                profile_picture_url: user?.picture,
                email: user?.email,
            }

            try {
                console.log('helloo')
                const response = await fetch(url.toString(), {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${userToken}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload),
                });

                const barzUserResponse = await response.json();
                setBarzUser(barzUserResponse)

            } catch (e) {
                console.error('Login sequence failed:', e);
            }
        }

        processUser();

    }, [user, userToken])

    return { userToken, barzUser };
};

export default useAuthentication;
