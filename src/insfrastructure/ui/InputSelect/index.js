import React, { useState, useEffect, useRef } from 'react';
import './Select.css'; // Importa el archivo CSS para los estilos

const Select = ({ label, labelPosition = 'top', options, isMulti = false, placeholder = 'Selecciona...', value, onChange }) => {
    const [selectedOptions, setSelectedOptions] = useState(isMulti ? [] : null); // Inicializar como vacío
    const [isOpen, setIsOpen] = useState(false); // Controlar el estado del desplegable
    const selectRef = useRef(null); // Referencia para detectar clics fuera del componente

    // Sincronizar selectedOptions cuando value cambia
    useEffect(() => {
        if (isMulti) {
            setSelectedOptions(value || []); // Si es múltiple, asegurarse de que sea un array
        } else {
            setSelectedOptions(value || null); // Si es simple, es un solo valor
        }
    }, [value]);

    // Manejar clics fuera del componente para cerrar el menú
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (selectRef.current && !selectRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleOptionClick = (option) => {
        if (isMulti) {
            if (selectedOptions.some((o) => o.value === option.value)) {
                const newSelectedOptions = selectedOptions.filter((o) => o.value !== option.value); // Quitar la opción si ya está seleccionada
                setSelectedOptions(newSelectedOptions);
                onChange && onChange(newSelectedOptions); // Llamar a onChange con los nuevos valores seleccionados
            } else {
                const newSelectedOptions = [...selectedOptions, option]; // Añadir opción seleccionada
                setSelectedOptions(newSelectedOptions);
                onChange && onChange(newSelectedOptions); // Llamar a onChange con los nuevos valores seleccionados
            }
        } else {
            setSelectedOptions(option);
            setIsOpen(false); // Cerrar el menú después de seleccionar en modo individual
            onChange && onChange(option); // Llamar a onChange con el valor seleccionado
        }
    };

    const handleRemoveOption = (event, option) => {
        event.stopPropagation(); // Evitar que el menú se abra al hacer clic en la X
        const newSelectedOptions = selectedOptions.filter((o) => o.value !== option.value);
        setSelectedOptions(newSelectedOptions);
        onChange && onChange(newSelectedOptions); // Llamar a onChange con los nuevos valores seleccionados
    };

    const renderSelectedOptions = () => {
        if (!selectedOptions || (Array.isArray(selectedOptions) && selectedOptions.length === 0)) {
            return placeholder;
        }

        if (isMulti) {
            return selectedOptions.map((o) => (
                <span key={o.value} className="bk-selected-tag">
                    {o.label}
                    <span className="bk-remove-tag" onClick={(event) => handleRemoveOption(event, o)}>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M16.0659 8.99469C16.3588 8.70179 16.3588 8.22692 16.0659 7.93403C15.773 7.64113 15.2981 7.64113 15.0052 7.93403L12 10.9392L8.99482 7.93403C8.70192 7.64113 8.22705 7.64113 7.93416 7.93403C7.64126 8.22692 7.64126 8.70179 7.93416 8.99469L10.9394 11.9999L7.93415 15.0051C7.64125 15.298 7.64125 15.7729 7.93415 16.0658C8.22704 16.3586 8.70191 16.3586 8.99481 16.0658L12 13.0605L15.0052 16.0658C15.2981 16.3586 15.773 16.3586 16.0659 16.0658C16.3588 15.7729 16.3588 15.298 16.0659 15.0051L13.0607 11.9999L16.0659 8.99469Z" fill="white" />
                        </svg>
                    </span>
                </span>
            ));
        }

        return selectedOptions ? selectedOptions.label : placeholder;
    };

    const renderLabel = () => {
        if (!label || labelPosition === 'none') return null;
        return <label className={`bk-select-label bk-select-label-${labelPosition}`}>{label}</label>;
    };

    return (
        <div ref={selectRef} className={`bk-select-container bk-label-${labelPosition}`}>
            {(labelPosition === 'top' || labelPosition === 'left') && renderLabel()}
            <div
                className={`bk-select-display ${isOpen ? 'open' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                {renderSelectedOptions()}
                <span className="bk-arrow">{isOpen ? <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" clipRule="evenodd" d="M16.5303 14.0303C16.2374 14.3232 15.7626 14.3232 15.4697 14.0303L12 10.5607L8.53033 14.0303C8.23744 14.3232 7.76256 14.3232 7.46967 14.0303C7.17678 13.7374 7.17678 13.2626 7.46967 12.9697L11.4697 8.96967C11.7626 8.67678 12.2374 8.67678 12.5303 8.96967L16.5303 12.9697C16.8232 13.2626 16.8232 13.7374 16.5303 14.0303Z" fill="black" />
                </svg>
                    : <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M16.5303 8.96967C16.8232 9.26256 16.8232 9.73744 16.5303 10.0303L12.5303 14.0303C12.2374 14.3232 11.7626 14.3232 11.4697 14.0303L7.46967 10.0303C7.17678 9.73744 7.17678 9.26256 7.46967 8.96967C7.76256 8.67678 8.23744 8.67678 8.53033 8.96967L12 12.4393L15.4697 8.96967C15.7626 8.67678 16.2374 8.67678 16.5303 8.96967Z" fill="black" />
                    </svg>
                }</span>

                {/* El menú desplegable está dentro del select-display */}
                {isOpen && (
                    <ul className="bk-select-options">
                        {options.map((option) => (
                            <li
                                key={option.value}
                                className={`bk-select-option ${isMulti && selectedOptions.some((o) => o.value === option.value) ? 'bk-selected-multi' : ''
                                    }`}
                                onClick={() => handleOptionClick(option)}
                            >
                                {option.label}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            {(labelPosition === 'bottom' || labelPosition === 'right') && renderLabel()}
        </div>
    );
};

export default Select;