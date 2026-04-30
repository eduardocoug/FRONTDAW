import { useState } from "react";
import api from "../services/api";
import "../styles/form.css";

function NavioCreate() {
    const [nome, setNome] = useState("");
    const [tipo, setTipo] = useState("");
    const [capacidade, setCapacidade] = useState("");
    const [bandeira, setBandeira] = useState("");
    const [status, setStatus] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await api.post("/navios", {
                nome,
                tipo,
                capacidade: Number(capacidade),
                bandeira,
                status,
            });

            setNome("");
            setTipo("");
            setCapacidade("");
            setBandeira("");
            setStatus("");
            alert("Navio criado com sucesso");
        } catch (error) {
            console.error("Erro: ", error.response?.data || error.message);
            alert("Erro ao criar navio.");
        }
    };

    return (
        <div className="create-container">
            <h2>Criar Navio</h2>

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
                    <button type="submit">Criar</button>
                </div>
            </form>
        </div>
    );
}

export default NavioCreate;
