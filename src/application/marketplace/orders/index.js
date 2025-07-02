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
        id: (user) => <span style={{ color: "#e9531e", fontWeight: "bold" }}>{user?.id}</span>,
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

            return <div style={{ textAlign: "center", maxWidth: "100px", fontWeight: 700, background: color, borderRadius: 5, padding: "0 5px", color: "#fff" }}>{status}</div>
        },
        total: (user) => <div style={{
            display: "grid",
            gridTemplateColumns: "auto auto",
            gap: 10,
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
        }}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M10 18.75C14.8325 18.75 18.75 14.8325 18.75 10C18.75 5.16751 14.8325 1.25 10 1.25C5.16751 1.25 1.25 5.16751 1.25 10C1.25 14.8325 5.16751 18.75 10 18.75ZM10 20C15.5228 20 20 15.5228 20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20Z" fill="#E9531E" />
                <path d="M9.79823 17.2884C8.13583 17.2884 6.52623 16.6948 5.26383 15.6164C4.94783 15.3468 4.91023 14.8716 5.18063 14.5556C5.45023 14.2404 5.92543 14.202 6.24143 14.4724C7.23103 15.318 8.49423 15.7836 9.79823 15.7836C11.3318 15.7836 12.8054 15.1348 13.8414 14.0028C14.1222 13.6964 14.5982 13.6756 14.9046 13.9556C15.211 14.2364 15.2318 14.7124 14.9518 15.0188C13.6318 16.4612 11.7534 17.2884 9.79903 17.2884H9.79823Z" fill="#E9531E" />
                <path d="M13.8495 11.8294H13.1359L13.1575 10.5166C13.1663 10.0854 13.1727 9.73664 13.1727 9.19424C13.1727 8.79744 13.1391 8.42544 13.0727 8.08704C12.9087 7.25664 12.4511 6.69424 11.7119 6.41584C11.3039 6.26224 10.8615 6.20464 10.3975 6.24704C9.69508 6.30944 9.11588 6.55104 8.66388 6.97344C8.66388 6.87424 8.65988 6.77504 8.65108 6.67424L8.64628 6.62544C8.63508 6.49904 8.52948 6.40304 8.40308 6.40304H6.19268C6.05748 6.40304 5.94788 6.51264 5.94788 6.64784V7.55664C5.94788 7.69184 6.05748 7.80144 6.19268 7.80144H7.00628L6.95828 11.839H6.35908C6.22388 11.839 6.11428 11.9486 6.11428 12.0838V12.9878C6.11428 13.123 6.22388 13.2326 6.35908 13.2326H9.33508C9.47028 13.2326 9.57988 13.123 9.57988 12.9878V12.0782C9.57988 11.943 9.47028 11.8334 9.33508 11.8334H8.62308L8.63108 11.2734C8.63828 10.7934 8.64468 10.5086 8.65428 10.127L8.66548 9.66784C8.67108 9.42624 8.69268 9.21904 8.73268 9.03424C8.86388 8.42224 9.15108 8.04064 9.63588 7.83504C9.91988 7.71424 10.2359 7.67984 10.6031 7.72784C11.0607 7.78784 11.3191 8.02224 11.4167 8.46624C11.4847 8.77744 11.5199 9.08864 11.5199 9.39104C11.5199 9.91424 11.5135 10.2422 11.5055 10.6558L11.4839 11.839H10.8831C10.7479 11.839 10.6383 11.9486 10.6383 12.0838V12.9878C10.6383 13.123 10.7479 13.2326 10.8831 13.2326H13.8479C13.9831 13.2326 14.0927 13.123 14.0927 12.9878V12.0742C14.0927 11.939 13.9831 11.8294 13.8479 11.8294H13.8495Z" fill="#E9531E" />
                <path d="M12.2341 3.90921C12.2229 3.83321 12.1805 3.76441 12.1181 3.72041L11.4293 3.23401C11.3125 3.15081 11.1525 3.17001 11.0565 3.27641L10.9325 3.41721C10.8773 3.48041 10.8253 3.54121 10.7701 3.59641C10.5789 3.78761 10.5149 3.79721 10.2773 3.67001C10.2189 3.63881 10.1613 3.60601 10.0941 3.56761C9.98215 3.50361 9.86615 3.43801 9.74695 3.38201C9.14775 3.09801 8.57015 3.04841 8.07735 3.23801C7.60935 3.41801 7.25335 3.79481 7.01895 4.35961L7.00055 4.40441C6.94535 4.53881 7.00055 4.69241 7.12855 4.76121L7.91255 5.18121C8.04295 5.25081 8.20535 5.20841 8.28455 5.08361L8.35495 4.97161L8.42375 4.86361C8.61735 4.56841 8.75495 4.53641 9.06135 4.71401L9.20375 4.79801C9.34135 4.88041 9.48375 4.96521 9.63975 5.03561C9.93255 5.16841 10.2205 5.23561 10.4957 5.23561C10.6853 5.23561 10.8709 5.20361 11.0477 5.14041C11.5253 4.96921 11.8141 4.59561 12.0677 4.26681L12.1781 4.12521C12.2253 4.06441 12.2461 3.98681 12.2349 3.91081L12.2341 3.90921Z" fill="#E9531E" />
            </svg>
            <h6 style={{ fontWeight: "bold", textAlign: "center", margin: 0 }}>{user.total}</h6>
        </div>,
        actions: (user) => {
            return <div className="table-controls-td table-controls-rigth">
                <IconButton onClick={() => goOrderPage(user)}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M19.29 9.17005L7.70002 3.07005C4.95002 1.62005 1.96002 4.55005 3.35002 7.33005L4.97002 10.57C5.42002 11.47 5.42002 12.53 4.97002 13.43L3.35002 16.67C1.96002 19.45 4.95002 22.37 7.70002 20.93L19.29 14.83C21.57 13.63 21.57 10.37 19.29 9.17005Z" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </IconButton>
            </div>
        },
    };

    useEffect(async () => {
        Applications.on("orders", data => setOrders(data))
        Applications.on("vcourse", (data) => setView(data));
        if (Applications.state?.profile?.email) {
            OrdersMarketplaceController.getOrders(Applications.state.profile.email);
        }

        // if (props && props.params && props.params.id) {}
    }, []);

    useEffect(() => {
        if (Applications.state?.profile?.email) {
            OrdersMarketplaceController.getOrders(Applications.state.profile.email);
        }
    }, [Applications.state.profile])


    const editData = (key, value) => {
        setView(prevState => ({
            ...prevState,
            [key]: value,
        }));
    };

    const goOrderPage = (data) => {
        const url = `https://mercado.xn--am-yja.org/mi-cuenta/view-order/${data.id}/`
        window.open(url, "_blank");
    }

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