import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import "../styles/form.css";

function NavioEdit() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [nome, setNome] = useState("");
    const [tipo, setTipo] = useState("");
    const [capacidade, setCapacidade] = useState("");
    const [bandeira, setBandeira] = useState("");
    const [status, setStatus] = useState("");

    useEffect(() => {
        const fetchNavio = async () => {
            try {
                const response = await api.get(`/navios/${id}`);
                const navio = response.data;
                setNome(navio.nome || "");
                setTipo(navio.tipo || "");
                setCapacidade(navio.capacidade || "");
                setBandeira(navio.bandeira || "");
                setStatus(navio.status || "");
            } catch (error) {
                console.error("Erro ao buscar navio:", error);
            }
        };

        fetchNavio();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await api.put(`/navios/${id}`, {
                nome,
                tipo,
                capacidade: Number(capacidade),
                bandeira,
                status,
            });

            alert("Navio atualizado com sucesso.");
            navigate("/navios");
        } catch (error) {
            console.error("Erro ao atualizar navio:", error.response?.data || error.message);
            alert("Erro ao atualizar navio.");
        }
    };

    return (
        <div className="create-container">
            <h2>Editar Navio</h2>

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
                    <label>Tipo</label>
                    <input
                        type="text"
                        value={tipo}
                        onChange={(e) => setTipo(e.target.value)}
                        required
                    />
                </div>

                <div className="form-row">
                    <label>Capacidade</label>
                    <input
                        type="number"
                        value={capacidade}
                        onChange={(e) => setCapacidade(e.target.value)}
                        required
                    />
                </div>

                <div className="form-row">
                    <label>Bandeira</label>
                    <input
                        type="text"
                        value={bandeira}
                        onChange={(e) => setBandeira(e.target.value)}
                        required
                    />
                </div>

                <div className="form-row">
                    <label>Status</label>
                    <select value={status} onChange={(e) => setStatus(e.target.value)} required>
                        <option value="">Selecione o status</option>
                        <option value="Ativo">Ativo</option>
                        <option value="Em manutenção">Em manutenção</option>
                        <option value="Lendário">Lendário</option>
                    </select>
                </div>

                <div className="form-row button-row">
                    <button type="submit">Salvar</button>
                </div>
            </form>
        </div>
    );
}

export default NavioEdit;
