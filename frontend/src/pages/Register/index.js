import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';
import api from '../../services/api';
import logoImg from '../../assets/logo.png';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const history = useHistory();

    async function handleRegister(e) {
        e.preventDefault();
        try {
            const response = await api.post('users', {name, email});
            alert(`ID de acesso: ${response.data.id}`);
            history.push('/');
        } catch (err) {
            alert('ERRO! Tente novamente.');
        }
        
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Logo Eventos" />
                    <p>Faça seu cadastro e entre na plataforma!</p>
                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#4e44dd"/>
                        Já tenho cadastro
                    </ Link>
                </section>
                <form onSubmit={handleRegister}>
                    <input 
                        placeholder="Nome" 
                        value={name}
                        onChange={e => setName(e.target.value)}
                        required
                    />
                    <input 
                        type="email" 
                        placeholder="Email" 
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        required
                    />
                    <button type="submit" className="button" >Criar meu cadastro</button>
                </form>
            </div>
        </div>
    );
}