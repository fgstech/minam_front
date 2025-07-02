import React from "react";
import WalletApplication from "../../../application/wallet";
import "./style.css"
import Page from "../../ui/page";
import Avatar from "../../ui/avatar";
import DynamicTable from "../../ui/table2";
import Loader from "../../ui/loader";

const WalletView = ({ ...props }) => {
    const {
        avatar,
        balance,
        onUploadFile,
        columns,
        historial,
        customElements
    } = WalletApplication(props);

    return <>
        <Page>
            <h6><strong>Mi Wallet</strong></h6>
            <DynamicTable
                headers={columns}
                data={historial}
                customElements={customElements}
                tableLabel="Mis Transacciones"
                fullPage={true}
                showLabel={false}
                itemsPerPage={100}
                // isLoading={loaderData}
                loaderComponent={<Loader text="Cargando datos, por favor espera..." />}
                emptyText="No hay registros en la base de datos."
            />
        </Page>
    </>
}

export default WalletView;