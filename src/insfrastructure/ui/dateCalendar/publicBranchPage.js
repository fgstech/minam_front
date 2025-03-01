import React, { useState, useEffect } from 'react';
import './PublicBranchPage.css';

// Paso 1: Selección de Sucursal (si aplica)
const BranchSelection = ({ branches, onSelectBranch }) => (
    <div className="step-container">
        <h3>Selecciona una Sucursal</h3>
        <ul>
            {branches.map((branch) => (
                <li key={branch.id} onClick={() => onSelectBranch(branch)}>
                    {branch.name}
                </li>
            ))}
        </ul>
    </div>
);

// Paso 2: Selección de Servicio
const ServiceSelection = ({ services, categories, onSelectService }) => (
    <div className="step-container">
        <h3>Selecciona un Servicio</h3>
        {categories.map((category) => (
            <div key={category.id} className="category">
                <h4>{category.name}</h4>
                <ul>
                    {services
                        .filter((service) => service.categoryId === category.id)
                        .map((service) => (
                            <li key={service.id} onClick={() => onSelectService(service)}>
                                {service.name}
                            </li>
                        ))}
                </ul>
            </div>
        ))}
    </div>
);

// Paso 3: Selección de Profesional
const ProfessionalSelection = ({ professionals, onSelectProfessional }) => (
    <div className="step-container">
        <h3>Selecciona un Profesional</h3>
        <ul>
            {professionals.map((professional) => (
                <li key={professional.id} onClick={() => onSelectProfessional(professional)}>
                    {professional.name}
                </li>
            ))}
        </ul>
    </div>
);

// Paso 4: Selección de Fecha
const DateSelection = ({ onSelectDate }) => {
    const today = new Date();
    const [selectedDate, setSelectedDate] = useState(today);

    const handleChange = (e) => {
        const newDate = new Date(e.target.value);
        setSelectedDate(newDate);
        onSelectDate(newDate);
    };

    return (
        <div className="step-container">
            <h3>Selecciona una Fecha</h3>
            <input type="date" value={selectedDate.toISOString().substr(0, 10)} onChange={handleChange} />
        </div>
    );
};

// Paso 5: Selección de Hora
const TimeSelection = ({ availableTimes, onSelectTime }) => (
    <div className="step-container">
        <h3>Selecciona una Hora</h3>
        <ul>
            {availableTimes.map((time, index) => (
                <li key={index} onClick={() => onSelectTime(time)}>
                    {time}
                </li>
            ))}
        </ul>
    </div>
);

// Paso 6: Formulario de Datos del Cliente
const ClientForm = ({ onSubmit }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ name, email, phone });
    };

    return (
        <form onSubmit={handleSubmit} className="step-container">
            <h3>Completa tus Datos</h3>
            <div>
                <label>Nombre:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div>
                <label>Email:</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
                <label>Teléfono:</label>
                <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} required />
            </div>
            <button type="submit">Reservar</button>
        </form>
    );
};

export const PublicBranchPage = ({
    branches,
    categories,
    services,
    professionals,
}) => {
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedBranch, setSelectedBranch] = useState(null);
    const [selectedService, setSelectedService] = useState(null);
    const [selectedProfessional, setSelectedProfessional] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [availableTimes, setAvailableTimes] = useState([]);
    const [selectedTime, setSelectedTime] = useState(null);
    const [clientData, setClientData] = useState(null);

    // Funciones para manejar cada selección
    const handleSelectBranch = (branch) => {
        setSelectedBranch(branch);
        setCurrentStep(2); // Avanzar al siguiente paso
    };

    const handleSelectService = (service) => {
        setSelectedService(service);
        setCurrentStep(3); // Avanzar al siguiente paso
    };

    const handleSelectProfessional = (professional) => {
        setSelectedProfessional(professional);
        setCurrentStep(4); // Avanzar al siguiente paso
    };

    const handleSelectDate = (date) => {
        setSelectedDate(date);
        // Suponiendo que aquí se obtienen las horas disponibles según el profesional y la fecha
        const times = selectedProfessional?.availability?.[selectedService.id]?.[date.toISOString().split('T')[0]] || [];
        setAvailableTimes(times);
        setCurrentStep(5); // Avanzar al siguiente paso
    };

    const handleSelectTime = (time) => {
        setSelectedTime(time);
        setCurrentStep(6); // Avanzar al siguiente paso
    };

    const handleBookingSubmit = (data) => {
        setClientData(data);
        alert('¡Reservación exitosa!');
    };

    return (
        <div className="public-branch-page">
            {/* Mostrar cada paso según el estado actual */}
            {currentStep === 1 && (
                <BranchSelection branches={branches} onSelectBranch={handleSelectBranch} />
            )}

            {currentStep === 2 && selectedBranch && (
                <ServiceSelection services={services} categories={categories} onSelectService={handleSelectService} />
            )}

            {currentStep === 3 && selectedService && (
                <ProfessionalSelection
                    professionals={professionals.filter((professional) =>
                        professional.services.includes(selectedService.id)
                    )}
                    onSelectProfessional={handleSelectProfessional}
                />
            )}

            {currentStep === 4 && selectedProfessional && (
                <DateSelection onSelectDate={handleSelectDate} />
            )}

            {currentStep === 5 && availableTimes.length > 0 && (
                <TimeSelection availableTimes={availableTimes} onSelectTime={handleSelectTime} />
            )}

            {currentStep === 6 && selectedTime && (
                <ClientForm onSubmit={handleBookingSubmit} />
            )}

            {/* Mostrar resumen de la reserva */}
            {clientData && (
                <div className="booking-summary">
                    <h4>Resumen de la Reservación</h4>
                    <p><strong>Sucursal:</strong> {selectedBranch?.name}</p>
                    <p><strong>Servicio:</strong> {selectedService?.name}</p>
                    <p><strong>Profesional:</strong> {selectedProfessional?.name}</p>
                    <p><strong>Fecha:</strong> {selectedDate?.toLocaleDateString()}</p>
                    <p><strong>Hora:</strong> {selectedTime}</p>
                    <p><strong>Nombre del Cliente:</strong> {clientData.name}</p>
                    <p><strong>Email:</strong> {clientData.email}</p>
                    <p><strong>Teléfono:</strong> {clientData.phone}</p>
                </div>
            )}
        </div>
    );
};