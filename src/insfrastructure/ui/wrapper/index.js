import React, { useEffect, useState, useRef } from 'react';

const HeightWrapper = ({ children, containerElement, main }) => {
    const wrapperRef = useRef(null);  // Referencia al contenedor padre
    const [height, setHeight] = useState(0);  // Estado para la altura calculada

    // Función para calcular la altura de todos los hijos excepto el elemento principal
    const calculateHeightOfSiblingsExceptMain = (mainElement, ignoreElement) => {
        if (!mainElement || !mainElement.parentElement) {
            console.error("El elemento principal no tiene un contenedor padre válido.");
            return 0;
        }

        const el = ignoreElement;
        const parentElement = mainElement;
        let totalHeight = 0;

        Array.from(parentElement.children).forEach(child => {
            if (child !== el) {
                const childStyle = window.getComputedStyle(child);
                const height = child.offsetHeight || 0;
                const marginTop = parseInt(childStyle.marginTop) || 0;
                const marginBottom = parseInt(childStyle.marginBottom) || 0;
                totalHeight += height + marginTop + marginBottom;
            }
        });

        return totalHeight;
    };

    useEffect(() => {
        if (wrapperRef.current) {
            // Buscar el elemento principal por el ID
            const mainElement = document.querySelector(containerElement);
            const ignoreElement = document.querySelector(main);

            if (mainElement) {
                // Calcular la altura de los hermanos, excluyendo el elemento principal
                const siblingsHeight = calculateHeightOfSiblingsExceptMain(mainElement, ignoreElement);
                setHeight(siblingsHeight);  // Actualizar el estado con la altura calculada
            }
        }
    }, [containerElement]);  // Ejecutar cuando el ID del elemento principal cambie

    // Clonar cada hijo y pasarle la prop `height`
    const childrenWithHeight = React.Children.map(children, child =>
        React.cloneElement(child, { height })  // Pasar `height` como prop a cada hijo
    );

    return (
        <div ref={wrapperRef} style={{ height: '100%' }}>
            {childrenWithHeight}
        </div>
    );
};

export default HeightWrapper;