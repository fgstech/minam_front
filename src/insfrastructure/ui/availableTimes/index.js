import React, { useState } from 'react';
import './AvailableTimes.css';  // Importar el archivo CSS

const AvailableTimes = ({ timeSlots, onChange }) => {
    const [selectedTime, setSelectedTime] = useState(null);

    const handleTimeSelect = (slot) => {
        setSelectedTime(slot);
        // Llamar a la función onChange con la hora seleccionada
        if (onChange) {
            onChange(slot);
        }
    };

    // Función para formatear la hora en formato de 24 horas (solo mostrar la hora de inicio)
    const formatTimeSlot = (start) => {
        return new Date(start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
    };

    return (
        <div className="available-times">
            <label>Seleccione una hora disponible:</label>
            <div className="grid-container">
                {timeSlots.map((slot, index) => (
                    <button
                        key={index}
                        className={`time-button ${selectedTime === slot ? 'selected' : ''}`}
                        onClick={() => handleTimeSelect(slot)}
                    >
                        {formatTimeSlot(slot.start)}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default AvailableTimes;