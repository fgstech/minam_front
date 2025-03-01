import React, { useState, useEffect } from 'react';
import './Input.css'; // Importa el archivo CSS para los estilos

const countryCodes = [
    { value: '+1', label: 'US (+1)' },
    { value: '+56', label: 'Chile (+56)' },
    { value: '+91', label: 'India (+91)' },
];

const Input = ({
    type = 'text', // Puede ser text, checkbox, radio, currency, etc.
    label,
    disabled = false,
    labelPosition = 'top',
    placeholder = '',
    value,
    onChange,
    rows = 4,
    currency = 'USD',
    locale,
    currencyDecimals = 2,
    name, // Necesario para los radio buttons
    options = [], // Necesario para radio buttons
    checkLabel = '',
    isAutocomplete = false, // Nueva propiedad para activar el autocompletado de direcciones
    country = '', // Nuevo prop para limitar la búsqueda a un país específico
    onChangeCoords // Callback para devolver coordenadas en caso de autocompletar direcciones
}) => {
    const [inputValue, setInputValue] = useState(value || ''); // Mantener el valor interno
    const [suggestions, setSuggestions] = useState([]); // Sugerencias de autocompletar para direcciones
    const [isEditing, setIsEditing] = useState(false); // Saber si el usuario está editando (para currency)
    const [selectedCountryCode, setSelectedCountryCode] = useState(countryCodes[0]?.value || '+1'); // Código de país seleccionado
    const apiKey = '8ea21425c27042e999a3f0440d7910c9'; // API key de OpenCage para autocomplete

    useEffect(() => {
        setInputValue(value); // Actualizar valor interno cuando el prop value cambie
    }, [value]);

    const getLocaleForCurrency = (currency) => {
        switch (currency) {
            case 'EUR':
                return 'de-DE'; // Alemania (EUR)
            case 'JPY':
                return 'ja-JP'; // Japón (JPY)
            case 'GBP':
                return 'en-GB'; // Reino Unido (GBP)
            case 'CLP':
                return 'es-CL'; // Chile (CLP - Pesos chilenos)
            default:
                return 'en-US'; // Default para USD y otras monedas
        }
    };

    // Función para formatear el número como moneda
    const formatCurrency = (value) => {
        const formatter = new Intl.NumberFormat(locale || getLocaleForCurrency(currency), {
            style: 'currency',
            currency,
            minimumFractionDigits: currencyDecimals,
        });
        return formatter.format(value);
    };

    // Obtener sugerencias de direcciones utilizando la API de OpenCage
    const fetchSuggestions = async (query) => {
        if (!query) return;
        try {
            const countryParam = country ? `&countrycode=${country.toLowerCase()}` : '';
            const response = await fetch(
                `https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(query)}&key=${apiKey}&limit=50&address_only=1&abbrv=1${countryParam}`
            );
            const data = await response.json();
            setSuggestions(data.results);
        } catch (error) {
            console.error('Error fetching suggestions:', error);
            setSuggestions([]);
        }
    };

    // Manejar el cambio en el input
    const handleInputChange = (e) => {
        let newValue = e.target.value;

        if (isAutocomplete) {
            setInputValue(newValue);
            if (newValue.length > 2) {
                fetchSuggestions(newValue);
            } else {
                setSuggestions([]);
            }
        } else if (type === 'number' || type === 'currency') {
            newValue = newValue.replace(/[^0-9.]/g, '');
            setInputValue(newValue);
            if (type === 'currency') {
                const numericValue = parseFloat(newValue) || 0;
                onChange(numericValue); // Enviar el valor numérico sin formatear
            } else {
                onChange(newValue);
            }
        } else if (type === 'checkbox') {
            const checked = e.target.checked;
            onChange(checked); // Enviar el valor booleano al callback
        } else {
            setInputValue(newValue);
            onChange(newValue);
        }
    };

    // Manejar la selección de una sugerencia de dirección
    const handleSelectSuggestion = (suggestion) => {
        const { formatted, geometry } = suggestion;
        setInputValue(formatted); // Actualizar la dirección seleccionada
        setSuggestions([]); // Limpiar las sugerencias
        if (onChange) onChange(formatted); // Devolver la dirección seleccionada
        if (onChangeCoords) onChangeCoords({ lat: geometry.lat, lng: geometry.lng }); // Devolver coordenadas
    };

    // Aplicar el formato de moneda cuando el campo pierda el foco
    const handleBlur = () => {
        if (type === 'currency') {
            setIsEditing(false); // Deja de editar
            setInputValue(formatCurrency(inputValue || 0)); // Aplicar el formato
        }
    };

    // Quitar el formato de moneda cuando el campo esté en foco
    const handleFocus = () => {
        if (type === 'currency') {
            setIsEditing(true); // El usuario está editando
            setInputValue((value || '').toString()); // Mostrar el valor sin formatear
        }
    };

    // Formato de dirección corta
    const formatShortAddress = (address) => {
        const parts = address.split(',');
        return parts.slice(0, 3).join(', '); // Mostrar solo los primeros 3 componentes
    };

    const handlePhoneChange = (e) => {
        const phoneNumber = e.target.value;
        setInputValue(phoneNumber);

        // Devuelve el número completo concatenado
        if (onChange) {
            onChange(`${selectedCountryCode}${phoneNumber}`);
        }
    };

    const handleCountryCodeChange = (e) => {
        const countryCode = e.target.value;
        setSelectedCountryCode(countryCode);

        // Devuelve el número completo concatenado
        if (onChange) {
            onChange(`${countryCode}${inputValue}`);
        }
    };

    const renderLabel = () => {
        if (!label || labelPosition === 'none') return null;
        return <label className={`bk-input-label bk-input-label-${labelPosition}`}>{label}</label>;
    };

    const renderInputField = () => {
        if (isAutocomplete) {
            return (
                <div className="autocomplete-container">
                    <input
                        type="text"
                        disabled={disabled}
                        className="bk-input-field"
                        placeholder={placeholder}
                        value={inputValue}
                        onChange={handleInputChange}
                    />
                    {suggestions.length > 0 && (
                        <ul className="autocomplete-suggestions">
                            {suggestions.map((suggestion) => (
                                <li
                                    key={`${suggestion.geometry.lat}-${suggestion.geometry.lng}`}
                                    onClick={() => handleSelectSuggestion(suggestion)}
                                    className="suggestion-item"
                                >
                                    {formatShortAddress(suggestion.formatted)}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            );
        } else if (type === 'textarea') {
            return (
                <textarea
                    className="bk-input-field bk-textarea-field"
                    placeholder={placeholder}
                    value={inputValue}
                    rows={rows}
                    disabled={disabled}
                    onChange={handleInputChange}
                />
            );
        } else if (type === 'currency') {
            return (
                <input
                    type="text"
                    disabled={disabled}
                    className="bk-input-field"
                    placeholder={placeholder}
                    value={inputValue}
                    onChange={handleInputChange}
                    onBlur={handleBlur}
                    onFocus={handleFocus}
                />
            );
        } else if (type === 'checkbox') {
            return (
                <label className="bk-checkbox-label">
                    <input
                        type="checkbox"
                        className="bk-input-checkbox"
                        checked={value}
                        disabled={disabled}
                        onChange={handleInputChange}
                    />
                    {checkLabel && <span className="bk-checkbox-text">{checkLabel}</span>}
                </label>
            );
        } else if (type === 'radio') {
            return (
                <div className="bk-radio-group">
                    {options.map((option) => (
                        <label key={option.value} className="bk-radio-label">
                            <input
                                type="radio"
                                name={name}
                                disabled={disabled}
                                value={option.value}
                                checked={value === option.value}
                                onChange={() => onChange(option.value)}
                                className="bk-input-radio"
                            />
                            {option.label}
                        </label>
                    ))}
                </div>
            );
        } if (type === 'phone') {
            return (
                <div className="phone-input-container">
                    <select
                        className="phone-country-code"
                        value={selectedCountryCode}
                        onChange={handleCountryCodeChange}
                    >
                        {countryCodes.map((code) => (
                            <option key={code.value} value={code.value}>
                                {code.label}
                            </option>
                        ))}
                    </select>
                    <input
                        type="text"
                        className="phone-number-input"
                        placeholder={placeholder || 'Enter phone number'}
                        value={inputValue}
                        disabled={disabled}
                        onChange={handlePhoneChange}
                    />
                </div>
            );
        } else {
            return (
                <input
                    type={type}
                    disabled={disabled}
                    className="bk-input-field"
                    placeholder={placeholder}
                    value={inputValue}
                    onChange={handleInputChange}
                />
            );
        }
    };

    return (
        <div className={`bk-input-container bk-label-${labelPosition}`}>
            {(labelPosition === 'top' || labelPosition === 'left') && renderLabel()}
            <div className="bk-input-wrapper">
                {renderInputField()}
            </div>
            {(labelPosition === 'bottom' || labelPosition === 'right') && renderLabel()}
        </div>
    );
};

export default Input;