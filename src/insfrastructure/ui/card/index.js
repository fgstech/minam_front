import React, { useState } from 'react';
import './index.css'

const Card = (props) => {
    return (
        <div className="card-container m-0">
            <div className="card-title">
                <span>{props.title}</span>
            </div>
            <div className="card-body">
                {props.children}
            </div>
        </div>
    )
}


Card.defaultProps = {
    children: <div></div>,
    title: ""
}

export default Card;

export const FlatCard = (props) => {
    return (
        <div className={`card-container ${props.className} m-0`} style={props.style}>
            <div className="card-body" style={{padding:props.padding, ...props.styleContent}}>
                {props.children}
            </div>
        </div>
    )
}

FlatCard.defaultProps = {
    className: '',
    style: {},
    styleContent: {},
    padding: 30,
}