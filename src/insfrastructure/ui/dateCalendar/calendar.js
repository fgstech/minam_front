import React, { useState, useEffect } from 'react';
import './Calendar.css';

// Función para obtener los días en un mes
const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
};

// Función para obtener el nombre del mes
const getMonthName = (monthIndex) => {
    const months = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];
    return months[monthIndex];
};

// Función para obtener el día de la semana del primer día del mes
const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month, 1).getDay();
};

// Función para rotar los días de la semana según el primer día de la semana
const getWeekdays = (firstDayOfWeek) => {
    const days = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
    return [...days.slice(firstDayOfWeek), ...days.slice(0, firstDayOfWeek)];
};

export const Calendar = ({ onSelect, firstDayOfWeek = 1, disabledDates = [], minDate = null, maxDate = null }) => {
    const today = new Date();
    const [selectedDate, setSelectedDate] = useState(null);
    const [currentYear, setCurrentYear] = useState(today.getFullYear());
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());

    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth);

    const weekdays = getWeekdays(firstDayOfWeek);

    // Cambiar el mes
    const changeMonth = (direction) => {
        let newMonth = currentMonth + direction;
        let newYear = currentYear;

        if (newMonth < 0) {
            newMonth = 11;
            newYear -= 1;
        } else if (newMonth > 11) {
            newMonth = 0;
            newYear += 1;
        }

        setCurrentMonth(newMonth);
        setCurrentYear(newYear);
    };

    // Verificar si la fecha está dentro del rango permitido
    const isDateInRange = (date) => {
        if (minDate && date < minDate) return false;
        if (maxDate && date > maxDate) return false;
        return true;
    };

    // Verificar si la fecha está deshabilitada
    const isDateDisabled = (day) => {
        const date = new Date(currentYear, currentMonth, day);
        if (!isDateInRange(date)) return true;
        const formattedDate = date.toISOString().split('T')[0];
        return disabledDates.includes(formattedDate);
    };

    // Manejar la selección de fecha
    const handleDayClick = (day) => {
        const newDate = new Date(currentYear, currentMonth, day);
        if (!isDateDisabled(day)) {
            setSelectedDate(newDate);
            if (onSelect) {
                onSelect(newDate);
            }
        }
    };

    // Verificar si el día es hoy
    const isToday = (day) => {
        return (
            today.getFullYear() === currentYear &&
            today.getMonth() === currentMonth &&
            today.getDate() === day
        );
    };

    return (
        <div className="calendar-container">
            <div className="calendar-header">
                <button onClick={() => changeMonth(-1)}>
                    <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.1831 4.675L6.35811 8.5L10.1831 12.325L8.99977 13.5L3.99977 8.5L8.99977 3.5L10.1831 4.675Z" fill="#848A95" />
                    </svg>
                </button>
                <span>{getMonthName(currentMonth)} {currentYear}</span>
                <button onClick={() => changeMonth(1)}>
                    <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.81689 12.325L9.6419 8.5L5.8169 4.675L7.00023 3.5L12.0002 8.5L7.00023 13.5L5.81689 12.325Z" fill="#848A95" />
                    </svg>
                </button>
            </div>

            <div className="calendar-weekdays">
                {weekdays.map((day, index) => (
                    <div key={index} className="weekday">{day}</div>
                ))}
            </div>

            <div className="calendar-days">
                {/* Rellenar los días vacíos antes del primer día del mes */}
                {Array((firstDayOfMonth - firstDayOfWeek + 7) % 7).fill(null).map((_, index) => (
                    <div key={index} className="empty-day"></div>
                ))}

                {/* Mostrar los días del mes */}
                {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => (
                    <div
                        key={day}
                        className={`calendar-day ${selectedDate && selectedDate.getDate() === day ? 'selected' : ''} ${isDateDisabled(day) ? 'disabled' : ''} ${isToday(day) ? 'today' : ''}`}
                        onClick={() => handleDayClick(day)}
                    >
                        {day}
                    </div>
                ))}
            </div>
        </div>
    );
};