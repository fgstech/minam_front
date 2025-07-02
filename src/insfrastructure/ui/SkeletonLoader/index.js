import React from "react";
import "./SkeletonLoader.css"; // Importar estilos

const SkeletonLoader = ({ active, width = "100%", height = "20px", variant = "square", borderRadius, margin, display, children }) => {
    if (!active) {
        return children; // Si no está activo, muestra el contenido real
    }

    return (
        <div
            className={`skeleton ${variant}`}
            style={{ width, height, borderRadius, margin, display }}
        />
    );
};

export default SkeletonLoader;