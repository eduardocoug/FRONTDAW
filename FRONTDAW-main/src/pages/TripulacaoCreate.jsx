import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/form.css";

function TripulacaoCreate() {
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
        fetchNavios();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await api.post("/tripulacoes", {
                nome_do_bando,
                qntd_de_membros: parseInt(qntd_de_membros),
                capitao,
                navio,
            });

            setNomeDoBando("");
            setQntdDeMembros("");
            setCapitao("");
            setNavio("");
            alert("Tripulação criada com sucesso");
        } catch (error) {
            console.error("Erro: ", error.response?.data || error.message);
            alert("Erro ao criar tripulação.");
        }
    };

    return (
        <div className="create-container">
            <h2>Criar Tripulação</h2>

            <form className="create-form" onSubmit={handleSubmit}>
                <div className="form-row">
                    <label>Nome do Bando</label>
                    <input
                        type="text"
                        value={nome_do_bando}
                        onChange={(e) => setNomeDoBando(e.target.value)}
                        required
                    />
                </div>

                <div className="form-row">
                    <label>Quantidade de Membros</label>
                    <input
                        type="number"
                        value={qntd_de_membros}
                        onChange={(e) => setQntdDeMembros(e.target.value)}
                        required
                    />
                </div>

                <div className="form-row">
                    <label>Capitão</label>
                    <input
                        type="text"
                        value={capitao}
                        onChange={(e) => setCapitao(e.target.value)}
                        required
                    />
                </div>

                <div className="form-row">
                    <label>Navio</label>
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
                    <button type="submit">Criar</button>
                </div>
            </form>
        </div>
    );
}

export default TripulacaoCreate;