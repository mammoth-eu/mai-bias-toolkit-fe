import Keycloak from "keycloak-js";

export async function useKeycloak() {
    const keycloak = new Keycloak({
        url: import.meta.env.VITE_KEYCLOAK_URL,
        realm: import.meta.env.VITE_KEYCLOAK_REALM,
        clientId: import.meta.env.VITE_KEYCLOAK_CLIENT_ID
    });

    try {
        const authenticated = await keycloak.init({onLoad: 'login-required'});
        console.log(`User is ${authenticated ? 'authenticated' : 'not authenticated'}`);
    } catch (error) {
        console.error('Failed to initialize adapter:', error);
    }

    return keycloak;
}