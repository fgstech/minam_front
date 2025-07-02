import axios from 'axios';

export default class WalletAPI {
    static getWallet(id) {
        return new Promise((resolve, reject) => {
            axios.get(`/api/transactions/wallet/${id}`)
                .then(res => resolve(res.data))
                .catch(err => reject(err))
        });
    }

    static getHistorial(id) {
        return new Promise((resolve, reject) => {
            axios.get(`/api/transactions/history/${id}`)
                .then(res => resolve(res.data))
                .catch(err => reject(err))
        });
    }

    static getKpis(id) {
        return new Promise((resolve, reject) => {
            axios.get(`/api/user/kpi/${id}`)
                .then(res => resolve(res.data))
                .catch(err => reject(err))
        });
    }
} 