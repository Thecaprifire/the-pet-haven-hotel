import decode from 'jwt-decode';

class AuthService {
  getProfile() {
    try {
      const token = this.getToken();
      if (!token) return null; // Return null if no token is found
      return decode(token); // Decode and return the profile
    } catch (error) {
      console.error('Error decoding token in getProfile:', error);
      return null; // Return null if decoding fails
    }
  }

  loggedIn() {
    const token = this.getToken();
    // Check if the token exists and is not expired
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token) {
    if (!token) return true; // If no token, it's considered expired
    try {
      const decoded = decode(token);
      return decoded.exp < Date.now() / 1000; // Check if token is expired
    } catch (error) {
      console.error('Error decoding token in isTokenExpired:', error, 'Token:', token);
      return true; // Assume the token is expired or invalid if decoding fails
    }
  }

  getToken() {
    try {
      return localStorage.getItem('id_token');
    } catch (error) {
      console.error('Error getting token from local storage:', error);
      return null; // Return null if there's an error accessing local storage
    }
  }

  login(idToken) {
    try {
      localStorage.setItem('id_token', idToken);
      console.log("Token stored:", idToken);
      window.location.assign('/'); // Redirect to home page after login
    } catch (error) {
      console.error('Error saving token to local storage during login:', error);
    }
  }

  logout() {
    try {
      localStorage.removeItem('id_token');
      window.location.reload(); // Reload the page to reset the state
    } catch (error) {
      console.error('Error removing token from local storage during logout:', error);
    }
  }
}

export default new AuthService();