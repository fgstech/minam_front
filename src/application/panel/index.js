import React, { useEffect, useState } from "react";
import Applications from "../Applications";
import Controller from "./controller";


const PanelController = (props) => {
    const [kpi, setKpi] = useState(Applications.state.kpis);
    const [userId, setUserId] = useState(null);
    const [loader, setLoader] = useState(Applications.state.kpis ? false : true);

    useEffect(async () => {
        Applications.on("profile", async data => {
            await Controller.load(data._id);
            setUserId(data._id);
        })

        Applications.on("kpis", data => {
            setKpi(data)
            setLoader(false);
        });
        await Applications.getUserData();
    }, [])

    return {
        kpi,
        userId,
        loader
    }
}

export default PanelController;