import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/form.css";

function TripulacaoEdit() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [nome_do_bando, setNomeDoBando] = useState("");
    const [qntd_de_membros, setQntdDeMembros] = useState("");
    const [capitao, setCapitao] = useState("");
    const [navio, setNavio] = useState("");
    const [navios, setNavios] = useState([]);

    useEffect(() => {
        const fetchNavios = async () => {
            try {
                const response = await api.get("/navios");
                setNavios(response.data);
            } catch (error) {
                console.error("Erro ao carregar navios:", error);
            }
        };

        const fetchTripulacao = async () => {
            try {
                const response = await api.get(`/tripulacoes/${id}`);
                const tripulacao = response.data;

                if (tripulacao) {
                    setNomeDoBando(tripulacao.nome_do_bando);
                    setQntdDeMembros(tripulacao.qntd_de_membros);
                    setCapitao(tripulacao.capitao);
                    setNavio(tripulacao.navio?._id || tripulacao.navio || "");
                }
            } catch (error) {
                console.error("Erro ao carregar tripulação: ", error);
            }
        };

        fetchNavios();
        fetchTripulacao();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await api.put(`/tripulacoes/${id}`, {
                nome_do_bando,
                qntd_de_membros: parseInt(qntd_de_membros),
                capitao,
                navio,
            });

            alert("Tripulação atualizada com sucesso!");
            navigate("/tripulacoes");
        } catch (error) {
            console.error("Erro: ", error.response?.data || error.message);
            alert("Erro ao atualizar tripulação");
        }
    };

    return (
        <div className="create-container">
            <h2>Editar Tripulação</h2>

            <form className="create-form" onSubmit={handleSubmit}>
                <div className="form-row">
                    <label>Nome do Bando:</label>
                    <input
                        type="text"
                        value={nome_do_bando}
                        onChange={(e) => setNomeDoBando(e.target.value)}
                        required
                    />
                </div>

                <div className="form-row">
                    <label>Quantidade de Membros:</label>
                    <input
                        type="number"
                        value={qntd_de_membros}
                        onChange={(e) => setQntdDeMembros(e.target.value)}
                        required
                    />
                </div>

                <div className="form-row">
                    <label>Capitão:</label>
                    <input
                        type="text"
                        value={capitao}
                        onChange={(e) => setCapitao(e.target.value)}
                        required
                    />
                </div>

                <div className="form-row">
                    <label>Navio:</label>
                    <select value={navio} onChange={(e) => setNavio(e.target.value)} required>
                        <option value="">Selecione um navio</option>
                        {navios.map((item) => (
                            <option key={item._id} value={item._id}>
                                {item.nome} - {item.tipo}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="form-row button-row">
                    <button type="submit">Salvar</button>
                </div>
            </form>
        </div>
    );
}

export default TripulacaoEdit;