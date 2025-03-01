// import React from 'react'
// import { FlatCard } from '../card'

// export const Container = props => {
//     return <div className={`container ${props.className}`}>{props.children}</div>
// }

// Container.defaultProps = {
//     className: ""
// }

// export const Row = props => {
//     return <div style={props.style} className={`row m-0 ${props.className}`}>{props.children}</div>
// }

// Row.defaultProps = {
//     className: "",
//     style: {}
// }

// export const Col = props => {
//     return <div className={`${props.className} col-${props.xs} ${props.sm != undefined ? `col-sm-${props.sm}` : ''} ${props.md != undefined ? `col-md-${props.md}` : ''} ${props.xl != undefined ? `col-xl-${props.xl}` : ''}`} style={props.style}>{props.children}</div>
// }

// Col.defaultProps = {
//     className: "",
//     xs: 12,
//     sm: undefined,
//     md: undefined,
//     xl: undefined,
//     style: {}
// }

// export const Section = ({ card, style, styleContent, showBackButton, onBackClick, ...props }) => {
//     return (
//         <section
//             style={{ margin: card ? "0px 0px 15px 0px" : "0px", ...props.style, ...style }}
//             className={props.className}
//         >
//             <div className={`container-fluid`}>
//                 <div className={`row`}>
//                     {props.title ? (
//                         <div className={`col-12`} style={{ padding: card ? "0px 30px" : "" }}>
//                             <div className="row">
//                                 <div className="col-md-8" style={{ display: 'flex', alignItems: "center" }}>
//                                     <h6 style={{ fontSize: 14, color: "var(--main-text-color)", fontWeight: 600, marginTop:10 }}>{props.title}</h6>
//                                 </div>
//                             </div>
//                         </div>
//                     ) : null}
//                     <div className={`col-12 mt-3`} style={{ padding: card ? "10px 30px" : "", ...styleContent }}>
//                         {props.children}
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// };

// Section.defaultProps = {
//     card: true,
//     className: "",
//     style: {},
//     styleContent: {},
//     title: "",
//     withTitle: true,
//     onClick: () => { },
//     showBackButton: false,  // Propiedad opcional para mostrar el botón de volver atrás
//     onBackClick: () => { },  // Función que se ejecuta al hacer clic en el botón de volver atrás
// };


import React from 'react';
import { FlatCard } from '../card';

// Contenedor principal
export const Container = props => {
    return (
        <div className={`container ${props.className}`} style={{ display: 'grid', gap: '1rem' }}>
            {props.children}
        </div>
    );
};

Container.defaultProps = {
    className: ""
};

// Fila usando CSS Grid
export const Row = (props) => {
    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(12, 1fr)',
                gap: props.gap,
                padding: props.padding,
                ...props.style
            }}
            className={props.className}
        >
            {props.children}
        </div>
    );
};

Row.defaultProps = {
    padding: 0,
    className: "",
    style: {},
    gap: '1rem'
};


export const Col = props => {
    // Convertimos los tamaños dados a fracciones de las 12 columnas.
    const getGridColumnValue = (size) => {
        if (size) {
            const gridValue = Math.min(Math.max(size, 1), 12); // Limitamos entre 1 y 12
            return `span ${gridValue}`;
        }
        return 'span 12'; // Columna completa por defecto
    };

    return (
        <div
            className={props.className}
            style={{
                gridColumn: getGridColumnValue(props.xs),
                ...(props.sm && { gridColumn: getGridColumnValue(props.sm) }),
                ...(props.md && { gridColumn: getGridColumnValue(props.md) }),
                ...(props.xl && { gridColumn: getGridColumnValue(props.xl) }),
                ...props.style
            }}
        >
            {props.children}
        </div>
    );
};

Col.defaultProps = {
    className: "",
    xs: 12, // Por defecto ocupa todas las 12 columnas
    sm: undefined,
    md: undefined,
    xl: undefined,
    style: {}
};

// Sección usando Grid
export const Section = ({ card, style, styleContent, showBackButton, onBackClick, ...props }) => {
    return (
        <section
            style={{ margin: card ? "0px 0px 15px 0px" : "0px", ...props.style, ...style }}
            className={props.className}
        >
            <div className="container-fluid">
                <div className="row">
                    {props.title ? (
                        <div className="col-12" style={{ padding: card ? "0px 30px" : "" }}>
                            <div className="row">
                                <div className="col-md-8" style={{ display: 'flex', alignItems: "center" }}>
                                    <h6 style={{ fontSize: 14, color: "var(--main-text-color)", fontWeight: 600, marginTop: 10 }}>{props.title}</h6>
                                </div>
                            </div>
                        </div>
                    ) : null}
                    <div className="col-12 mt-3" style={{ padding: card ? "10px 30px" : "", ...styleContent }}>
                        {props.children}
                    </div>
                </div>
            </div>
        </section>
    );
};

Section.defaultProps = {
    card: true,
    className: "",
    style: {},
    styleContent: {},
    title: "",
    withTitle: true,
    onClick: () => { },
    showBackButton: false,
    onBackClick: () => { }
};