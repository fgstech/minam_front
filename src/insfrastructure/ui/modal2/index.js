import React from 'react';
import './Modal.css';

const Modal = ({
    isOpen,
    onClose,
    label = '',
    showLabel = true,
    children,
    acceptButtonText = 'Aceptar',
    cancelButtonText = 'Cancelar',
    onAccept,
    onCancel,
    width = 500,
    height = "auto"
}) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div style={{ maxWidth: width }} className="modal-container" onClick={(e) => e.stopPropagation()}>
                {showLabel && label && (
                    <div className="modal-header">
                        <h2 className="modal-label">{label}</h2>
                    </div>
                )}
                <div className="modal-body" style={{height: height}}>
                    {children}
                </div>
                <div className="modal-bottombar">
                    <button onClick={onCancel || onClose} className="cancel-button">
                        {cancelButtonText}
                    </button>
                    <button onClick={onAccept} className="accept-button">
                        {acceptButtonText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;


export const ModalConfirm = ({ isOpen, onAccept, acceptButtonText = "Aceptar", onClose, cancelButtonText = "Cancelar" }) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            showLabel={false}
            acceptButtonText={acceptButtonText}
            cancelButtonText={cancelButtonText}
            onAccept={onAccept}
            onCancel={onClose}
        >
            <p className="text-center m-0">¿Estás seguro de que deseas continuar con esta acción?</p>
        </Modal>
    )
}