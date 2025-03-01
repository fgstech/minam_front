import axios from 'axios';

export default class UserAPI {
    static getProfile(id) {
        return new Promise((resolve, reject) => {
            axios.get(`/api/user/profile/${id}`)
                .then(res => resolve(res.data))
                .catch(err => reject(err))
        });
    }
} 