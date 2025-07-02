import React, { useEffect, useRef } from "react";
import './PerfilCV.css';
import StudentProfileApplication from "../../../application/cv";
import SkeletonLoader from '../../ui/SkeletonLoader';

const CVView = ({ ...props }) => {
    const { data,loader } = StudentProfileApplication(props);
    return (
        <div className="perfil-cv">
            <div className="perfil-card">

                <SkeletonLoader active={loader} height="150px" width="150px" borderRadius="100%">
                    <div className="foto-perfil">
                        <img src={data?.foto} alt="Foto de perfil" />
                    </div>
                </SkeletonLoader>

                <div className="perfil-info">
                    <SkeletonLoader margin="4px auto" display="block" active={loader} height="30px" width="150px" borderRadius="5px">
                        <h2>{data?.nombre}</h2>
                    </SkeletonLoader>
                    <SkeletonLoader margin="4px auto" display="block" active={loader} height="15px" width="150px" borderRadius="5px">
                        <p>{data?.email}</p>
                    </SkeletonLoader>
                    <SkeletonLoader margin="4px auto" display="block" active={loader} height="15px" width="200px" borderRadius="5px">
                        <p>{data?.telefono}</p>
                    </SkeletonLoader>
                    <SkeletonLoader margin="4px auto" display="block" active={loader} height="15px" width="250px" borderRadius="5px">
                        <p>{data?.direccion}</p>
                    </SkeletonLoader>
                </div>

                {/* Biografía */}
                <SkeletonLoader margin="20px auto" display="block" active={loader} height="80px" width="100%" borderRadius="5px">
                    <div className="perfil-section">
                        <h3>Biografía</h3>
                        <p>{data?.biografia}</p>
                    </div>
                </SkeletonLoader>
                <SkeletonLoader margin="20px auto" display="block" active={loader} height="80px" width="100%" borderRadius="5px">
                    <div className="perfil-section">
                        <h3>Formación Académica</h3>
                        <ul>
                            {data?.cursos.map((curso, index) => (
                                <li key={index}>
                                    <strong>{curso.nombre}</strong> – {curso.status}
                                </li>
                            ))}
                        </ul>
                    </div>
                </SkeletonLoader>
                <SkeletonLoader margin="20px auto" display="block" active={loader} height="80px" width="100%" borderRadius="5px">
                    {data?.experiencias?.length > 0 ? <>
                        <div className="perfil-section">
                            <h3>Experiencia Laboral</h3>
                            <ul>
                                {data?.experiencias?.length > 0 && data.experiencias.map((exp, index) => (
                                    <li key={index}>
                                        <strong>{exp.puesto}</strong> en {exp.empresa} ({exp.desde} - {exp.hasta})
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </> : null}
                </SkeletonLoader>
                <SkeletonLoader margin="20px auto" display="block" active={loader} height="80px" width="100%" borderRadius="5px">
                    {/* Certificados */}
                    <div className="perfil-section">
                        <h3>Certificados</h3>
                        <ul>
                            {data?.certificados.map((cert, index) => (
                                <li key={index}>
                                    <strong>{cert.nombre}</strong> – {cert.emisor} ({cert.año})
                                </li>
                            ))}
                        </ul>
                    </div>
                </SkeletonLoader>
                <SkeletonLoader margin="20px auto" display="block" active={loader} height="80px" width="100%" borderRadius="5px">
                    {data?.tags.length > 0 ? <>
                        {/* Tags / Habilidades */}
                        <div className="perfil-section">
                            <h3>Habilidades</h3>
                            <div className="tags-container">
                                {data?.tags.map((tag, index) => (
                                    <span key={index} className="tag">{tag}</span>
                                ))}
                            </div>
                        </div>
                    </> : null}
                </SkeletonLoader>
                <SkeletonLoader margin="20px auto" display="block" active={loader} height="80px" width="100%" borderRadius="5px">
                    {/* Redes Sociales */}
                    <div className="perfil-section">
                        <h3>Redes Sociales</h3>
                        <ul>
                            {Object.entries(data?.redes).map(([red, url], index) => (
                                <li key={index}>
                                    <a href={url} target="_blank" rel="noopener noreferrer">{red.charAt(0).toUpperCase() + red.slice(1)}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </SkeletonLoader>
            </div>
        </div>
    );
}

export default CVView;