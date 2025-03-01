import React, { useState, useEffect, useRef } from 'react';
import './TimelineView.css';

const generateHours = () => {
    const hours = [];
    for (let i = 0; i < 24; i++) {
        hours.push(`${String(i).padStart(2, '0')}:00`);
    }
    return hours;
};

const calculateEventPosition = (event, startHour, endHour, slotWidth) => {
    const eventStart = new Date(event.start);
    const eventEnd = new Date(event.end);

    const eventStartHour = eventStart.getHours();
    const eventStartMinutes = eventStart.getMinutes();
    const eventEndHour = eventEnd.getHours();
    const eventEndMinutes = eventEnd.getMinutes();

    const totalMinutesInDay = (endHour - startHour) * 60;
    const eventDurationInMinutes = ((eventEndHour * 60 + eventEndMinutes) - (eventStartHour * 60 + eventStartMinutes));

    const startPositionPercentage = ((eventStartHour * 60 + eventStartMinutes) - (startHour * 60)) / totalMinutesInDay * 100;
    const eventWidthPercentage = eventDurationInMinutes / totalMinutesInDay * 100;

    const startPositionPixels = (startPositionPercentage / 100) * ((endHour - startHour) * slotWidth);
    const eventWidthPixels = (eventWidthPercentage / 100) * ((endHour - startHour) * slotWidth);

    return { startPositionPixels, eventWidthPixels };
};

const calculateCurrentTimePosition = (startHour, endHour, slotWidth) => {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinutes = now.getMinutes();

    const totalMinutesInDay = (endHour - startHour) * 60;
    const minutesSinceStart = (currentHour * 60 + currentMinutes) - (startHour * 60);

    const positionPercentage = (minutesSinceStart / totalMinutesInDay) * 100;
    const positionPixels = (positionPercentage / 100) * ((endHour - startHour) * slotWidth);

    return positionPixels;
};

