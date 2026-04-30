import {useState, useEffect} from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import "../styles/form.css";

function UserTripulaçãoEdit() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [nome_do_bando, setNome_do_bando] = useState("");
    const [qntd_de_membros, setQntd_de_membros] = useState("");
    const [capitao, setCapitao] = useState("");
    const [nome_navio, setNome_navio] = useState("");

    useEffect(() => {
        const fetchTripulação = async () => {
            try {
                const response = await api.get("/tripulações");
                const tripulação = response.data.find((t) => t._id === id);

                if (tripulação) {
                    setNome_do_bando(tripulação.nome_do_bando);
                    setQntd_de_membros(tripulação.qntd_de_membros);
                    setCapitao(tripulação.capitao);
                    setNome_navio(tripulação.nome_navio);
                }
            } catch (error) {
                console.error("Erro ao carregar tripulação: ", error);
            }
        };
        fetchTripulação();
    }, [id])

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await api.put(`/tripulações/${id}`,
                {
                    nome_do_bando: nome_do_bando,
                    qntd_de_membros: qntd_de_membros,
                    capitao: capitao,
                    nome_navio: nome_navio,
                });

            alert("Tripulação atualizada com sucesso!");
            navigate("/tripulações");
        } catch (error) {
            console.error("Erro: ", error.response?.data || error.message);
            alert("Erro ao atualizar tripulação");
        }
    }

    return (    
        <div className="create-container">
            <h2>Editar Tripulação</h2>

            <form className="create-form" onSubmit={handleSubmit}> 
                <div className="form-row">       
                    <label>Nome do Bando:</label>
                    <input type="text"
                        value={nome_do_bando}
                        onChange={(e) => setNome_do_bando(e.target.value)}
                        required
                    />
                </div>

                <div className="form-row">
                    <label>Quantidade de Membros:</label>
                    <input type="number"
                        value={qntd_de_membros}
                        onChange={(e) => setQntd_de_membros(e.target.value)}
                        required
                    />
                </div>

                <div className="form-row">
                    <label>Capitão:</label>
                    <input type="text"
                        value={capitao}
                        onChange={(e) => setCapitao(e.target.value)}
                        required
                    />
                </div>

                <div className="form-row">
                    <label>Nome do Navio:</label>
                    <input type="text"
                        value={nome_navio}
                        onChange={(e) => setNome_navio(e.target.value)}
                        required
                    />
                </div>

                <button type="submit">Atualizar Tripulação</button>
            </form>
        </div>
    );
}

export default UserTripulaçãoEdit;  