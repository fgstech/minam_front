import MarketplaceAPI from "../../../api/mercado";
import Applications from "../../Applications";

class OrdersMarketplaceController {
    columns = [
        { key: 'id', label: 'Nº orden' },
        { key: 'date_created', label: "Fecha" },
        { key: 'status', label: 'Estado' },
        { key: 'total', label: 'Total', style: { textAlign: "center" } },
        { key: 'actions', label: 'Acciones',  style: { textAlign: "right" } }
    ];


    async getOrders(email) {
        return new Promise((resolve, reject) => {
            MarketplaceAPI.getOrders(email)
                .then(res => {
                    const orders = res.data;
                    Applications.updateState(state => ({ orders }));
                    return orders;
                })
                .catch(err => reject(err))
        })
    }
}

export default new OrdersMarketplaceController();