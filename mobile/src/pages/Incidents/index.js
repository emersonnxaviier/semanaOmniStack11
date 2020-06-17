/*
	O showsVerticalScrollIndicator = {false} remove a marca do scroll.

	O useEffect() é uma função disparada quando a variável do array muda. 

	A onEndReached={} é uma propriedade que aceita função que é disparada quando o usuário chega no final da lista.

	A onEndReachedThreshold={} é uma propriedade que fala quantos por centos(%) do final da lista precisa-se estar para carregar novos itens.

*/

import React, { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons'; //o expo tem por padrão todos os pacotes de icones.
import logoImg from '../../assets/logo.png';  //importa a logo no melhor formato de acordo com a tela que esta rodando
import { useNavigation } from '@react-navigation/native'; // usado para fazer a navegação entre as telas.

import styles from './style';  // importa os estilos da página.
import api from '../../services/api'; 

import { View, Image, Text, TouchableOpacity, FlatList } from 'react-native';



export default function Incidents() {

	const navigation = useNavigation();


	//armazena os incidents vindos da API.
	const [incidentss, setIncidentss] = useState([]);

	//armazena o total de casos.
	const [totall, setTotall] =  useState(0);

	const [page, setPage] = useState(1); 

	const [loading, setLoading] = useState(false);


	//navega para a tela de detalhes.
	function navigateToDetail( incident){
		navigation.navigate('Detail', {incident}); //Detail é o mesmo nome colocado em routes.js e incident parâmetro que será usado em Detail.
	}


	async function loadIncidents(){

		// quando uma requisição está sendo feita, evita que mais uma venha a acontecer.
		if(loading){
			return;
		}

		//se o total de casos for igual ao de incidents em tela, não carrega embusca de mais.
		if(totall > 0 && incidentss.length === totall){
			return;
		}

		setLoading(true);

		const response = await api.get('incidents', {params: page});

		setIncidentss([  ...response.data]);  //anexando dois vetores para que um não substirua o valor do outro em tela.
		setTotall(response.headers['x-total-count']);

		setPage(page+1);
		setLoading(false);
	}


	useEffect( () => {

		loadIncidents();

	},[]);





    return ( 
    	<View style={styles.container}> 

    		<View style={styles.header}>
    			<Image source={logoImg} />

    			<Text style={styles.headerText}>
    				Total de <Text style={styles.headerTextBold}> {totall} casos </Text>.
    			</Text> 
    		</View>


    		<Text style={styles.title}> Bem-Vindo! </Text>
    		<Text style={styles.description}> Escolha um dos casos a baixo e sale o dia.</Text>


    		<FlatList 

    			data={incidentss}

    			style={styles.incidentList}
    			keyExtractor={incident => String(incident.id)} 
    			showsVerticalScrollIndicator = {false}

    			onEndReached={loadIncidents}
    			onEndReachedThreshold={0.2}

    			renderItem ={({ item: incident}) => (

	    			<View style={styles.incident}>
	    				<Text style={styles.incidentProperty}> ONG: </Text>
	    				<Text style={styles.incidentValue}> {incident.name} </Text>

						<Text style={styles.incidentProperty}> Caso: </Text>
	    				<Text style={styles.incidentValue}> {incident.title} </Text>

	    				<Text style={styles.incidentProperty}> Valor: </Text>

 
	    				<Text style={styles.incidentValue}> 
	    					{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' } 

	    					).format(incident.value) }
	    				</Text>


	    				<TouchableOpacity style={styles.detailsButton} onPress={ () => navigateToDetail(incident) }>
	    						<Text style={styles.detailsButtonText}> Ver mais detalhes </Text>
	    						<Feather name= "arrow-right" size={16} color= "#E02041" />
	    				</TouchableOpacity>
	    			</View>

	    	     )}
    		/>

    	</View> 

    );
}