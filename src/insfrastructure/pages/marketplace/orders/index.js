import React from "react";
import AcademyCoursesApplication from "../../../../application/marketplace/orders";
import Page from "../../../ui/page";
import DynamicTable from "../../../ui/table2";

const OrdersView = ({ ...props }) => {
    const { orders, columns, customElements } = AcademyCoursesApplication(props);
    return <>
        <h6><strong>Mis Canjes</strong></h6>
        <Page>
            <DynamicTable
                headers={columns}
                data={orders}
                customElements={customElements}
                tableLabel="Mis canjes"
                fullPage={true}
                showLabel={false}
            />
        </Page>
    </>
}

export default OrdersView;