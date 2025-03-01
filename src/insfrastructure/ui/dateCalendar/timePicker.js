import React, { useState, useEffect, useRef } from 'react';
import './TimePicker.css';

// Generar las horas en formato de 12 o 24 horas
const generateHours = (is12HourFormat = false) => {
    const hours = [];
    for (let hour = is12HourFormat ? 1 : 0; hour <= (is12HourFormat ? 12 : 23); hour++) {
        hours.push(String(hour).padStart(2, '0'));
    }
    return hours;
};

// Generar los minutos en intervalos configurables
const generateMinutes = (interval = 15) => {
    const minutes = [];
    for (let minute = 0; minute < 60; minute += interval) {
        minutes.push(String(minute).padStart(2, '0'));
    }
    return minutes;
};

// Formatear el tiempo seleccionado para mostrarlo
const formatTime = (hour, minute, is12HourFormat = false, amPm = 'AM') => {
    return `${hour}:${minute} ${is12HourFormat ? amPm : ''}`.trim();
};

// Convertir una hora y minuto a un objeto Date para comparaciones
export const convertToDate = (hour, minute, is12HourFormat = false, amPm = 'AM') => {
    const date = new Date();
    let parsedHour = parseInt(hour, 10);

    // Ajustar el formato de 12 horas
    if (is12HourFormat) {
        if (amPm === 'PM' && parsedHour < 12) {
            parsedHour += 12; // Convertir PM a formato de 24 horas
        } else if (amPm === 'AM' && parsedHour === 12) {
            parsedHour = 0; // Convertir 12 AM a 00:00
        }
    }

    date.setHours(parsedHour);
    date.setMinutes(minute);
    date.setSeconds(0);
    return date;
};

// Comprobar si una hora está dentro de un rango de tiempo
const isTimeInRange = (hour, minute, minTime, maxTime, is12HourFormat, amPm) => {
    const selectedTime = convertToDate(hour, minute, is12HourFormat, amPm);

    if (minTime && selectedTime < minTime) return false;
    if (maxTime && selectedTime > maxTime) return false;

    return true;
};

// Comprobar si una hora está en la lista de horas deshabilitadas
const isTimeDisabled = (hour, minute, disabledTimes = [], is12HourFormat = false, amPm = 'AM') => {
    const timeString = `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')} ${is12HourFormat ? amPm : ''}`.trim();
    return disabledTimes.includes(timeString);
};

export const TimePicker = ({
    onChange,
    label = null,
    interval = 15,
    minTime = null,
    maxTime = null,
    disabledTimes = [], // Lista de horas deshabilitadas (ej: ['08:15', '10:30'])
    is12HourFormat = false,
}) => {
    const [selectedHour, setSelectedHour] = useState(is12HourFormat ? '12' : '00');
    const [selectedMinute, setSelectedMinute] = useState('00');
    const [amPm, setAmPm] = useState('AM');
    const [visible, setVisible] = useState(false); // Controlar visibilidad del selector
    const pickerRef = useRef(null); // Referencia para manejar clics fuera

    // Generar opciones de horas y minutos
    const hours = generateHours(is12HourFormat);
    const minutes = generateMinutes(interval);

    // Manejar la selección de hora y minuto
    const handleTimeSelection = (hour, minute) => {
        const formattedTime = formatTime(hour, minute, is12HourFormat, amPm);
        setSelectedHour(hour);
        setSelectedMinute(minute);

        if (onChange) {
            onChange(formattedTime);
        }
    };

    // Verificar si una hora es seleccionable basándose en `minTime`, `maxTime` y `disabledTimes`
    const isSelectableTime = (hour, minute) => {
        if (!isTimeInRange(hour, minute, minTime, maxTime, is12HourFormat, amPm)) return false;
        if (isTimeDisabled(hour, minute, disabledTimes, is12HourFormat, amPm)) return false;

        return true;
    };

    // Manejar clics fuera del componente para cerrar el TimePicker
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (pickerRef.current && !pickerRef.current.contains(event.target)) {
                setVisible(false); // Oculta el selector si haces clic fuera
                if (selectedHour !== null && selectedMinute !== null) {
                    // Enviar la hora seleccionada cuando se cierra el selector
                    const selectedTime = formatTime(selectedHour, selectedMinute, is12HourFormat, amPm);
                    if (onChange) {
                        onChange(selectedTime);
                    }
                }
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [selectedHour, selectedMinute, amPm, onChange, is12HourFormat]);

    return (
        <div className="time-picker" ref={pickerRef}>
            <div className="relative inputTime" style={{ display: 'flex', flexDirection: 'column', paddingTop: 5 }}>
                {label ? <label className="InputLabel">{label}</label> : null}
                <input
                    type="text"
                    readOnly
                    value={formatTime(selectedHour, selectedMinute, is12HourFormat, amPm)}
                    onClick={() => setVisible(!visible)}
                    className="time-input"
                />
            </div>

            {/* Selector de tiempo con scroll */}
            {visible && (
                <div className="time-options-container">
                    <div className="time-options">
                        <div className="scroll-container hours">
                            {hours.filter(hour => isSelectableTime(hour, selectedMinute)).map((hour, index) => (
                                <div
                                    key={index}
                                    className={`time-option ${hour === selectedHour ? 'selected' : ''}`}
                                    onClick={() => setSelectedHour(hour)}
                                >
                                    {hour}
                                </div>
                            ))}
                        </div>
                        <div className="scroll-container minutes">
                            {minutes.map((minute, index) => {
                                const disabled = !isSelectableTime(selectedHour, minute);
                                return (
                                    <div
                                        key={index}
                                        className={`time-option ${minute === selectedMinute ? 'selected' : ''} ${disabled ? 'disabled' : ''}`}
                                        onClick={() => !disabled && setSelectedMinute(minute)}
                                    >
                                        {minute}
                                    </div>
                                );
                            })}
                        </div>
                        {is12HourFormat && (
                            <div className="am-pm-selector">
                                <div
                                    className={`am-pm-option ${amPm === 'AM' ? 'selected' : ''}`}
                                    onClick={() => setAmPm('AM')}
                                >
                                    AM
                                </div>
                                <div
                                    className={`am-pm-option ${amPm === 'PM' ? 'selected' : ''}`}
                                    onClick={() => setAmPm('PM')}
                                >
                                    PM
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};