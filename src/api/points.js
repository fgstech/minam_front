import axios from 'axios';

export default class PointsAPI {
    static getWallet(id) {
        return new Promise((resolve, reject) => {
            axios.get(`/api/user/wallet/${id}`)
                .then(res => resolve(res.data))
                .catch(err => reject(err))
        });
    }
} 