import React from 'react';
import './style.css'; // Asegúrate de tener el archivo CSS para estilos

const Tooltip = ({ text, children, position, className }) => {
    return (
        <div tooltip={text} flow={position} className={className}>
            {children}
        </div>
    );
};

Tooltip.defaultProps = {
    position: "",
    text: ""
}

export default Tooltip;
