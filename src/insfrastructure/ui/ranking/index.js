import React from "react";
import './style.css';

const Ranking = ({ topRanking, userPosition, surroundingUsers, totalParticipants, userId }) => {
    const isUserInTop10 = userPosition && userPosition.ranking <= 10;
    const rankingToShow = isUserInTop10 ? topRanking : [...topRanking, ...surroundingUsers];
    return (
        <div>
            <div className="header-ranking">
                <div><h6><strong>Mi Ranking</strong></h6></div>
                <div>
                    <div className="total-participants">
                        <label>Total de participantes:</label>
                        <div className="box-points">{totalParticipants.toLocaleString("es-CL")}</div>
                    </div>
                </div>
            </div>
            <div className="ranking-nam">
                <table>
                    <thead>
                        <tr className="text-left">
                            <th className="p-3">Posición</th>
                            <th className="p-3">Usuario</th>
                            <th className="p-3">Categoria</th>
                            <th className="p-3 text-right">Puntos</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rankingToShow.map((user) => (
                            <tr
                                key={user._id}
                                className={`${user._id === userId ? "active" : ""}`}
                            >
                                <td className="p-3" style={{ color: user._id === userId ? "white" : "#e9531e", fontWeight: "bold" }}>#{user.ranking}</td>
                                <td className="p-3">{user.name} {user.lastname}</td>
                                <td className="p-3"><strong>{user.category}</strong></td>
                                <td className="p-3 text-right">
                                    <strong>{user.balance.toLocaleString("es-CL")}</strong>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Ranking;