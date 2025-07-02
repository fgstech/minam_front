import React, { useState, useRef, useEffect } from "react";
import './style.css';

const AvatarDropdown = ({ name, menuItems }) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    // Obtener iniciales del nombre
    const getInitials = (name) => {
        return name
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase())
            .join("")
            .slice(0, 2); // Máximo 2 caracteres
    };

    // Cerrar el menú si se hace clic fuera
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="avatar-dropdown" ref={menuRef}>
            {/* Avatar Circular */}
            <div className="avatar" onClick={() => setIsOpen((prev) => !prev)}>
                {getInitials(name)}
            </div>

            {/* Menú desplegable */}
            {isOpen && (
                <div className="avartar-dropdown-menu">
                    {menuItems.map((item, index) => (
                        <div key={index} className="avartar-dropdown-item" onClick={item.action}>
                            {item.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default AvatarDropdown;