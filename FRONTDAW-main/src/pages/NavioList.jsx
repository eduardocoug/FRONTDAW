import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";
import "../styles/list.css";

function NavioList() {
    const [navios, setNavios] = useState([]);
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);

    const fetchNavios = async (query = "") => {
        setLoading(true);
        try {
            const response = await api.get("/navios", { params: { search: query } });
            setNavios(response.data);
        } catch (error) {
            console.error("Erro ao buscar navios:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchNavios(search);
    }, [search]);

    const deleteNavio = async (id) => {
        const confirmDelete = window.confirm("Tem certeza que deseja excluir este navio?");

        if (!confirmDelete) {
            return;
        }

        try {
            await api.delete(`/navios/${id}`);
            fetchNavios(search);
            alert("Navio excluído com sucesso");
        } catch (error) {
            console.error("Erro ao excluir navio:", error);
            alert(error.response?.data?.msg || "Erro ao excluir navio");
        }
    };

    return (
        <div className="container">
            <h1>Lista de Navios</h1>

            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Buscar navio ou tipo"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            {loading && <p>Carregando navios...</p>}
            {!loading && navios.length === 0 && <p>Nenhum navio cadastrado.</p>}

            {navios.map((navio) => (
                <div className="card" key={navio._id}>
                    <div>
                        <strong>{navio.nome}</strong>
                        <p><strong>Tipo:</strong> {navio.tipo}</p>
                        <p><strong>Capacidade:</strong> {navio.capacidade}</p>
                        <p><strong>Bandeira:</strong> {navio.bandeira}</p>
                        <p><strong>Status:</strong> {navio.status}</p>
                    </div>

                    <div className="actions">
                        <Link to={`/edit-navio/${navio._id}`}>
                            <button className="edit-btn">Editar</button>
                        </Link>
                        <button className="delete-btn" onClick={() => deleteNavio(navio._id)}>Excluir</button>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default NavioList;
