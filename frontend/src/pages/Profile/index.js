import { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2, FiEdit } from 'react-icons/fi';

import api from '../../services/api';
import ConfirmModal from '../ConfirmModal';

import './styles.css';

import logoImg from '../../assets/logo.png';

export default function Profile() {
    const userId = localStorage.getItem("userId");
    const userName = localStorage.getItem("userName");

    const [events, setEvents] = useState([]);
    const history = useHistory();

    var dateOptions = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric'
     };

    useEffect(() => {
        api.get("/events", { 
            headers: {
                Authorization: userId
            }
         }).then(response => {
            setEvents(response.data.filter(event => {
                return new Date(event.start) >= new Date();
            }).sort((a, b) => {
                return new Date(a.start) < new Date(b.start) ? -1 : 
                    new Date(a.start) > new Date(b.start) ? 1 : 0;
            }));
            /* Futuramente implementar opção de visualizar em um intervalo de datas */
         })
    }, [userId]);
    /* Array vazio, ou seja, sem dependencias, carrega uma unica vez */

    async function handleDeleteEvent(id) {
        try {
            await api.delete(`/events/${id}`, { 
                headers: {
                    Authorization: userId
                }
             });
             setEvents(events.filter(event => event.id !== id));
        } catch (err) {
            ConfirmModal("Erro ao remover evento...");
        }
    }

    function handleLogout() {
        localStorage.clear();
        history.push("/");
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Logo Eventos" />
                <span>Bem Vindo, {userName}!</span>
                <Link className="button" to="/event/new" >Cadastrar novo evento</Link>
                <button type="button" onClick={handleLogout} >
                    <FiPower size={18} color="#4e44dd" />
                </button>
            </header>
            <h1>Próximos Eventos</h1>
            <ul>
                {events.map(event => (
                    <li key={event.id}>
                        <strong>Título:</strong>
                        <p>{event.title}</p>
                        <strong>Descrição:</strong>
                        <p>{event.description}</p>
                        <strong>Inicio:</strong>
                        <p>{Intl.DateTimeFormat('pt-BR', dateOptions).format(new Date(event.start))}h</p>
                        <strong>Fim:</strong>
                        <p>{Intl.DateTimeFormat('pt-BR', dateOptions).format(new Date(event.end))}h</p>
                        <button onClick={() => handleDeleteEvent(event.id)} type="button" className="button-trash">
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                        <Link to={`/event/edit/${event.id}`} >
                            <button type="button" className="button-edit">
                                <FiEdit size={20} color="#a8a8b2" />
                            </button>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}