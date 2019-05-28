import decode from 'jwt-decode';
import axios from '../axios';

export default class AuthHelper {
    login = async (email, password) => {
        return axios.post("/login", {
            email,
            password
        })
        .then( async (res) => {
            await this.setToken(res.data.token);
            return Promise.resolve(res);
        });
    }

    isLoggedIn = () => {
        const token = this.getToken();
        return !!token && !this.isTokenExpired(token)
    }

    isTokenExpired = (token) => {
        try {
            const decoded = decode(token);
            if (decoded.exp < Date.now() / 1000) {
                return true;
            } else 
                return false;
        }
        catch (err) {
            console.log('JWT token expired check failed.');
            return false;
        }
    }

    setToken = (idToken) => {
        localStorage.setItem('id_token', idToken);
    }

    getToken = () => {
        return localStorage.getItem('id_token');
    }

    logout = () => {
        localStorage.removeItem('id_token');
    }

    getConfirm = () => {
        const answer = decode(this.getToken());
        return answer;
    }

    checkStatus = (response) => {
        if (response.status >= 200 && response.status < 300) {
            return response;
        } else {
            var error = new Error(response.statusText);
            error.response =response;
            throw error;
        }
    }
}