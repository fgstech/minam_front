import React from "react";
import "./KpiDashboard.css"; // Importamos los estilos
import SkeletonLoader from "../../ui/SkeletonLoader"

const KpiDashboard = ({
    puntos,
    ranking,
    nivel,
    cursosTotal,
    cursosProgreso,
    cursosTerminados,
    canjes,
    certificates,
    loader = true
}) => {
    return (
        <div className="dashboard-container">

            {/* Sección de Desempeño */}
            <div className="section">
                <h2>Ranking</h2>
                <div className="kpi-group">
                    <div className="kpi-card">
                        <div className="icon">🏆</div>
                        <h3>Puntos</h3>
                        <SkeletonLoader active={loader} height="20px" width="60px">
                            <p>{puntos}</p>
                        </SkeletonLoader>
                    </div>
                    <div className="kpi-card">
                        <div className="icon">📈</div>
                        <h3>Ranking</h3>
                        <SkeletonLoader active={loader} height="20px" width="60px">
                            <p>#{ranking}</p>
                        </SkeletonLoader>
                    </div>
                    <div className="kpi-card">
                        <div className="icon">🎖️</div>
                        <h3>Nivel</h3>
                        <SkeletonLoader active={loader} height="20px" width="60px">
                            <p>{nivel}</p>
                        </SkeletonLoader>
                    </div>
                </div>
            </div>

            {/* Sección de Cursos */}
            <div className="section">
                <h2>Academia</h2>
                <div className="kpi-group">
                    <div className="kpi-card">
                        <div className="icon">📚</div>
                        <h3>Totales</h3>
                        <SkeletonLoader active={loader} height="20px" width="60px">
                            <p>{cursosTotal}</p>
                        </SkeletonLoader>
                    </div>
                    <div className="kpi-card">
                        <div className="icon">📝</div>
                        <h3>En Progreso</h3>
                        <SkeletonLoader active={loader} height="20px" width="60px">
                            <p>{cursosProgreso}</p>
                        </SkeletonLoader>
                    </div>
                    <div className="kpi-card">
                        <div className="icon">✅</div>
                        <h3>Completados</h3>
                        <SkeletonLoader active={loader} height="20px" width="60px">
                            <p>{cursosTerminados}</p>
                        </SkeletonLoader>
                    </div>
                    <div className="kpi-card">
                        <div className="icon">🎓</div>
                        <h3>Certificados</h3>
                        <SkeletonLoader active={loader} height="20px" width="60px">
                            <p>{certificates}</p>
                        </SkeletonLoader>
                    </div>
                </div>
            </div>

            {/* Sección de Canjes */}
            <div className="section">
                <h2>Mercado</h2>
                <div className="kpi-group">
                    <div className="kpi-card">
                        <div className="icon">🛍️</div>
                        <h3>Canjes en Mercado</h3>
                        <SkeletonLoader active={loader} height="20px" width="60px">
                            <p>{canjes}</p>
                        </SkeletonLoader>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default KpiDashboard;