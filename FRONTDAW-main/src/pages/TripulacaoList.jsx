import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import "../styles/list.css";

function TripulacaoList() {
    const [tripulacoes, setTripulacoes] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchTripulacoes = async (query = "") => {
        setLoading(true);
        try {
            const response = await api.get("/tripulacoes", { params: { search: query } });
            setTripulacoes(response.data);
        } catch (error) {
            console.error("Erro ao buscar tripulações:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTripulacoes(search);
    }, [search]);

    const deleteTripulacao = async (id) => {
        const confirmDelete = window.confirm("Tem certeza que deseja excluir esta tripulação?");

        if (!confirmDelete) {
            return;
        }

        try {
            await api.delete(`/tripulacoes/${id}`);
            fetchTripulacoes(search);
            alert("Tripulação excluída com sucesso");
        } catch (error) {
            console.error("Erro ao excluir:", error);
            alert("Erro ao excluir tripulação");
        }
    };

    return (
        <div className="container">
            <h1>Lista de Tripulações</h1>

            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Buscar tripulação ou capitão"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {loading && <p>Carregando tripulações...</p>}
            {!loading && tripulacoes.length === 0 && <p>Nenhuma tripulação cadastrada.</p>}

            {tripulacoes.map((tripulacao) => (
                <div className="card" key={tripulacao._id}>
                    <div>
                        <strong>{tripulacao.nome_do_bando}</strong>
                        <p><strong>Capitão:</strong> {tripulacao.capitao}</p>
                        <p><strong>Membros:</strong> {tripulacao.qntd_de_membros}</p>
                        <p><strong>Navio:</strong> {tripulacao.navio?.nome || "Não atribuído"}</p>
                    </div>

                    <div className="actions">
                        <Link to={`/edit-tripulacao/${tripulacao._id}`}>
                            <button className="edit-btn">Editar</button>
                        </Link>

                        <button className="delete-btn" onClick={() => deleteTripulacao(tripulacao._id)}>Excluir</button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default TripulacaoList;