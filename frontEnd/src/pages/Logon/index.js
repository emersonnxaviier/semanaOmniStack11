import React, { useState } from 'react';
import './styles.css';
import logoImg from '../../assets/logo.svg';
import herosImg from '../../assets/heroes.png';
import { FiLogIn } from 'react-icons/fi'; //fi é de feather icons
import { Link, useHistory } from 'react-router-dom';
import api from '../../services/api';


export default function Logon() {

    const [id, setId] = useState('');
    const history = useHistory();

    async function handleLogin(e) {

        e.preventDefault();

        try {
            const response = await api.post('sessions', { id });
            /*salvar o id e o nome da ong logada no story do navegador */
            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);

            history.push('/profile');

        } catch (err) {
            alert('Falha ao logar, tente novamente!');
        }



    }



    return (

        <
        div className = "logon-container" >
        <
        section className = "form" >

        <
        img src = { logoImg }
        alt = "Be The Hero" / >

        <
        form onSubmit = { handleLogin } >

        <
        h1 > Faça seu Logon < /h1>

        <
        input placeholder = "Sua ID"
        value = { id }
        onChange = { e => setId(e.target.value) }
        />

        <
        button className = "button"
        type = "submit" > Entrar < /button>

        <
        Link className = "back-link"
        to = "/register" >
        <
        FiLogIn size = { 16 }
        color = "#E02041" / > Não tenho cadastro < /Link>

        <
        /form> <
        /section> <
        img src = { herosImg }
        alt = "Heroes" / >

        <
        /div>
    )
}


/*
importa o componente Link e troca onde tem <a> por <Link> e o href por to,
para nao recarregar toda a pagina mas trocar apenas de rota.

*/