import axios from 'axios';

export default class MarketplaceAPI {
    static getOrders(email) {
        return new Promise((resolve, reject) => {
            axios.post(`/api/mercado/orders`, { email })
                .then(res => resolve(res.data))
                .catch(err => reject(err))
        });
    }

    static getProducts() {
        return new Promise((resolve, reject) => {
            axios.get(`/api/mercado/products/featured`)
                .then(res => resolve(res.data))
                .catch(err => reject(err))
        });
    }
} 