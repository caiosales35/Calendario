import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';
import eventsImg from '../../assets/eventos.png';
import logoImg from '../../assets/logo.png';

export default function Logon() {
    const [id, setId] = useState('');
    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault();
        try {
            const response = await api.post("session", { id });
            localStorage.setItem("userId", id);
            localStorage.setItem("userName", response.data.name);
            history.push("/profile");
        } catch (err) {
            alert("Falha no login!");
        }
    }

    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Logo Evenos" />
                <form onSubmit={handleLogin}>
                    <input 
                        placeholder="Entre com seu ID" 
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />
                    <button className="button" type="submit">Entrar</button>
                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#4e44dd"/>
                        Criar meu cadastro
                    </ Link>
                </form>
            </section>
            <img src={eventsImg} alt="Eventos" />
        </div>
    );
}