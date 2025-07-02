import { getUserId } from "../lib/Router";
import Endpoint from '../Endpoint'
import Ngex from "../insfrastructure/helpers/ngex/ngex";
import reducer from "../state/reducer";
import UserAPI from "../api/user";
import CourseController from './academy/courses/controller';
import OrderController from './marketplace/orders/controller';
import MarketplaceAPI from "../api/mercado";
import AxiosService from '../lib/axios';

class Application extends Ngex {
    idwlKey = "lwminam";
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
            })
            .catch(err => console.log(err))
    }

    async getUserData() {
        const kid = AxiosService.getIdToken();
        const data = await UserAPI.getProfile(kid);
        const profile = data.data;
        profile.avatar = this.parseAvatar(profile);
        this.setLS(this.idwlKey, profile.idlw);
        this.updateState(state => ({ profile }));
    }

    async getIdLw() {
        return this.getLS(this.idwlKey);
    }

    async getIdKeycloak() {
        const kid = AxiosService.getIdToken();
        return kid;
    }

    getLS(key) {
        return localStorage.getItem(key);
    }

    setLS(key, value) {
        return localStorage.setItem(key, value)
    }

    async getPayload() {
        return await AxiosService.getPayloadRaw();
    }

    parseAvatar(data) {
        return this.validateImageUrl(data.avatar || this.generateAvatar(data.name))
    }

    validateImageUrl(imageUrl) {
        try {
            const urlObject = new URL(imageUrl);
            return imageUrl;
        } catch (error) {
            return `${Endpoint}${imageUrl.startsWith("/") ? "" : "/"}${imageUrl}`;
        }
    }

    generateAvatar(name, size = 100) {
        // Obtener las iniciales del nombre
        const initials = name
            .split(" ")
            .map(word => word[0])
            .join("")
            .toUpperCase();

        // Generar un color de fondo aleatorio
        const colors = ["#E9531E"];
        const backgroundColor = colors[Math.floor(Math.random() * colors.length)];

        // Crear un SVG con las iniciales y el fondo de color
        const svg = `
            <svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
                <rect width="${size}" height="${size}" fill="${backgroundColor}" rx="50%" />
                <text x="50%" y="50%" font-size="${size / 2.5}" fill="#FFF" font-family="Arial, sans-serif" text-anchor="middle" dominant-baseline="central">
                    ${initials}
                </text>
            </svg>
        `;

        // Convertir SVG a Data URL
        return `data:image/svg+xml;base64,${btoa(svg)}`;
    };
}


export default Application.getInstance(reducer);