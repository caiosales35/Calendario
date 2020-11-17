import { useState, useEffect } from 'react';
import DateTimePicker from 'react-datetime-picker'
/* Docs https://github.com/wojtekmaj/react-datetime-picker */
import { Link, useHistory, useParams } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImg from '../../assets/logo.png';

export default function Event() {
    const userId = localStorage.getItem("userId");
    const eventId = useParams().id;
    const history = useHistory();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [start, setStart] = useState(new Date());
    const [end, setEnd] = useState(new Date());

    useEffect(() => {
        if (eventId) {
            api.get(`/events/${eventId}`, { 
                headers: {
                    Authorization: userId
                }
                }).then(response => {
                    setStart(response.data.start)
                    setEnd(response.data.end)
                    setTitle(response.data.title)
                    setDescription(response.data.description)
                });
        }
    }, [eventId, userId]);

    async function saveEvent(e) {
        e.preventDefault();
        const url = eventId ? `/events/${eventId}` : "/events";
        const data = {
            title,
            description,
            start,
            end,
            userId
        };
        const authorization = { 
            headers: {
                Authorization: userId
            }
         };

        try {
            eventId ? await api.put(url, data, authorization) : await api.post(url, data, authorization);
            alert("Evento salvo!");
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
                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#4e44dd"/>
                        Voltar
                    </ Link>
                </section>
                <form onSubmit={saveEvent}>
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
                    <button type="submit" className="button" >Salvar evento</button>
                </form>
            </div>
        </div>
    );
}