const TimelineView = ({ resources = [], events = [], startHour = 0, endHour = 24, slotWidth = 100, height = "100vh" }) => {
    const ref = useRef();
    const [hours, setHours] = useState([]);
    const [currentTimePosition, setCurrentTimePosition] = useState(null);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [filteredEvents, setFilteredEvents] = useState(events); // Inicializa con todos los eventos o un array vacío
    const [heightLine, setHeightLine] = useState("auto");

    // useEffect(() => {
    //     const generatedHours = generateHours().slice(startHour, endHour);
    //     setHours(generatedHours);

    //     const updateCurrentTimePosition = () => {
    //         const position = calculateCurrentTimePosition(startHour, endHour, slotWidth);
    //         setCurrentTimePosition(position);
    //     };

    //     updateCurrentTimePosition();
    //     const intervalId = setInterval(updateCurrentTimePosition, 60000);

    //     calculateHeightOfSiblingsExceptMain(ref.current)

    //     return () => clearInterval(intervalId);
    // }, [startHour, endHour, slotWidth]);

    useEffect(() => {
        const generatedHours = generateHours().slice(startHour, endHour);
        setHours(generatedHours);
    
        // Calcular la posición de la hora actual y actualizar cada minuto
        const updateCurrentTimePosition = () => {
            const position = calculateCurrentTimePosition(startHour, endHour, slotWidth);
            setCurrentTimePosition(position);
        };
    
        updateCurrentTimePosition();
        const intervalId = setInterval(updateCurrentTimePosition, 60000); // Actualizar cada minuto
    
        // Ajustar el scroll inicial solo después de que la vista esté completamente montada
        const adjustInitialScroll = () => {
            if (ref.current && currentTimePosition !== null) {
                // Centrar la posición actual de la hora
                ref.current.scrollLeft = currentTimePosition - (ref.current.clientWidth / 2);
            }
        };
    
        // Usamos setTimeout para asegurarnos que el layout está renderizado antes de ajustar el scroll
        setTimeout(adjustInitialScroll, 100);
    
        return () => clearInterval(intervalId); // Limpiar el intervalo al desmontar el componente
    }, [startHour, endHour, slotWidth, currentTimePosition]);

    const getEventsForResource = (resourceId) => {
        return filteredEvents.filter(event => event.resourceId === resourceId);
    };

    const filterEventsByDate = (date) => {
        return events.filter(event => {
            const eventDate = new Date(event.start).toDateString();
            return eventDate === date.toDateString(); // Compara solo el día, mes y año
        });
    };

    const handlePreviousDay = () => {
        const newDate = new Date(currentDate);
        newDate.setDate(currentDate.getDate() - 1);
        setCurrentDate(newDate);

        // Actualizamos los eventos filtrados para el día anterior
        const filteredEvents = filterEventsByDate(newDate);
        setFilteredEvents(filteredEvents); // Actualiza el estado de los eventos mostrados
    };

    const handleNextDay = () => {
        const newDate = new Date(currentDate);
        newDate.setDate(currentDate.getDate() + 1);
        setCurrentDate(newDate);

        // Actualizamos los eventos filtrados para el día siguiente
        const filteredEvents = filterEventsByDate(newDate);
        setFilteredEvents(filteredEvents); // Actualiza el estado de los eventos mostrados
    };

    return (
        <div className="timeline-view">
            <div className="toolbar">
                <button onClick={handlePreviousDay}>
                    <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.1831 4.675L6.35811 8.5L10.1831 12.325L8.99977 13.5L3.99977 8.5L8.99977 3.5L10.1831 4.675Z" fill="#848A95" />
                    </svg>
                </button>
                <button onClick={handleNextDay}>
                    <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.81689 12.325L9.6419 8.5L5.8169 4.675L7.00023 3.5L12.0002 8.5L7.00023 13.5L5.81689 12.325Z" fill="#848A95" />
                    </svg>
                </button>
                <span>{currentDate.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
            </div>

            <div className="scrollable-area" style={{ height }}>
                <div className="resource-column">
                    <div className="resource-header">Recursos</div>
                    {resources.map((resource, index) => (
                        <div key={index} className="resource-name">{resource.name}</div>
                    ))}
                </div>

                <div className="hours-events-container" style={{ gridTemplateColumns: `repeat(${endHour - startHour}, ${slotWidth}px)` }}>
                    <div className="hours-row" style={{ gridTemplateColumns: `repeat(${endHour - startHour}, ${slotWidth}px)` }}>
                        {hours.map((hour, index) => (
                            <div key={index} className="hour-header-cell">{hour}</div>
                        ))}
                    </div>

                    <div className="resources-events-body" ref={ref}>
                        {resources.map((resource, resourceIndex) => (
                            <div key={resourceIndex} className="resource-row" style={{ gridTemplateColumns: `repeat(${endHour - startHour}, ${slotWidth}px)` }}>
                                {hours.map((_, hourIndex) => (
                                    <div key={hourIndex} className="hour-cell"></div>
                                ))}

                                {getEventsForResource(resource.id).map((event, eventIndex) => {
                                    const { startPositionPixels, eventWidthPixels } = calculateEventPosition(event, startHour, endHour, slotWidth);
                                    return (
                                        <div
                                            key={eventIndex}
                                            className="event"
                                            style={{
                                                left: `${startPositionPixels}px`,
                                                width: `${eventWidthPixels}px`,
                                            }}
                                        >
                                            {/* <div className="event-content">
                                                <span>{event.title}</span>
                                                <span>{new Date(event.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                            </div> */}
                                            <div class="calendar-event">
                                                <div class="event-border" style={{ background:event?.color || "#074fdd" }}></div>
                                                <div class="event-content" style={{ background: "#F4F7FE" + "80" }}>
                                                    <div class="event-header">
                                                        <span class="event-title">{event.title}</span>
                                                        <span className='hour'>{new Date(event.start).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ))}
                    </div>

                    {currentTimePosition !== null && (
                        <div
                            className="current-time-line"
                            style={{
                                left: `${currentTimePosition}px`,
                                top: '0',
                                bottom: '0',
                                position: 'absolute',
                                height: heightLine
                            }}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default TimelineView;