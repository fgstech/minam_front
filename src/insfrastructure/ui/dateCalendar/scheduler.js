import React, { useState } from 'react';
import './Scheduler.css';

// Funciones auxiliares
const getDaysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();
const getMonthName = (monthIndex) => ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'][monthIndex];
const getFirstDayOfMonth = (year, month) => new Date(year, month, 1).getDay();
const getWeekdays = (firstDayOfWeek) => ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].slice(firstDayOfWeek).concat(["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].slice(0, firstDayOfWeek));

export const Scheduler = ({ branches, onSelectAppointment }) => {
    const today = new Date();
    const [selectedDate, setSelectedDate] = useState(null);
    const [currentYear, setCurrentYear] = useState(today.getFullYear());
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [selectedBranch, setSelectedBranch] = useState(null);
    const [selectedService, setSelectedService] = useState(null);
    const [selectedProfessional, setSelectedProfessional] = useState(null);

    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
    const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth);
    const weekdays = getWeekdays(1);

    // Obtener servicios según la sucursal seleccionada
    const getServicesForBranch = (branch) => {
        if (!branch) return [];
        return branch.services;
    };

    // Obtener profesionales según la sucursal seleccionada y el servicio seleccionado
    const getProfessionalsForService = (branch, serviceId) => {
        if (!branch || !serviceId) return [];
        return branch.professionals.filter(professional => 
            professional.services.includes(serviceId)
        );
    };

    // Cambiar el mes en el calendario
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
        setSelectedDate(null);
    };

    // Manejo de selección de sucursal
    const handleBranchChange = (branchId) => {
        const branch = branches.find(b => b.id === branchId);
        setSelectedBranch(branch);
        setSelectedService(null); // Resetear servicio y profesional al cambiar de sucursal
        setSelectedProfessional(null);
        setSelectedDate(null);
    };

    // Manejo de selección de servicio
    const handleServiceChange = (serviceId) => {
        setSelectedService(serviceId);
        setSelectedProfessional(null); // Resetear profesional al cambiar de servicio
        setSelectedDate(null);
    };

    // Manejo de selección de profesional
    const handleProfessionalChange = (professionalId) => {
        const professional = getProfessionalsForService(selectedBranch, selectedService).find(p => p.id === professionalId);
        setSelectedProfessional(professional);
        setSelectedDate(null);
    };

    // Manejo de selección de día en el calendario
    const handleDayClick = (day) => {
        const newDate = new Date(currentYear, currentMonth, day);
        setSelectedDate(newDate);
        if (onSelectAppointment && selectedProfessional) {
            onSelectAppointment({
                date: newDate,
                branch: selectedBranch,
                service: selectedService,
                professional: selectedProfessional,
            });
        }
    };

    // Obtener los días disponibles del profesional seleccionado
    const getAvailableDays = () => {
        if (!selectedProfessional || !selectedService) return [];
        const availability = selectedProfessional.availability[selectedService] || {};
        return Object.keys(availability).map(date => {
            const [year, month, day] = date.split('-').map(Number);
            if (year === currentYear && month - 1 === currentMonth) {
                return day;
            }
            return null;
        }).filter(day => day !== null);
    };

    const availableDays = getAvailableDays();

    return (
        <div className="scheduler-container">
            {/* Selección de Sucursal */}
            <div className="branch-selector">
                <label htmlFor="branch">Selecciona una sucursal:</label>
                <select
                    id="branch"
                    value={selectedBranch ? selectedBranch.id : ''}
                    onChange={(e) => handleBranchChange(e.target.value)}
                >
                    <option value="">Selecciona una sucursal</option>
                    {branches.map(branch => (
                        <option key={branch.id} value={branch.id}>
                            {branch.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* Selección de Servicio */}
            {selectedBranch && (
                <div className="service-selector">
                    <label htmlFor="service">Selecciona un servicio:</label>
                    <select
                        id="service"
                        value={selectedService || ''}
                        onChange={(e) => handleServiceChange(e.target.value)}
                    >
                        <option value="">Selecciona un servicio</option>
                        {getServicesForBranch(selectedBranch).map(service => (
                            <option key={service.id} value={service.id}>
                                {service.name}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {/* Selección de Profesional */}
            {selectedService && (
                <div className="professional-selector">
                    <label htmlFor="professional">Selecciona un profesional:</label>
                    <select
                        id="professional"
                        value={selectedProfessional ? selectedProfessional.id : ''}
                        onChange={(e) => handleProfessionalChange(e.target.value)}
                    >
                        <option value="">Selecciona un profesional</option>
                        {getProfessionalsForService(selectedBranch, selectedService).map(professional => (
                            <option key={professional.id} value={professional.id}>
                                {professional.name}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {/* Calendario */}
            {selectedProfessional && (
                <div className="calendar-container">
                    <div className="calendar-header">
                        <button onClick={() => changeMonth(-1)}>&lt;</button>
                        <span>{getMonthName(currentMonth)} {currentYear}</span>
                        <button onClick={() => changeMonth(1)}>&gt;</button>
                    </div>

                    <div className="calendar-weekdays">
                        {weekdays.map((day, index) => (
                            <div key={index} className="weekday">{day}</div>
                        ))}
                    </div>

                    <div className="calendar-days">
                        {Array((getFirstDayOfMonth(currentYear, currentMonth) - 1 + 7) % 7).fill(null).map((_, index) => (
                            <div key={index} className="empty-day"></div>
                        ))}

                        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map((day) => (
                            <div
                                key={day}
                                className={`calendar-day ${availableDays.includes(day) ? 'available-day' : ''} ${selectedDate && selectedDate.getDate() === day ? 'selected' : ''}`}
                                onClick={() => handleDayClick(day)}
                            >
                                {day}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Horarios disponibles */}
            {selectedDate && selectedProfessional && (
                <div className="available-times">
                    <h4>Horarios disponibles para {selectedDate.toLocaleDateString()}:</h4>
                    {/* Muestra los horarios disponibles del profesional para la fecha seleccionada */}
                </div>
            )}
        </div>
    );
};