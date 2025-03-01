import React, { useState, useEffect, Fragment, useRef } from 'react'
import './RichTextEditor.css';


const Editor = ({ value, onChange, label, withLabel = false, minHeight = "100px" }) => {
    const editorRef = useRef(null);
    const [linkUrl, setLinkUrl] = useState('');

    // Función para ejecutar comandos del editor y actualizar el contenido
    const executeCommand = (command, value = null) => {
        document.execCommand(command, false, value);
        // Disparar el onChange después de ejecutar un comando
        handleInput();
    };

    // Función para cambiar el tamaño de fuente
    const changeFontSize = (size) => {
        executeCommand('fontSize', size); // Tamaños disponibles del 1 al 7
    };

    // Función para agregar un enlace
    const addLink = () => {
        if (!linkUrl) {
            alert('Por favor, ingresa una URL para el enlace.');
            return;
        }

        const selection = window.getSelection();
        if (selection.rangeCount > 0 && !selection.isCollapsed) {
            // Solo agrega el enlace si hay texto seleccionado
            executeCommand('createLink', linkUrl);
            setLinkUrl(''); // Limpiar el input después de agregar el enlace
        } else {
            alert('Por favor, selecciona el texto al que deseas agregar el enlace.');
        }
    };

    // useEffect para sincronizar el contenido del editor con props.value
    useEffect(() => {
        if (editorRef.current) {
            const currentEditor = editorRef.current;
            const currentData = currentEditor.innerHTML;

            // Actualiza el contenido del editor solo si es diferente al actual
            if (currentData !== value) {
                currentEditor.innerHTML = value;
            }
        }
    }, [value]);

    // Función para manejar los cambios de contenido y devolverlos a través de onChange
    const handleInput = () => {
        if (editorRef.current && onChange) {
            onChange(editorRef.current.innerHTML); // Devuelve el contenido del editor
        }
    };

    return (
        <>
            <div className="rich-text-editor-container">
                {withLabel ? <label className="SelectLabel">{label}</label> : null}
                <div className="rich-text-editor">
                    <div className="toolbar">
                        <select onChange={(e) => changeFontSize(e.target.value)} defaultValue="">
                            <option value="" disabled>Tamaño de fuente</option>
                            <option value="1">Pequeño</option>
                            <option value="3">Normal</option>
                            <option value="5">Grande</option>
                            <option value="7">Muy grande</option>
                        </select>
                        <button onClick={() => executeCommand('bold')}>
                            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.33333 12.8333H14.5833C15.3569 12.8333 16.0987 12.526 16.6457 11.9791C17.1927 11.4321 17.5 10.6902 17.5 9.91667C17.5 9.14312 17.1927 8.40126 16.6457 7.85428C16.0987 7.3073 15.3569 7.00001 14.5833 7.00001H9.33333V12.8333ZM21 18.0833C21 18.7728 20.8642 19.4555 20.6004 20.0924C20.3365 20.7294 19.9498 21.3081 19.4623 21.7956C18.9748 22.2832 18.396 22.6699 17.7591 22.9337C17.1221 23.1975 16.4394 23.3333 15.75 23.3333H7.65C7.29101 23.3333 7 23.0423 7 22.6833V5.31667C7 4.95769 7.29101 4.66667 7.65 4.66667H14.5833C15.6111 4.66671 16.6163 4.96843 17.4742 5.53441C18.3321 6.10039 19.005 6.90574 19.4095 7.85059C19.814 8.79544 19.9322 9.83822 19.7495 10.8496C19.5669 11.8611 19.0914 12.7966 18.382 13.5403C19.1784 14.0015 19.8396 14.664 20.2991 15.4614C20.7586 16.2588 21.0003 17.163 21 18.0833ZM9.33333 15.1667V21H15.75C16.5235 21 17.2654 20.6927 17.8124 20.1457C18.3594 19.5988 18.6667 18.8569 18.6667 18.0833C18.6667 17.3098 18.3594 16.5679 17.8124 16.0209C17.2654 15.474 16.5235 15.1667 15.75 15.1667H9.33333Z" fill="#52525B" />
                            </svg>
                        </button>
                        <button onClick={() => executeCommand('italic')}>
                            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fillRule="evenodd" clipRule="evenodd" d="M10.4998 5.83334C10.4998 5.18901 11.0222 4.66667 11.6665 4.66667H22.1665C22.8108 4.66667 23.3332 5.18901 23.3332 5.83334C23.3332 6.47767 22.8108 7.00001 22.1665 7.00001H17.7742L12.6701 21H16.3332C16.9775 21 17.4998 21.5223 17.4998 22.1667C17.4998 22.811 16.9775 23.3333 16.3332 23.3333H5.83317C5.18884 23.3333 4.6665 22.811 4.6665 22.1667C4.6665 21.5223 5.18884 21 5.83317 21H10.2254L15.3296 7.00001H11.6665C11.0222 7.00001 10.4998 6.47767 10.4998 5.83334Z" fill="#52525B" />
                            </svg>
                        </button>
                        <button onClick={() => executeCommand('underline')}>
                            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.3335 4.66667C9.3335 4.02233 8.81116 3.5 8.16683 3.5C7.5225 3.5 7.00016 4.02233 7.00016 4.66667V12.8333C7.00016 17.3437 8.16683 21 14.0002 21C19.8335 21 21.0002 17.3437 21.0002 12.8333V4.66667C21.0002 4.02233 20.4778 3.5 19.8335 3.5C19.1892 3.5 18.6668 4.02233 18.6668 4.66667V12.8333C18.6668 16.055 18.6668 18.6667 14.0002 18.6667C9.33349 18.6667 9.3335 16.055 9.3335 12.8333V4.66667Z" fill="#52525B" />
                                <path d="M7.00016 22.1667C6.35583 22.1667 5.8335 22.689 5.8335 23.3333C5.8335 23.9777 6.35583 24.5 7.00016 24.5H21.0002C21.6445 24.5 22.1668 23.9777 22.1668 23.3333C22.1668 22.689 21.6445 22.1667 21.0002 22.1667H7.00016Z" fill="#52525B" />
                            </svg>
                        </button>
                        {/* Otros botones de la barra de herramientas */}
                        {/* Insert Ordered/Unordered List, Undo, Redo, etc. */}
                    </div>
                    <div
                        className="editor"
                        ref={editorRef}
                        contentEditable
                        onInput={handleInput} // Maneja los cambios de contenido en tiempo real
                        suppressContentEditableWarning={true} // Suprime las advertencias de React sobre contentEditable
                        style={{ minHeight: minHeight, padding: '10px' }}
                    />
                </div>
            </div>
        </>
    );
};


export default Editor;