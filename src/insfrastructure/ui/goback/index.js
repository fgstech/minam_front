import React from 'react';
import { useHistory } from 'react-router-dom'

const GoBack = () => {
    const history = useHistory();
    return (
        <svg onClick={() => history.goBack()} width="50" height="25" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{cursor:"pointer"}}>
            <path d="M9.57 5.92993L3.5 11.9999L9.57 18.0699" stroke="var(--main-text-color)" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
            <path d="M20.5 12H3.67004" stroke="var(--main-text-color)" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round" />
        </svg>

    )
}

export default GoBack;