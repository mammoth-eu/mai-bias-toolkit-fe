import { jwtDecode, JwtPayload } from 'jwt-decode';
import { keycloak } from '../main';

class AuthService {
   logout() {
      keycloak
         .logout({ redirectUri: import.meta.env.VITE_LOGOUT_REDIRECT_URI })
         .then(() => console.log('Logout succeed'));
   }

   getCurrentUser() {
      const accessToken = keycloak.token;
      if (accessToken) {
         return (jwtDecode(accessToken) as JwtPayload & { preferred_username: string }).preferred_username;
      } else {
         return '';
      }
   }

   async accessToken() {
      try {
         const refreshed = await keycloak.updateToken(70);
         if (refreshed) {
            console.warn('Token refreshed ' + refreshed);
            return keycloak.token;
         } else {
            console.warn(
               'Token not refreshed, valid for ' +
                  Math.round(
                     (keycloak.tokenParsed?.exp ?? 70) + (keycloak.timeSkew ?? 0) - new Date().getTime() / 1000
                  ) +
                  ' seconds'
            );
            return keycloak.token;
         }
      } catch (e) {
         console.error('Failed to refresh token: ' + e);
         return '';
      }
   }
}

export default new AuthService();
