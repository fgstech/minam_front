import React, { useEffect, useState } from "react";
import Applications from "../Applications";
import Controller from "./controller";

const WalletApplication = (props) => {
    const [avatar, setAvatar] = useState(Applications.state.profile?.avatar);
    const [balance, setBalance] = useState(Applications.state.wallet?.wallet?.balance || 0);
    const [historial, setHistorial] = useState(Applications.state.wallet?.history || []);
    const [userId, setUserId] = useState(null);

    const customElements = {
        amount: (data) => {
            const balance = data.amount;
            const positive = balance > 0
            const color = positive ? "blue" : "red";
            return <div style={{ borderRadius: 8, background: "#F4F7FE", width: 60, padding: "2px 8px", textAlign:"center" }}>
                <span style={{ color: "#e9531e", fontWeight:"bold" }}>{balance}</span>
            </div>
        },
    };

    useEffect(async () => {
        Applications.on("profile", async data => {
            setAvatar(data.avatar);
            setUserId(data._id);
            await Controller.load(data._id);
        })

        Applications.on("wallet", data => {
            setBalance(data.wallet.balance);
            setHistorial(data.history)
        })

        if (Applications.state.profile._id) {
            await Controller.load(Applications.state.profile._id);
            setUserId(Applications.state.profile._id);
        }
    }, [])


    const onUploadFile = (file) => {

    }

    return {
        avatar,
        balance,
        userId,
        historial,
        columns: Controller.columns,
        customElements,
        onUploadFile
    }
}

export default WalletApplication;