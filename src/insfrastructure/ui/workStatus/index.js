import React, { useEffect, useState } from "react";
import "./WorkStatusChat.css"; // Agrega los estilos aquí
import Axios from "axios";
import Applications from '../../../application/Applications';

const WorkStatusChat = () => {
    const [isOpen, setIsOpen] = useState(false); // Controla si el chat está abierto
    const [stepIndex, setStepIndex] = useState(0); // Índice del paso actual
    const [userResponses, setUserResponses] = useState({}); // Respuestas del usuario
    const [textInput, setTextInput] = useState(""); // Controla el input de texto
    const [history, setHistory] = useState([]); // Guarda los pasos anteriores
    const [flowSteps, setFlowSteps] = useState([]);
    const [end, setEnd] = useState(false);

    useEffect(() => {
        const fetchFlowSteps = async () => {
            try {
                const payload = await Applications.getPayload();
                const res = await Axios.post("/api/flowstep/flowstep", { email: payload?.username });
                setFlowSteps(res.data.data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchFlowSteps();
    }, []);

    const close = () => {
        setIsOpen(false);
        setStepIndex(0);
        setUserResponses({});
        setTextInput("");
        setHistory([]);
    };

    useEffect(async () => {
        if (end) {
            const data = Object.assign({}, userResponses);
            await sendResponseToServer(data);
        }
    }, [end])

    const sendResponseToServer = async (data) => {
        const payload = await Applications.getPayload();
        return await Axios.post("/api/flowstep/response", {
            email: payload?.username,
            data: data
        });
    }

    const handleResponse = async (selectedOption, nextStep) => {
        setUserResponses(prevResponses => ({
            ...prevResponses,
            [flowSteps[stepIndex].id]: {
                value: selectedOption.value,
                label: selectedOption.label
            }
        }));

        setTextInput(""); // Limpia el campo de texto después de enviar la respuesta

        if (nextStep === "end") {
            setStepIndex(flowSteps.length);
            setEnd(true);
        } else {
            const nextIndex = flowSteps.findIndex(step => step.id === nextStep);
            if (nextIndex !== -1) {
                setHistory(prevHistory => [...prevHistory, stepIndex]); // Guarda el paso actual en el historial
                setStepIndex(nextIndex);
            }
        }
    };

    const goBack = () => {
        if (history.length > 0) {
            const prevStepIndex = history[history.length - 1];
            setHistory(prevHistory => prevHistory.slice(0, -1)); // Elimina el último paso del historial
            setStepIndex(prevStepIndex);
        }
    };

    return (
        <div className={`chat-container ${isOpen ? "open" : ""}`}>
            <div className="chat-header" onClick={() => setIsOpen(!isOpen)}>
                ¿Estado Laboral?
            </div>

            {isOpen && (
                <div className="chat-body">
                    {stepIndex >= flowSteps.length ? (
                        <div>
                            <p>¡Gracias por actualizar tu información!</p>
                            <button className="button-close" onClick={close}>
                                Cerrar
                            </button>
                        </div>
                    ) : (
                        <div className="chat-message">
                            <p>{flowSteps[stepIndex]?.question}</p>

                            {flowSteps[stepIndex]?.type === "buttons" && (
                                <div className="options">
                                    {flowSteps[stepIndex]?.options.map((option) => (
                                        <button
                                            key={option.value}
                                            onClick={() => handleResponse(option, option.nextStep)}
                                        >
                                            {option.label}
                                        </button>
                                    ))}
                                </div>
                            )}

                            {flowSteps[stepIndex]?.type === "select" && (
                                <select
                                    onChange={(e) => {
                                        const selectedOption = flowSteps[stepIndex]?.options.find(opt => opt.value === e.target.value);
                                        if (selectedOption) {
                                            handleResponse(selectedOption, selectedOption.nextStep);
                                        }
                                    }}
                                >
                                    <option value="">Selecciona una opción</option>
                                    {flowSteps[stepIndex]?.options.map((option) => (
                                        <option key={option.value} value={option.value}>{option.label}</option>
                                    ))}
                                </select>
                            )}

                            {flowSteps[stepIndex]?.type === "text" && (
                                <div className="text-input-container">
                                    <input
                                        type="text"
                                        placeholder="Escribe tu respuesta"
                                        value={textInput}
                                        onChange={(e) => setTextInput(e.target.value)}
                                    />
                                    <button
                                        className="send-button"
                                        onClick={() => handleResponse({ value: textInput, label: textInput }, flowSteps[stepIndex]?.nextStep)}
                                        disabled={!textInput.trim()}
                                    >
                                        Enviar
                                    </button>
                                </div>
                            )}

                            {history.length > 0 && (
                                <button className="back-button" onClick={goBack}>
                                    ← Volver
                                </button>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default WorkStatusChat;