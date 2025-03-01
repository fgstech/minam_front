import React from 'react';
import './ToolbarComponent.css'; // Importamos el archivo de estilos

const ToolbarComponent = ({
    label,                 // Texto del label
    showBackButton = false, // Opción booleana para mostrar el botón de volver
    onBackClick = () => { }, // Función que se ejecuta al hacer clic en el botón de volver
    extraElements = null,   // Props para recibir elementos adicionales
    children,                // Contenido principal que se pasará como children
    removeTitleContainer = false
}) => {
    return (
        <div className="toolbar-container">
            <div className="toolbar-content">
                {!removeTitleContainer && <div className="title-container">
                    {showBackButton && (
                        <button className="back-button" onClick={onBackClick}>
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M14.0303 7.46967C14.3232 7.76256 14.3232 8.23744 14.0303 8.53033L10.5607 12L14.0303 15.4697C14.3232 15.7626 14.3232 16.2374 14.0303 16.5303C13.7374 16.8232 13.2626 16.8232 12.9697 16.5303L8.96967 12.5303C8.67678 12.2374 8.67678 11.7626 8.96967 11.4697L12.9697 7.46967C13.2626 7.17678 13.7374 7.17678 14.0303 7.46967Z" fill="white" />
                            </svg>
                            Volver
                        </button>
                    )}
                </div>}
                <div className="extra-elements">
                    {extraElements}
                </div>
            </div>
            <div className="toolbar-children">
                {children}
            </div>
        </div>
    );
};

export default ToolbarComponent;