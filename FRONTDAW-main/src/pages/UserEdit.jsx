import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/form.css";

function UserEdit() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [role, setRole] = useState("");
    const [habilidade, setHabilidade] = useState("");
    const [recompensa, setRecompensa] = useState("");
    const [tripulacao, setTripulacao] = useState("");
    const [crewOptions, setCrewOptions] = useState([]);

    useEffect(() => {
        const fetchCrews = async () => {
            try {
                const response = await api.get("/tripulacoes");
                setCrewOptions(response.data);
            } catch (error) {
                console.error("Erro ao carregar tripulações:", error);
            }
        };

        const fetchUser = async () => {
            try {
                const response = await api.get(`/users/${id}`);
                const user = response.data;

                if (user) {
                    setName(user.nome);
                    setRole(user.role);
                    setHabilidade(user.habilidade);
                    setRecompensa(user.recompensa);
                    setTripulacao(user.tripulacao?._id || user.tripulacao || "");
                }
            } catch (error) {
                console.error("Erro ao carregar pirata: ", error);
            }
        };

        fetchCrews();
        fetchUser();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await api.put(`/users/${id}`, {
                nome: name,
                role,
                habilidade,
                recompensa: Number(recompensa),
                tripulacao,
            });

            alert("Pirata atualizado com sucesso!");
            navigate("/");
        } catch (error) {
            console.error("Erro: ", error.response?.data || error.message);
            alert("Erro ao atualizar pirata");
        }
    };

    return (
        <div className="create-container">
            <h2>Editar Pirata</h2>

            <form className="create-form" onSubmit={handleSubmit}>
                <div className="form-row">
                    <label>Nome:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div className="form-row">
                    <label>Função:</label>
                    <select value={role} onChange={(e) => setRole(e.target.value)} required>
                        <option value="">Selecione a função</option>
                        <option value="Capitão">Capitão</option>
                        <option value="Espadachim">Espadachim</option>
                        <option value="Navegador">Navegador</option>
                        <option value="Médico">Médico</option>
                        <option value="Atirador">Atirador</option>
                        <option value="Cozinheiro">Cozinheiro</option>
                    </select>
                </div>

                <div className="form-row">
                    <label>Habilidade:</label>
                    <input
                        type="text"
                        value={habilidade}
                        onChange={(e) => setHabilidade(e.target.value)}
                        required
                    />
                </div>

                <div className="form-row">
                    <label>Recompensa:</label>
                    <input
                        type="number"
                        value={recompensa}
                        onChange={(e) => setRecompensa(e.target.value)}
                        required
                    />
                </div>

                <div className="form-row">
                    <label>Tripulação:</label>
                    <select value={tripulacao} onChange={(e) => setTripulacao(e.target.value)} required>
                        <option value="">Selecione a tripulação</option>
                        {crewOptions.map((crew) => (
                            <option key={crew._id} value={crew._id}>
                                {crew.nome_do_bando}
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

export default UserEdit;