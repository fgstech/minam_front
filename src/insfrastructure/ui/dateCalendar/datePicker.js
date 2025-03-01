import React, { useState, useEffect, useRef } from 'react';
import './DatePicker.css'; // Asegúrate de tener tu archivo CSS

// Función para obtener los días en un mes
const getDaysInMonth = (year, month) => {
    return new Date(year, month, 0).getDate(); // Ajustamos a que el mes comience desde 1
};

// Función para obtener el nombre del mes
const getMonthName = (monthIndex) => {
    const months = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    return months[monthIndex - 1]; // Ajustamos para que el índice comience desde 1
};

// Función para obtener el día de la semana (índice) del primer día del mes
const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month - 1, 1).getDay(); // Ajustamos para que el mes comience desde 1
};

// Función para comparar fechas y determinar si son iguales
const compareDates = (date1, date2) => {
    if (!date1 || !date2) return false; // Verifica que ambas fechas sean válidas
    return (
        date1.getDate() === date2.getDate() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getFullYear() === date2.getFullYear()
    );
};

// Función para verificar si una fecha está entre dos fechas
const isDateBetween = (date, startDate, endDate) => {
    if (!startDate || !endDate) return false; // Verifica que ambas fechas sean válidas
    return date >= startDate && date <= endDate;
};

// Función para comparar fechas y determinar si una fecha está fuera de rango
const isDateInRange = (date, minDate, maxDate) => {
    if (minDate && date < minDate) return false;
    if (maxDate && date > maxDate) return false;
    return true;
};

// Función para rotar los días de la semana según el primer día de la semana
const getWeekdays = (firstDayOfWeek) => {
    const days = ["D", "L", "M", "M", "J", "V", "S"];
    return [...days.slice(firstDayOfWeek), ...days.slice(0, firstDayOfWeek)];
};

export const DatePicker = ({
    onChange,
    onRangeChange,
    range = false,
    disabledDays = [],
    minDate = null,
    maxDate = null,
    label = null,
    firstDayOfWeek = 1,
    value = null
}) => {
    const today = new Date(2000,0,1);
    const [selectedDate, setSelectedDate] = useState(today);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [visible, setVisible] = useState(false);
    const [currentYear, setCurrentYear] = useState(today.getFullYear());
    const [currentMonth, setCurrentMonth] = useState(today.getMonth() + 1);
    const pickerRef = useRef(null);
    const now = new Date();
    const years = Array.from(
        { length: (maxDate ? maxDate.getFullYear() : now.getFullYear()) - (minDate ? minDate.getFullYear() : 1900) + 1 },
        (_, i) => (minDate ? minDate.getFullYear() : 1900) + i
    );

    useEffect(() => {
        if (value) {
            const newDate = new Date(value);
            setSelectedDate(newDate);
            setCurrentYear(newDate.getFullYear());
            setCurrentMonth(newDate.getMonth() + 1);
        }
    }, [value]);

    const changeMonth = (month) => {
        setCurrentMonth(month);
    };

    const changeYear = (year) => {
        setCurrentYear(year);
    };

    const handleDayClick = (day) => {
        const date = new Date(currentYear, currentMonth - 1, day);

        if (!isDateInRange(date, minDate, maxDate)) return;

        if (range) {
            if (!startDate || (startDate && endDate)) {
                setStartDate(date);
                setEndDate(null);
                if (onRangeChange) {
                    onRangeChange({ start: date, end: null });
                }
            } else if (startDate && !endDate && date >= startDate) {
                setEndDate(date);
                setVisible(false);
                if (onRangeChange) {
                    onRangeChange({ start: startDate, end: date });
                }
            }
        } else {
            setSelectedDate(date);
            setVisible(false);
            if (onChange) {
                onChange(date);
            }
        }
    };

    const formatDate = (date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    const isDayDisabled = (day) => {
        const date = new Date(currentYear, currentMonth - 1, day);
        const dayOfWeek = date.getDay();

        if (disabledDays.includes(dayOfWeek)) return true;
        if (!isDateInRange(date, minDate, maxDate)) return true;
        return false;
    };

    const weekdays = getWeekdays(firstDayOfWeek);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (pickerRef.current && !pickerRef.current.contains(event.target)) {
                setVisible(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="date-picker" ref={pickerRef}>
            <div className="relative inputTime" style={{ display: "flex", flexDirection: "column", paddingTop: 5 }}>
                {label ? <label className="InputLabel">{label}</label> : null}
                <input
                    type="text"
                    readOnly
                    value={range && startDate ? `${formatDate(startDate)} - ${endDate ? formatDate(endDate) : '...'}` : formatDate(selectedDate)}
                    onClick={() => setVisible(!visible)}
                    className="date-input"
                />
            </div>

            {visible && (
                <div className="calendar">
                    <div className="header">
                        {/* Selector de Año */}
                        <select
                            value={currentYear}
                            onChange={(e) => changeYear(Number(e.target.value))}
                            className="year-selector"
                        >
                            {years.reverse().map((year) => (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            ))}
                        </select>

                        {/* Selector de Mes */}
                        <select
                            value={currentMonth}
                            onChange={(e) => changeMonth(Number(e.target.value))}
                            className="month-selector"
                        >
                            {Array.from({ length: 12 }, (_, i) => (
                                <option key={i + 1} value={i + 1}>
                                    {getMonthName(i + 1)}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="weekdays">
                        {weekdays.map((day, index) => (
                            <div key={index}>{day}</div>
                        ))}
                    </div>

                    <div className="days">
                        {Array((getFirstDayOfMonth(currentYear, currentMonth) - firstDayOfWeek + 7) % 7)
                            .fill(null)
                            .map((_, index) => (
                                <div key={index}></div>
                            ))}
                        {Array.from({ length: getDaysInMonth(currentYear, currentMonth) }, (_, i) => {
                            const day = i + 1;
                            const date = new Date(currentYear, currentMonth - 1, day);
                            const isSelected = !range && compareDates(date, selectedDate);
                            const isInRange = range && startDate && endDate && isDateBetween(date, startDate, endDate);
                            const isStartDate = range && startDate && compareDates(date, startDate);
                            const isEndDate = range && endDate && compareDates(date, endDate);
                            const isToday = compareDates(date, today);

                            return (
                                <div
                                    key={day}
                                    className={`day ${isDayDisabled(day) ? 'disabled' : ''} 
                                        ${isSelected ? 'selected' : ''} 
                                        ${isInRange ? 'in-range' : ''} 
                                        ${isStartDate ? 'start-date' : ''} 
                                        ${isEndDate ? 'end-date' : ''} 
                                        ${isToday ? 'today' : ''}`}
                                    onClick={() => !isDayDisabled(day) && handleDayClick(day)}
                                >
                                    {day}
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};