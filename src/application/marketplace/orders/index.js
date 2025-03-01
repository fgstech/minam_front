import React, { useState, useEffect } from 'react'
import { IconButton } from '../../../insfrastructure/ui/button';
import Applications from '../../Applications';
import NavigationService from '../../../utils/history';
import OrdersMarketplaceController from './controller';

const OrdersMarketplaceApplication = (props) => {
    const [orders, setOrders] = useState(Applications.state.orders)
    const [view, setView] = useState(null)

    const columns = OrdersMarketplaceController.columns;
    const customElements = {
        // actions: (user) => (
        //     <div className="table-controls-td">
        //         <IconButton onClick={() => goView(user._id)}>
        //             <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        //                 <path d="M15.58 12C15.58 13.98 13.98 15.58 12 15.58C10.02 15.58 8.42004 13.98 8.42004 12C8.42004 10.02 10.02 8.42004 12 8.42004C13.98 8.42004 15.58 10.02 15.58 12Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        //                 <path d="M12 20.27C15.53 20.27 18.82 18.19 21.11 14.59C22.01 13.18 22.01 10.81 21.11 9.39997C18.82 5.79997 15.53 3.71997 12 3.71997C8.46997 3.71997 5.17997 5.79997 2.88997 9.39997C1.98997 10.81 1.98997 13.18 2.88997 14.59C5.17997 18.19 8.46997 20.27 12 20.27Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        //             </svg>
        //         </IconButton>
        //     </div>
        // ),

        id: (user) => `${user.id}`,
        status: (user) => {
            let status = "";
            let color = "#bdc3c7";
            switch (user.status) {
                case "not_started":
                    status = "No iniciado";
                    color = "#bdc3c7";
                    break;
                case "completed":
                    status = "Completado";
                    color = "#1abc9c";
                    break;
                case "not_completed":
                    status = "En progreso";
                    color = "#e74c3c";
                    break;
                default:
                    status = "No iniciado";
                    color = "#bdc3c7";
            }

            return <div style={{ textAlign: "center", fontWeight: 700, background: color, borderRadius: 5, padding: "0 5px", color: "#fff" }}>{status}</div>
        },
        total: (user) => <h6 style={{fontWeight: 500}}>{user.total} ÑMS</h6>,
    };

    useEffect(async () => {
        Applications.on("orders", data => {
            console.log(data);
            setOrders(data)
        })
        Applications.on("vcourse", (data) => setView(data));
        console.log(">>", Applications.state.profile.email);
        OrdersMarketplaceController.getOrders(Applications.state.profile.email);
        if (props && props.params && props.params.id) {
            // OrdersMarketplaceController.getPatientById(props.params.id);
        }
    }, []);


    const editData = (key, value) => {
        setView(prevState => ({
            ...prevState,
            [key]: value,
        }));
    };

    const goView = (id) => NavigationService.navigateTo(`/mercado/${id}`);
    const goBack = () => NavigationService.navigateBack()

    return {
        orders,
        columns,
        customElements,
        goBack,
    }
}


export default OrdersMarketplaceApplication;