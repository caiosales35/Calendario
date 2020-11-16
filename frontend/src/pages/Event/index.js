import DateTimePicker from 'react-datetime-picker'
/* Docs https://github.com/wojtekmaj/react-datetime-picker */
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';

import logoImg from '../../assets/logo.png';

export default function Event() {
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
                <form>
                    <input placeholder="Titulo do evento" />
                    <textarea placeholder="Descrição" />
                    <DateTimePicker 
                        className="datetimepicker" 
                        clearIcon="" 
                        format="y-MM-dd HH:mm"
                        minDate={new Date()}
                        value={new Date()}
                        calendarIcon="Início"
                    />
                    <DateTimePicker 
                        className="datetimepicker" 
                        clearIcon="" 
                        format="y-MM-dd HH:mm"
                        minDate={new Date()}
                        value={new Date()}
                        calendarIcon="Fim"
                    />
                    { /* 
                    <input type="text" placeholder="Inicio (AAAA-MM-DD HH:MM 24h)" />
                    <input type="text" placeholder="Fim (AAAA-MM-DD HH:MM 24h" />
                    <button type="submit" className="button" >Cadastrar evento</button>
                    */ }
                </form>
            </div>
        </div>
    );
}