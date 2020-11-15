import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';

import logoImg from '../../assets/logo.png';

export default function Register() {
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
                <form>
                    <input placeholder="Nome" />
                    <input type="email" placeholder="Email" />
                    <button type="submit" className="button" >Criar meu cadastro</button>
                </form>
            </div>
        </div>
    );
}