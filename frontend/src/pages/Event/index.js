import { useState, useEffect } from 'react';
/* import DateTimePicker from 'react-datetime-picker'
Docs https://github.com/wojtekmaj/react-datetime-picker */
import Datetime from 'react-datetime'
import moment from 'moment';
import 'moment/locale/pt-br';
import { Link, useHistory, useParams } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import "react-datetime/css/react-datetime.css";
import './styles.css';

import logoImg from '../../assets/logo.png';

export default function Event() {
    const userId = localStorage.getItem("userId");
    const eventId = useParams().id;
    const history = useHistory();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [start, setStart] = useState();
    const [end, setEnd] = useState();

    useEffect(() => {
        if (eventId) {
            api.get(`/events/${eventId}`, { 
                headers: {
                    Authorization: userId
                }
                }).then(response => {
                    setStart(moment(response.data.start).locale("pt-br").format("DD[/]MM[/]YYYY HH:mm"));
                    setEnd(moment(response.data.end).locale("pt-br").format("DD[/]MM[/]YYYY HH:mm"));
                    setTitle(response.data.title);
                    setDescription(response.data.description);
                    console.log(moment(response.data.start).locale("pt-br").format("DD[/]MM[/]YYYY hh:mm"))
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
                    { eventId ? 
                        <div>
                            <Datetime value={start} onChange={e => setStart(e)} />
                            <Datetime value={end} onChange={e => setEnd(e)} />
                        </div>
                        :
                        <div>
                            <Datetime onChange={e => setStart(e)} inputProps={{placeholder:"Início"}} />
                            <Datetime onChange={e => setEnd(e)} inputProps={{placeholder:"Fim"}} />
                        </div>
                    }
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