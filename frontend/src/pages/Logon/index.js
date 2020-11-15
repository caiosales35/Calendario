import { Link } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import './styles.css';
import eventsImg from '../../assets/eventos.png';
import logoImg from '../../assets/logo.png';

export default function Logon() {
    return (
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Logo Evenos" />
                <form>
                    <input placeholder="Entre com seu ID" />
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