import { getUserId } from "../lib/Router";
import Ngex from "../insfrastructure/helpers/ngex/ngex";
import reducer from "../state/reducer";
import UserAPI from "../api/user";
import CourseController from './academy/courses/controller';
import OrderController from './marketplace/orders/controller';
import MarketplaceAPI from "../api/mercado";
import AxiosService from '../lib/axios';

class Application extends Ngex {
    kId = "itfgscomm";
    idwlKey = "lwfgscomm";
    constructor(state) {
        super(state);
        this.loadMain = this.loadMain.bind(this);
    }

    static getInstance(reduce) {
        return new Application(reduce);
    }

    profile = getUserId();
    state = this.getState();

    notify(payload = {}) {
        let noty = {}
        noty['id'] = payload['id'] != undefined ? parseInt(payload['id']) : Math.random().toString(36).slice(-8);
        noty['control'] = payload['id'] != undefined ? "custom" : "default";
        noty['type'] = payload['type'] != undefined ? payload['type'] : 'info';
        noty['title'] = payload['title'] != undefined ? payload['title'] : 'Información';
        noty['text'] = payload['text'] != undefined ? payload['text'] : '';
        noty['time'] = payload['time'] != undefined ? parseInt(payload['time']) : 2000;

        this.updateState(state => ({
            notifications: [...state.notifications, noty],
        }));
    }

    removeNotification(payload) {
        this.updateState(state => ({
            notifications: state.notifications.filter(n => n.id !== payload.id)
        }));
    }

    parseDataBySelect(object, label) {
        return {
            ...object,
            label: label,
            value: object._id
        }
    }

    async loadMain() {
        this.getUserData();
        this.on("profile", async (profile) => {
            await CourseController.getCourses(profile.idlw);
            await OrderController.getOrders(profile.email);
        })

        MarketplaceAPI.getProducts()
            .then(res => {
                const productsMarketplace = res.data;
                this.updateState(state => ({ productsMarketplace }))
                console.log(this.state.productsMarketplace);
            })
            .catch(err => console.log(err))
    }

    async getUserData() {
        const data = await UserAPI.getProfile(this.getLS(this.kId));
        const profile = data.data;
        this.setLS(this.idwlKey, profile.idlw);
        this.updateState(state => ({ profile }));
    }

    async getIdLw() {
        return this.getLS(this.idwlKey);
    }

    async getIdKeycloak() {
        return this.getLS(this.kId);
    }

    getLS(key) {
        return localStorage.getItem(key);
    }

    setLS(key, value) {
        return localStorage.setItem(key, value)
    }

    async getPayload(){
        return await AxiosService.getPayloadRaw();
    }
}


export default Application.getInstance(reducer);