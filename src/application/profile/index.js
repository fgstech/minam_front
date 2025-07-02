import React, { useEffect, useState } from "react";
import Applications from "../Applications";


const ProfileApplication = (props) => {
    const [loader, setLoader] = useState(true);
    const [urlQr, setUrlQr] = useState(null)

    useEffect(async () => {
        if (Applications.state?.profile?._id) {
            getUrl(Applications.state?.profile?._id)
            setLoader(false);
        }
        Applications.on("profile", async data => {
            getUrl(data._id)
            setLoader(false);
        })
        await Applications.getUserData();
    }, [])

    const getUrl = (id) => {
        setUrlQr(`${window.location.origin}/profile/${id}`)
    }

    return {
        urlQr,
        loader
    }
}

export default ProfileApplication;