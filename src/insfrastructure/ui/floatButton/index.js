import React from 'react';
import './style.css'; // Asegúrate de crear un archivo CSS para estilos

const FloatingButton = ({ position = 'bottom-right', onClick, children }) => {
    // Define las clases de posición posibles
    const positionClasses = {
        'top-left': 'floating-button top-left',
        'top-right': 'floating-button top-right',
        'bottom-left': 'floating-button bottom-left',
        'bottom-right': 'floating-button bottom-right',
        'center-left': 'floating-button center-left',
        'center-right': 'floating-button center-right',
    };

    // Asigna la clase según la posición seleccionada
    const positionClass = positionClasses[position] || positionClasses['bottom-right'];

    return (
        <button className={positionClass} onClick={onClick}>
            {/* {children} */}
            <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 17V7" stroke="black" stroke-width="1.5" stroke-linecap="round" />
                <path d="M7 12L17 12" stroke="black" stroke-width="1.5" stroke-linecap="round" />
            </svg>
        </button>
    );
};

export default FloatingButton;