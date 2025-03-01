import React from "react";
import PanelController from "../../../application/panel";
import "./style.css"
import Page from "../../ui/page";

const PanelView = ({ ...props }) => {
    const { } = PanelController(props);
    return <>
        <h6><strong>Dashboard</strong></h6>
        <Page>

        </Page>
    </>
}

export default PanelView;