import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import UserList from "./pages/UserList";
import UserCreate from "./pages/UserCreate";
import UserEdit from "./pages/UserEdit";
import TripulacaoList from "./pages/TripulacaoList";
import TripulacaoCreate from "./pages/TripulacaoCreate";
import TripulacaoEdit from "./pages/TripulacaoEdit";
import NavioList from "./pages/NavioList";
import NavioCreate from "./pages/NavioCreate";
import NavioEdit from "./pages/NavioEdit";
import Dashboard from "./pages/Dashboard";
import "./styles/global.css";

function App() {
  return (
    <BrowserRouter>
      <nav className='navbar'>
        <Link to="/">Piratas</Link>  
        <Link to="/tripulacoes">Tripulações</Link> 
        <Link to="/navios">Navios</Link>
        <Link to="/create">Criar Pirata</Link>      
        <Link to="/create-tripulacao">Criar Tripulação</Link>
        <Link to="/create-navio">Criar Navio</Link>
        <Link to="/dashboard">Painel</Link>
      </nav>

      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/create" element={<UserCreate />} />
        <Route path="/edit/:id" element={<UserEdit />} />
        <Route path="/tripulacoes" element={<TripulacaoList />} />
        <Route path="/create-tripulacao" element={<TripulacaoCreate />} />
        <Route path="/edit-tripulacao/:id" element={<TripulacaoEdit />} />
        <Route path="/navios" element={<NavioList />} />
        <Route path="/create-navio" element={<NavioCreate />} />
        <Route path="/edit-navio/:id" element={<NavioEdit />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
