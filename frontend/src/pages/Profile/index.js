import { Link } from 'react-router-dom';
import { FiPower, FiTrash2, FiEdit } from 'react-icons/fi';

import './styles.css';

import logoImg from '../../assets/logo.png';

export default function Profile() {
    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Logo Eventos" />
                <span>Bem Vindo, NOME!</span>
                <Link className="button" to="/event/new" >Cadastrar novo evento</Link>
                <button type="button">
                    <FiPower size={18} color="#4e44dd" />
                </button>
            </header>
            <h1>Próximos Eventos</h1>
            <ul>
                <li>
                    <strong>TITULO:</strong>
                    <p>Curso de JS</p>
                    <strong>Descrição:</strong>
                    <p>Primeiro curso de JS do mês.</p>
                    <strong>Inicio:</strong>
                    <p>20/11/2020 18:40h</p>
                    <strong>Termino:</strong>
                    <p>20/11/2020 20:00h</p>
                    <button type="button" className="button-trash">
                        <FiTrash2 size={20} color="#a8a8b3" />
                    </button>
                    <button type="button" className="button-edit">
                        <FiEdit size={20} color="#a8a8b2" />
                    </button>
                </li>
            </ul>
        </div>
    );
}