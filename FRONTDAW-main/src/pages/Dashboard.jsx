import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/list.css";

function Dashboard() {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await api.get("/stats");
                setStats(response.data);
            } catch (error) {
                console.error("Erro ao buscar estatísticas:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    return (
        <div className="container">
            <h1>Painel One Piece</h1>

            {loading && <p>Carregando estatísticas...</p>}
            {!loading && !stats && <p>Não foi possível carregar as estatísticas.</p>}

            {stats && (
                <div className="dashboard-grid">
                    <div className="card">
                        <h2>Total de Piratas</h2>
                        <p>{stats.totalPiratas}</p>
                    </div>
                    <div className="card">
                        <h2>Total de Tripulações</h2>
                        <p>{stats.totalTripulacoes}</p>
                    </div>
                    <div className="card">
                        <h2>Total de Navios</h2>
                        <p>{stats.totalNavios}</p>
                    </div>
                    <div className="card">
                        <h2>Maior Recompensa</h2>
                        <p>{stats.pirataMaisRecompensa?.nome || "Nenhum"}</p>
                    </div>
                    <div className="card">
                        <h2>Maior Tripulação</h2>
                        <p>{stats.maiorTripulacao?.nome_do_bando || "Nenhuma"}</p>
                    </div>
                    <div className="card">
                        <h2>Navio mais usado</h2>
                        <p>{stats.navioMaisUsado?.nome || "Nenhum"}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Dashboard;
