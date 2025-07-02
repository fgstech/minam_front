import React from "react";
import "./index.css";

export const PrimaryButton = ({ text, onClick, type, ...props }) => {
    return <>
        <button onClick={onClick} className={`buttonPrimary ${type === "text" ? 'text-button' : ''}`}>{text}</button>
    </>
}

export const IconButton = ({ children, onClick, type, style, disabled = false, ...props }) => {
    return (
        <button
            onClick={onClick}
            style={style}
            className={`iconButton ${type === "primary" ? 'type-primary' : type}`}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
};


IconButton.defaultProps = {
    style: {}
}


export const DangerButton = ({ text, onClick, type, ...props }) => {
    return <>
        <button onClick={onClick} className={`dangerButton ${type === "text" ? 'text-button' : ''}`}>{text}</button>
    </>
}

export const Button = ({ variant, size, disabled, loading, onClick, children, style }) => {

    // Variantes de color
    const getButtonColor = () => {
        switch (variant) {
            case 'primary':
                return '#007bff'; // Azul
            case 'secondary':
                return '#6c757d'; // Gris
            case 'success':
                return '#28a745'; // Verde
            case 'danger':
                return '#dc3545'; // Rojo
            default:
                return '#F4F7FE'; // Azul por defecto
        }
    };

    // Tamaños de botón
    const getButtonSize = () => {
        switch (size) {
            case 'small':
                return { padding: '5px 10px', fontSize: '12px' };
            case 'large':
                return { padding: '10px 20px', fontSize: '16px' };
            default:
                return { padding: '8px 15px', fontSize: '14px' }; // Tamaño mediano por defecto
        }
    };

    // Estilo base del botón
    const buttonStyle = {
        backgroundColor: getButtonColor(),
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
        cursor: disabled || loading ? 'not-allowed' : 'pointer',
        opacity: disabled || loading ? 0.7 : 1,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        outline: 0,
        ...getButtonSize(),
        ...style, // Para estilos adicionales personalizados
    };

    return (
        <button
            style={buttonStyle}
            disabled={disabled || loading}
            onClick={onClick}
        >
            {loading ? <span className="spinner" style={{ marginRight: '8px' }}>⏳</span> : null}
            {children}
        </button>
    );
};

Button.defaultProps = {
    size: 'medium', // Por defecto es tamaño medio
    disabled: false, // No está deshabilitado por defecto
    loading: false, // No está en modo de carga por defecto
    onClick: () => { }, // Acción por defecto (vacía)
};