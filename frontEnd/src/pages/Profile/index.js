
import React, {useEffect, useState} from 'react';
import LogoImg from '../../assets/logo.svg';
import './styles.css';
import {Link, useHistory} from 'react-router-dom';
import { FiPower, FiTrash2} from 'react-icons/fi'
import api from '../../services/api';

export default function Profile(){

    const ongName = localStorage.getItem('ongName');  /*ira armazenar o nome da ong logada */
    const ongId = localStorage.getItem('ongId'); /*ira armazenar o id da ong logada */

    const [incidents, setIncidents] = useState([]);  /*estado para gravar informacoes /   nome incidents, funcao para atualizar setIncidents    */

    const history = useHistory();

    useEffect(() =>{   /*rota para pegar os incidents é profile, passando qual organização está logada atraves do header, o nome do header e o id*/

        api.get('profile', {
            headers:{
                Authorization: ongId,
            }

        }).then(Response =>{  /*para pegar os dados, e gravar no estado  */
            setIncidents(Response.data);
        })                

    }, [ongId]);

    async function headleDeleteIncident(id){

        try {
          await api.delete(`incidents/${id}`,{  /*rota para deletar um caso e verificacao se o id da ong que esta apagando é igual ao da que criou */
            headers: {
                Authorization: ongId,
            }
          });  
                  /*faz uma varredura  */
            setIncidents(incidents.filter(incident => incident.id !== id)); /*pega todos os incidents que tem e realiza um filtro neles, e para cada um do incidents retornar apenas os que o id forem diferentes do passado o delete  */
        } catch (err) {
            alert('Erro ao deletar caso, tente novamente ...');
        }

    }

    function handleLogout(){  /*limpa o localStorge e volta para a tela de logon */

        localStorage.clear();   

        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={LogoImg} alt="Be The Hero"/>
                <span>Bem vinda, {ongName}</span>

                <Link className="button" to="/incidents/new">Cadastrar novo caso </Link>

                <button onClick={handleLogout} type="button"> 
                <FiPower size={18} color="#E02041"/>
                </button>
            </header>

            <h1>Casos cadastrados</h1>
            <ul>
               {incidents.map(incident =>(   /*vai percorrer cada um dos incidents retornando alguma coisa, cria uma varia chamada incident */
                    <li key={incident.id}>
                    <strong>CASO:</strong>
                    <p>{incident.title}</p>

                    <strong>DESCRIÇÃO:</strong>
                    <p>{incident.description} </p>

                    <strong>VALOR:</strong>
                    <p>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)} </p>

                    <button onClick={() =>headleDeleteIncident(incident.id)} type="button">
                        <FiTrash2 size={20} color="#a8a8b3" />
                    </button>
                </li>
               ))}
            </ul>
        </div>
    );
}