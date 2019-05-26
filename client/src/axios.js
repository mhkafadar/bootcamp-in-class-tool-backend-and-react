import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:5000'
})

const JWToken = "Bearer " + localStorage.getItem('id_token');

axios.defaults.headers.common['Authorization'] = JWToken;
axios.defaults.headers.common['Accept'] = 'application/json';
axios.defaults.headers.common['Content-Type'] = 'application/json';

export default instance;