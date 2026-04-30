import { useState, useEffect } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';
import '../styles/list.css';

function UserTripulacaoList() {
    const [tripulacoes, setTripulacoes] = useState([]);

    const fetchTripulacoes = async () => {
        try {
            // ROTA ATUALIZADA: agora sem acento para bater com o backend
            const response = await api.get("/tripulacoes");
            setTripulacoes(response.data);
        } catch (error) {
            console.error("Erro ao buscar tripulações:", error);
        }
    };

    useEffect(() => {
        fetchTripulacoes();
    }, []);

    const deleteTripulacao = async (id) => {
        const confirmDelete = window.confirm("Tem certeza que deseja excluir esta tripulação?");

        if (!confirmDelete) {
            return;
        }

        try {
            // ROTA ATUALIZADA: de /tripulações para /tripulacoes
            await api.delete(`/tripulacoes/${id}`);
            fetchTripulacoes();
            alert("Tripulação excluída com sucesso");
        } catch (error) {
            console.error("Erro ao excluir: ", error);
            alert("Erro ao excluir tripulação");
        }
    };

    return (
        <div className="container">
            <h1>Lista de Tripulações</h1>

            {tripulacoes.length === 0 && <p>Nenhuma tripulação cadastrada.</p>}

            <div className="list-grid">
                {tripulacoes.map((tripulacao) => (
                    <div className="card" key={tripulacao._id}>
                        <div>
                            <strong>{tripulacao.nome_do_bando}</strong>
                            <p><strong>Quantidade de Membros:</strong> {tripulacao.qntd_de_membros}</p>
                            <p><strong>Capitão:</strong> {tripulacao.capitao}</p>
                            <p><strong>Nome do Navio:</strong> {tripulacao.nome_navio}</p>
                        </div>

                        <div className="actions">
                            <Link to={`/editTripulacao/${tripulacao._id}`}>
                                <button className="edit-btn">Editar</button>
                            </Link>

                            <button className="delete-btn" onClick={() => deleteTripulacao(tripulacao._id)}>Excluir</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default UserTripulacaoList;