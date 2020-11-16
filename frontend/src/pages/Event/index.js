import { useState } from 'react';
import DateTimePicker from 'react-datetime-picker'
/* Docs https://github.com/wojtekmaj/react-datetime-picker */
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.png';

export default function Event() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [start, setStart] = useState(new Date());
    const [end, setEnd] = useState(new Date());

    const userId = localStorage.getItem("userId");
    const history = useHistory();

    async function handleNewEvent(e) {
        e.preventDefault();
        const data = {
            title,
            description,
            start,
            end,
            userId
        }

        try {
            await api.post("events", data, { 
                headers: {
                    Authorization: userId
                }
             });
             alert("Evento cadastrado!");
             history.push("/profile");
        } catch (err) {
            alert("ERRO! Verifique se já não existe evento no mesmo horário");
        }
    }

    return (
        <div className="event-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Logo Eventos" />
                    <p>Cadastre um novo evento</p>
                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#4e44dd"/>
                        Voltar
                    </ Link>
                </section>
                <form onSubmit={handleNewEvent}>
                    <input 
                        placeholder="Titulo do evento" 
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <textarea 
                        placeholder="Descrição" 
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <DateTimePicker 
                        className="datetimepicker" 
                        clearIcon="" 
                        format="y-MM-dd HH:mm"
                        minDate={new Date()}
                        value={start}
                        calendarIcon="Início"
                        onChange={e => setStart(e)}
                    />
                    <DateTimePicker 
                        className="datetimepicker" 
                        clearIcon="" 
                        format="y-MM-dd HH:mm"
                        minDate={new Date()}
                        value={end}
                        calendarIcon="Fim"
                        onChange={e => setEnd(e)}
                    />
                    { /* 
                    <input type="text" placeholder="Inicio (AAAA-MM-DD HH:MM 24h)" />
                    <input type="text" placeholder="Fim (AAAA-MM-DD HH:MM 24h" />
                    */ }
                    <button type="submit" className="button" >Cadastrar evento</button>
                </form>
            </div>
        </div>
    );
}