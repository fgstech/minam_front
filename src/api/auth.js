import axios from 'axios';

export default class AuthAPI {
    static login(data) {
        return new Promise((resolve, reject) => {
            axios.post(`/api/auth/login`, data)
                .then(res => resolve(res.data))
                .catch(err => reject(err))
        });
    }

    static recovery(email) {
        return new Promise((resolve, reject) => {
            // axios.post(`/api/auth/login`, data)
            //     .then(res => resolve(res.data))
            //     .catch(err => reject(err))
        });
    }
} 