import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/form.css";

function UserCreate() {
    const [nome, setNome] = useState("");
    const [role, setRole] = useState("");
    const [habilidade, setHabilidade] = useState("");
    const [recompensa, setRecompensa] = useState("");
    const [tripulacao, setTripulacao] = useState("");
    const [crewOptions, setCrewOptions] = useState([]);

    useEffect(() => {
        const fetchCrews = async () => {
            try {
                // Busca as tripulações para preencher o <select>
                const response = await api.get("/tripulacoes");
                setCrewOptions(response.data);
            } catch (error) {
                console.error("Erro ao carregar tripulações:", error);
            }
        };
        fetchCrews();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // IMPORTANTE: Mudei de "/users" para "/piratas" 
            // para alinhar com a organização das rotas do backend
            await api.post("/piratas", {
                nome,
                role,
                habilidade,
                recompensa: Number(recompensa),
                tripulacao,
            });

            // Limpa o formulário após o sucesso
            setNome("");
            setRole("");
            setHabilidade("");
            setRecompensa("");
            setTripulacao("");
            alert("Pirata criado com sucesso! 🏴‍☠️");
        } catch (error) {
            // Exibe o erro real que vem do banco (como o Duplicate Key)
            console.error("Erro detalhado: ", error.response?.data || error.message);
            const msgErro = error.response?.data?.error || error.response?.data?.msg || "Erro ao criar pirata.";
            alert(msgErro);
        }
    };

    return (
        <div className="create-container">
            <h2>Criar Pirata</h2>

            <form className="create-form" onSubmit={handleSubmit}>
                <div className="form-row">
                    <label>Nome</label>
                    <input
                        type="text"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)}
                        required
                    />
                </div>

                <div className="form-row">
                    <label>Função</label>
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
                    <label>Habilidade</label>
                    <input
                        type="text"
                        value={habilidade}
                        onChange={(e) => setHabilidade(e.target.value)}
                        required
                    />
                </div>

                <div className="form-row">
                    <label>Recompensa</label>
                    <input
                        type="number"
                        value={recompensa}
                        onChange={(e) => setRecompensa(e.target.value)}
                        required
                    />
                </div>

                <div className="form-row">
                    <label>Tripulação</label>
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
                    <button type="submit">Criar</button>
                </div>
            </form>
        </div>
    );
}

export default UserCreate;