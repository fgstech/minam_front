import React, { useEffect, useRef } from "react";
import ProfileApplication from "../../../application/profile";
import QRCodeStyling from "qr-code-styling"; // Nueva biblioteca QR con estilos
import svg from '../../../assets/icon.svg'
import "./style.css"

const ProfileView = ({ ...props }) => {
    const { urlQr, loader } = ProfileApplication(props);

    return <>
        <div className="profile">
            <h6><strong>Escanea este código para acceder a tu perfil.</strong></h6>
            <div className="qr-container">
                {!loader ? <QRCodeDisplay text={urlQr} /> : null}
            </div>
            <p><strong>Compártelo con docentes, compañeros o empresas <br /> para mostrar tus logros y experiencia.</strong></p>
        </div>
    </>
}

export default ProfileView;


const QRCodeDisplay = ({ text }) => {
    const qrRef = useRef(null);
    const qrCode = new QRCodeStyling({
        width: 250,
        height: 250,
        type: "svg",
        data: text,
        image: svg,
        dotsOptions: {
            color: "#e9531e",
            type: "rounded",
        },
        backgroundOptions: {
            color: "#ffffff",
        },
        imageOptions: {
            crossOrigin: "anonymous",
            margin: 0,
        },
        cornersSquareOptions: {
            type: "extra-rounded",
            color: "#e9531e",
        },
        cornersDotOptions: {
            type: "dot",
            color: "#e9531e",
        },
    });
    useEffect(() => {
        if (qrRef.current) {
            qrCode.append(qrRef.current);
        }
    }, []);

    return (
        <div ref={qrRef} className="qr-code"></div>
    );
};
