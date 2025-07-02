import axios from 'axios';

const api = axios.create({
    baseURL: 'https://exp.xn--am-yja.org/api',
    timeout: 1000,
    headers: { 'x-api-key': 'FGSAPIKEY', 'Access-Control-Allow-Origin': '*' },
});

export default class XpPointsAPI {
    static getWallet(id) {
        return new Promise((resolve, reject) => {
            api.get(`/points/${id}`)
                .then(res => resolve(res.data))
                .catch(err => reject(err))
        });
    }
} 