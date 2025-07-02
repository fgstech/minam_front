import React from "react";
import PanelController from "../../../application/panel";
import "./style.css"
import KpiDashboard from "./kpi";

const PanelView = ({ ...props }) => {
    const { kpi, loader } = PanelController(props);

    return (
        <div>
            <h6><strong>Mi Dashboard</strong></h6>
            <KpiDashboard
                loader={loader}
                puntos={kpi?.points || 0}
                ranking={kpi?.ranking || 0}
                nivel={kpi?.level || "-"}
                cursosTotal={kpi?.totalCourses || 0}
                cursosProgreso={kpi?.course_inProgress || 0}
                cursosTerminados={kpi?.course_complete || 0}
                certificates={kpi?.certificates || 0}
                canjes={kpi?.orders || 0}
            />
        </div>
    );
}

export default PanelView;