import React from "react";

export const Icon = ({ name, ...props }) => {
    return <span class="material-icons material-symbols-outlined">
        {name}
    </span>
}