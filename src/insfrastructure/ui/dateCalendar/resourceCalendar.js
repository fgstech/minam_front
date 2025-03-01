import React, { useState, useEffect, useRef } from 'react';
import './ResourceCalendar.css';

// Función para generar las horas del día (formato 24h)
const generateHours = () => {
    const hours = [];
    for (let i = 0; i < 24; i++) {
        hours.push(`${String(i).padStart(2, '0')}:00`);
    }
    return hours;
};

// Función para obtener los días de la semana
const getWeekDays = (currentDate) => {
    const startOfWeek = new Date(currentDate);
    startOfWeek.setDate(currentDate.getDate() - currentDate.getDay() + 1); // Iniciar en lunes

    const daysOfWeek = [];
    for (let i = 0; i < 7; i++) {
        const day = new Date(startOfWeek);
        day.setDate(startOfWeek.getDate() + i);
        daysOfWeek.push(day);
    }
    return daysOfWeek;
};

const WeekViewCalendar = ({ events = [], renderEvent, toolbarElements }) => {
    const today = new Date();
    const [currentDate, setCurrentDate] = useState(today);
    const [weekDays, setWeekDays] = useState(getWeekDays(today));
    const [currentTimePosition, setCurrentTimePosition] = useState(null);
    const calendarGridRef = useRef(null); // Referencia al grid del calendario para manejar el scroll

    useEffect(() => {
        const updateCurrentTimePosition = () => {
            const now = new Date();
            const hour = now.getHours();
            const minutes = now.getMinutes();
            const slotHeight = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--time-slot-height').replace('px', ''));

            // Calcular la posición de la línea actual
            const totalMinutes = (hour * 60) + minutes;
            const topPosition = ((totalMinutes / 60) * slotHeight) - 20;
            setCurrentTimePosition(topPosition);
        };

        updateCurrentTimePosition();
        const intervalId = setInterval(updateCurrentTimePosition, 60000); // Actualiza cada minuto

        // Hacer scroll a la hora actual al cargar la vista
        if (calendarGridRef.current) {
            calendarGridRef.current.scrollTop = currentTimePosition - calendarGridRef.current.clientHeight / 2;
        }

        return () => clearInterval(intervalId);
    }, [currentTimePosition]);

    const handleToday = () => {
        setCurrentDate(today);
        setWeekDays(getWeekDays(today));
        // Hacer scroll a la hora actual después de volver al día de hoy
        if (calendarGridRef.current) {
            const now = new Date();
            const totalMinutes = (now.getHours() * 60) + now.getMinutes();
            const slotHeight = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--time-slot-height').replace('px', ''));
            const topPosition = (totalMinutes / 60) * slotHeight;
            calendarGridRef.current.scrollTop = topPosition - calendarGridRef.current.clientHeight / 2;
        }
    };

    const handleNextWeek = () => {
        const nextWeek = new Date(currentDate);
        nextWeek.setDate(currentDate.getDate() + 7);
        setCurrentDate(nextWeek);
        setWeekDays(getWeekDays(nextWeek));
    };

    const handlePreviousWeek = () => {
        const prevWeek = new Date(currentDate);
        prevWeek.setDate(currentDate.getDate() - 7);
        setCurrentDate(prevWeek);
        setWeekDays(getWeekDays(prevWeek));
    };

    // Función para mostrar los eventos en las celdas correspondientes
    const getEventsForDay = (day) => {
        return events.filter(event => new Date(event.date).toDateString() === day.toDateString());
    };

    // Función para agrupar los eventos por rango de tiempo
    const groupEventsByTime = (events) => {
        const grouped = {};

        events.forEach((event) => {
            const start = new Date(event.date);
            const timeKey = `${start.getHours()}:${start.getMinutes()}`;
            if (!grouped[timeKey]) {
                grouped[timeKey] = [];
            }
            grouped[timeKey].push(event);
        });

        return grouped;
    };

    const calculateEventPosition = (event) => {
        const start = new Date(event.date);
        const startHour = start.getHours();
        const startMinutes = start.getMinutes();
        const durationInMinutes = event.duration || 60; // Duración del evento en minutos (por defecto 60)

        // Obtener la altura de un slot de hora desde el CSS (en píxeles)
        const slotHeight = parseFloat(
            getComputedStyle(document.documentElement).getPropertyValue('--time-slot-height').replace('px', '')
        );

        const minutesPerSlot = 60; // Cada slot representa una hora (60 minutos)

        // Cálculo de la posición superior en píxeles, según la hora y los minutos de inicio
        const topPosition = (startHour * slotHeight) + ((startMinutes / minutesPerSlot) * slotHeight);

        // Cálculo de la altura del evento basado en la duración en minutos
        const eventHeight = (durationInMinutes / minutesPerSlot) * slotHeight;

        return { topPosition, eventHeight };
    };

    // Ordenar eventos dentro del mismo grupo según la hora de inicio para determinar el z-index
    const sortEventsByStartTime = (events) => {
        return events.sort((a, b) => {
            const dateA = new Date(a.date);
            const dateB = new Date(b.date);
            return dateA - dateB;
        });
    };


    const renderEventDefaul = (event) => {
        const date = new Date(event.date);
        const enddate = new Date(date);
        enddate.setMinutes(enddate.getMinutes() + event.duration)
        return (
            <div class="calendar-event">
                <div class="event-border" style={{ background: event?.color }}></div>
                <div class="event-content" style={{ background: "#F4F7FE" + "80" }}>
                    <div class="event-header">
                        <span class="event-title">{event.title}</span>
                        <span class="event-time">{`${date.toLocaleTimeString('es-ES', {
                            hour: 'numeric',
                            minute: 'numeric',
                        })} - ${enddate.toLocaleTimeString('es-ES', {
                            hour: 'numeric',
                            minute: 'numeric',
                        })}`}</span>
                    </div>
                    <div class="event-description">{event?.desc}</div>
                </div>
            </div>
        );
    }

    return (
        <div className="week-calendar">
            {/* Controles de navegación */}
            <div className="week-calendar-controls">
                <div>
                    <button onClick={handlePreviousWeek}>
                        <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M10.1831 4.675L6.35811 8.5L10.1831 12.325L8.99977 13.5L3.99977 8.5L8.99977 3.5L10.1831 4.675Z" fill="#848A95" />
                        </svg>
                    </button>
                    <button onClick={handleNextWeek}>
                        <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.81689 12.325L9.6419 8.5L5.8169 4.675L7.00023 3.5L12.0002 8.5L7.00023 13.5L5.81689 12.325Z" fill="#848A95" />
                        </svg>
                    </button>
                    <button className="btn-today" onClick={handleToday}>Hoy</button>
                </div>
                <div>
                    <span>{weekDays[0].toLocaleDateString('es-ES', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                    })} <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.81689 12.325L9.6419 8.5L5.8169 4.675L7.00023 3.5L12.0002 8.5L7.00023 13.5L5.81689 12.325Z" fill="#848A95" />
                        </svg> {weekDays[6].toLocaleDateString('es-ES', {
                            day: 'numeric',
                            month: 'long',
                            year: 'numeric'
                        })}</span>
                </div>
                <div>
                    {toolbarElements}
                </div>
            </div>

            {/* Cabecera de los días de la semana */}
            <div className="week-days-header">
                <div className="time-column"></div>
                {weekDays.map((day, index) => (
                    <div key={index} className={`week-day-header ${today.toDateString() === day.toDateString() ? 'today' : ''}`}>
                        <span>{day.toLocaleDateString('es-ES', { weekday: 'long' })} <span className="numeric">{day.toLocaleDateString('es-ES', { day: 'numeric' })}</span></span>
                    </div>
                ))}
            </div>

            {/* Grid del calendario semanal con scroll */}
            <div className="week-calendar-grid scrollable-grid" ref={calendarGridRef}>
                <div className="time-column">
                    {generateHours().map((hour, index) => (
                        <div key={index} className="time-slot">{hour}</div>
                    ))}
                </div>

                {weekDays.map((day, index) => (
                    <div key={index} className={`day-column ${today.toDateString() === day.toDateString() ? 'today' : ''}`}>
                        {generateHours().map((hour, hourIndex) => (
                            <div key={hourIndex} className="hour-cell"></div> // Celdas vacías para el grid de las horas
                        ))}

                        {/* Mostrar eventos agrupados por horario */}
                        {Object.entries(groupEventsByTime(getEventsForDay(day)))
                            .sort(([timeA], [timeB]) => {
                                const [hourA, minuteA] = timeA.split(':').map(Number);
                                const [hourB, minuteB] = timeB.split(':').map(Number);

                                if (hourA === hourB) {
                                    return minuteA - minuteB;
                                }
                                return hourA - hourB;
                            })
                            .map(([timeKey, groupedEvents], groupIndex) => {
                                const startEvent = groupedEvents[0]; // Tomamos el primer evento del grupo para calcular la posición
                                const { topPosition, eventHeight } = calculateEventPosition(startEvent);

                                // Ordenamos los eventos por su hora de inicio
                                const sortedEvents = sortEventsByStartTime(groupedEvents);

                                return (
                                    <div
                                        key={groupIndex}
                                        className="event-group"
                                        style={{ top: `${topPosition}px`, height: `${eventHeight}px`, position: 'absolute', width: '100%' }}
                                    >
                                        {sortedEvents.map((event, eventIndex) => (
                                            <div
                                                key={eventIndex}
                                                className="event"
                                                style={{
                                                    zIndex: eventIndex + 1,  // Aplicar el z-index a cada evento según su posición en el array
                                                }}
                                            >
                                                {renderEvent ? renderEvent(event) : renderEventDefaul(event)}
                                            </div>
                                        ))}
                                    </div>
                                );
                            })}
                    </div>
                ))}

                {/* Línea de la hora actual */}
                {today.toDateString() === currentDate.toDateString() && currentTimePosition !== null && (
                    <div
                        className="current-time-line"
                        style={{
                            top: `${currentTimePosition}px`, /* Calculamos en píxeles */
                            left: '60px',
                            right: '0',
                            position: 'absolute',
                            height: '2px',
                        }}  /* Ocupa todo el ancho menos la columna de horas */
                    />
                )}
            </div>
        </div>
    );
};

export default WeekViewCalendar;