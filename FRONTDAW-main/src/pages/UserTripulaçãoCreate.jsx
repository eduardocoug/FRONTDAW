import {useState} from 'react';
import api from '../services/api';
import '../styles/form.css';

function UserTripulaçãoCreate() {
    const [nome_do_bando, setNome_do_bando] = useState("");
    const [qntd_de_membros, setQntd_de_membros] = useState("");
    const [capitao, setCapitao] = useState("");
    const [nome_navio, setNome_navio] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await api.post("/tripulações", {
                nome_do_bando: nome_do_bando,
                qntd_de_membros: qntd_de_membros,
                capitao: capitao,
                nome_navio: nome_navio,
            });

            setNome_do_bando("");
            setQntd_de_membros("");
            setCapitao("");
            setNome_navio("");
            alert("Tripulação criada com sucesso!");
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
                    <input type="text"
                    value={nome_do_bando}
                    onChange={(e) => setNome_do_bando(e.target.value)}
                    required
                    />
                </div>

                <div className="form-row">
                    <label>Quantidade de Membros</label>
                    <input type="number"
                    value={qntd_de_membros}
                    onChange={(e) => setQntd_de_membros(e.target.value)}
                    required
                    />
                </div>

                <div class  Name="form-row">
                    <label>Capitão</label>
                    <input type="text"
                    value={capitao}
                    onChange={(e) => setCapitao(e.target.value)}
                    required
                    />
                </div>

                <div className="form-row">
                    <label>Nome do Navio</label>
                    <input type="text"
                    value={nome_navio}
                    onChange={(e) => setNome_navio(e.target.value)}
                    required
                    />
                </div>

                <button type="submit" className="submit-btn">Criar Tripulação</button>
            </form>
        </div>
    );
}

export default UserTripulaçãoCreate;        