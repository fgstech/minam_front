import React, { useState } from 'react';
import './ColorPicker.css'; // Importa el archivo CSS para los estilos

const ColorPicker = ({
    mode = 'grid',
    colors = [],
    value = '',
    onChange,
    label = '',
    labelPosition = 'top', // Como en los otros componentes
}) => {
    const [selectedColor, setSelectedColor] = useState(value || '#000000');
    const [customColor, setCustomColor] = useState(value || '#000000');

    // Lista predefinida de 256 colores en formato hex
    const predefinedColors = [
        '#ECF0F1', '#F8E71C', '#FFC233', '#FFDA33', '#F1C40F', '#F39C12', '#F5A623', '#FFD133', '#FFF733', '#E7FF33', '#A6FF33',
        '#8BFF33', '#4AFF33', '#33FF67', '#33FF80', '#33FF9B', '#33FFB3', '#33FFD1', '#33FFDA', '#33FFE7', '#33FFF3', '#33FFF7',
        '#33FFFF', '#33F7FF', '#33F3FF', '#33E7FF', '#33DCFF', '#33C8FF', '#33A5FF', '#338CFF', '#3387FF', '#3385FF', '#3357FF',
        '#333DFF', '#3333FF', '#8B33FF', '#BD33FF', '#D0021B', '#E74C3C', '#E67E22', '#D35400', '#C0392B', '#FF5733', '#FF3333',
        '#FF336F', '#FF3387', '#FF339B', '#FF33A5', '#FF33B3', '#FF33D1', '#FF33E7', '#FF33FF', '#FF67B3', '#FF67FF', '#FF3380',
        '#FF66B2', '#FF80FF', '#FF9933', '#FF8C00', '#FFBF00', '#FFD700', '#4A90E2', '#50E3C2', '#7ED321', '#27AE60', '#2ECC71',
        '#1ABC9C', '#16A085', '#2980B9', '#34495E', '#8E44AD', '#9B59B6', '#C0392B', '#D35400', '#7F8C8D', '#95A5A6', '#BDC3C7',
        '#2C3E50', '#8B572A', '#C08080', '#BD10E0', '#FF7F50', '#FF69B4', '#800080', '#FA8072', '#CD5C5C', '#D2691E', '#DC143C',
        '#20B2AA', '#008080', '#8B0000', '#FF4500', '#1E90FF', '#FF6347', '#4682B4', '#5F9EA0', '#6A5ACD', '#708090', '#00FA9A',
        '#00FF7F', '#DA70D6', '#C71585', '#7B68EE', '#DB7093', '#9400D3', '#2E8B57', '#BA55D3', '#7FFF00', '#00CED1', '#4169E1',
        '#483D8B', '#7FFFD4', '#40E0D0', '#6B8E23', '#DDA0DD', '#FFE4E1', '#C0C0C0', '#8B4513', '#A0522D', '#FF1493', '#00BFFF',
        '#ADD8E6', '#F08080', '#B0E0E6', '#98FB98', '#DAA520', '#FFB6C1', '#800000', '#FFA07A', '#9370DB', '#8A2BE2', '#FFDEAD',
        '#B22222', '#32CD32', '#808000', '#FFFAF0', '#FFE4C4', '#FF4500', '#DEB887', '#FF00FF', '#9932CC', '#7CFC00', '#468499'
    ];

    // Función para manejar la selección de un color desde la grilla
    const handleColorSelect = (color) => {
        setSelectedColor(color);
        setCustomColor(color);
        onChange(color);
    };

    // Función para manejar el cambio en el input de color personalizado (HEX)
    const handleHexInputChange = (e) => {
        const color = e.target.value;
        setCustomColor(color); // Permitir al usuario escribir cualquier valor
        if (/^#[0-9A-F]{6}$/i.test(color)) {
            setSelectedColor(color);
            onChange(color); // Solo se actualiza si el formato es válido
        }
    };

    // Función para manejar el cambio en el selector de color
    const handleColorPickerChange = (e) => {
        const color = e.target.value;
        setSelectedColor(color);
        setCustomColor(color); // Actualiza el input de texto con el valor del selector
        onChange(color);
    };

    // Renderizar la grilla de colores predefinidos
    const renderColorGrid = () => {
        return (
            <div className="color-grid">
                {predefinedColors.map((color, index) => (
                    <div
                        key={index}
                        className={`color-box ${selectedColor === color ? 'selected' : ''}`}
                        style={{ backgroundColor: color }}
                        onClick={() => handleColorSelect(color)}
                    />
                ))}
                {/* Input para ingresar color manualmente */}
                <input
                    type="text"
                    className="hex-input"
                    value={customColor}
                    onChange={handleHexInputChange}
                    placeholder="#000000"
                    maxLength="7"
                />
            </div>
        );
    };

    // Renderizar el selector de color (color picker)
    const renderColorPicker = () => {
        return (
            <div className="color-picker-container">
                <input
                    type="color"
                    value={selectedColor}
                    onChange={handleColorPickerChange}
                    className="color-picker"
                />
                <span>{selectedColor}</span>
            </div>
        );
    };

    const renderLabel = () => {
        if (!label || labelPosition === 'none') return null;
        return <label className={`bk-color-label bk-color-label-${labelPosition}`}>{label}</label>;
    };

    return (
        <div className={`color-picker-wrapper bk-label-${labelPosition}`}>
            {(labelPosition === 'top' || labelPosition === 'left') && renderLabel()}
            {mode === 'grid' ? renderColorGrid() : renderColorPicker()}
            {(labelPosition === 'bottom' || labelPosition === 'right') && renderLabel()}
        </div>
    );
};

export default ColorPicker;