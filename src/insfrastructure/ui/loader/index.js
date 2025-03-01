import React from 'react';
import "./Loader.css"; // Asegúrate de crear este archivo para los estilos

const Loader = ({ text = "Cargando..." }) => {
    return (
        <div className="loader-container">
            <div className="spinner"></div>
            <p className="loader-text">{text}</p>
        </div>
    );
};

export default Loader;