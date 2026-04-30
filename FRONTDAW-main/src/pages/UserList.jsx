import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import "../styles/list.css";

function UserList() {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);

    // Função para buscar os piratas
    const fetchUsers = async (query = "") => {
        setLoading(true);
        try {
            // ROTA ATUALIZADA: de /users para /piratas
            const response = await api.get("/piratas", { params: { search: query } });
            setUsers(response.data);
        } catch (error) {
            console.error("Erro ao buscar piratas:", error);
        } finally {
            setLoading(false);
        }
    };

    // Efeito para buscar sempre que a busca mudar
    useEffect(() => {
        fetchUsers(search);
    }, [search]);

    // Função para excluir um pirata
    const deleteUser = async (id) => {
        const confirmDelete = window.confirm("Tem certeza que deseja excluir este pirata?");

        if (!confirmDelete) {
            return;
        }

        try {
            // ROTA ATUALIZADA: de /users/${id} para /piratas/${id}
            await api.delete(`/piratas/${id}`);
            fetchUsers(search); // Atualiza a lista após deletar
            alert("Pirata excluído com sucesso");
        } catch (error) {
            console.error("Erro ao excluir:", error);
            alert("Erro ao excluir pirata");
        }
    };

    return (
        <div className="container">
            <h1>Lista de Piratas</h1>

            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Buscar pirata, função ou habilidade"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {loading && <p>Carregando piratas...</p>}
            {!loading && users.length === 0 && <p>Nenhum pirata cadastrado.</p>}

            <div className="list-grid">
                {users.map((user) => (
                    <div className="card" key={user._id}>
                        <div>
                            <strong>{user.nome}</strong>
                            <p><strong>Tripulação:</strong> {user.tripulacao?.nome_do_bando || "Sem tripulação"}</p>
                            <p><strong>Função:</strong> {user.role}</p>
                            <p><strong>Habilidade:</strong> {user.habilidade}</p>
                            <p><strong>Recompensa:</strong> {user.recompensa?.toLocaleString()} Berries</p>
                        </div>

                        <div className="actions">
                            <Link to={`/edit/${user._id}`}>
                                <button className="edit-btn">Editar</button>
                            </Link>

                            <button className="delete-btn" onClick={() => deleteUser(user._id)}>Excluir</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default UserList;