/*
	O useRoute serve para pegar informações especificas da página atual da aplicação.

*/

import React from 'react';
import styles from './style'; //estilos da página.
import logoImg from '../../assets/logo.png';  //importa a logo no melhor formato de acordo com a tela que esta rodando
import { Feather } from '@expo/vector-icons'; //o expo tem por padrão todos os pacotes de icones.
import { useNavigation, useRoute } from '@react-navigation/native'; // usado para fazer a navegação entre as telas.
import * as MailComposer from 'expo-mail-composer'; // importa tudo do pacote @expo-mail-composer e coloca na variável MailComposer.

import { View, Text, Image, TouchableOpacity, Linking } from 'react-native';


export default function Detail() {


	const navigation = useNavigation();

	const route = useRoute();

	//todos os parâmetros que essa rota recebeu.
	const incident = route.params.incident; // sendo incident parâmeto passado na função navigateToDetail da pasta Incidents.

	const message = `Olá ${incident.name}, estou entrando em contato pois gostaria de ajudar no caso "${incident.title}" com o valor de ${Intl.NumberFormat('pt-BR', { 
	style: 'currency', currency: 'BRL' }).format(incident.value) }`;


	//volta para a tela anterior.
	function navigateBack(){
		navigation.goBack(); 
	}

	// abrir e enviar mensagens via e-mail.
	function sendMail(){

		MailComposer.composeAsync({

			subject: `Herói do caso: ${incident.title}`,
			recipients: [incident.email],
			body: message,

		})

	}

	// abrir e enviar mensagens via whatsapp.
	function sendWhatsapp(){
		
		Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`);
	}


    return ( 

    	<View style={styles.container}> 

			<View style={styles.header}>
	    		<Image source={logoImg}/>

	    		<TouchableOpacity onPress={navigateBack}>
	    				<Feather name="arrow-left" size={28} color="#E82041" />
	    		</TouchableOpacity>
    		</View>


    		<View style={styles.incident}>
    			<Text style={ [styles.incidentProperty, {marginTop: 0}] }> ONG: </Text>
	    		<Text style={styles.incidentValue}> {incident.name}	 de {incident.city} / {incident.uf} </Text>

	    		<Text style={styles.incidentProperty}> Caso: </Text>
	    		<Text style={styles.incidentValue}> {incident.title} </Text>


				<Text style={styles.incidentProperty}> Descrição: </Text>
	    		<Text style={styles.incidentValue}> {incident.description} </Text>

	    		<Text style={styles.incidentProperty}> Valor: </Text>
	    		<Text style={styles.incidentValue}> 
	    			{Intl.NumberFormat('pt-BR', { 
	    			style: 'currency', currency: 'BRL' } 
	    			).format(incident.value) }
	    		</Text>

    		</View>


    		<View style={styles.contactBox}>
    			<Text style={styles.heroTitle}> Salve o dia! </Text>
    			<Text style={styles.heroTitle}> Seja o herói desse caso.</Text>

    			<Text style={styles.heroDescription}> Entre em contato: </Text>

    			<View style={styles.actions}>
    				<TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
    					<Text style={styles.actionText}> Whatsapp </Text>
    				</TouchableOpacity>

    				<TouchableOpacity style={styles.action} onPress={sendMail}>
    					<Text style={styles.actionText}> E-mail </Text>
    				</TouchableOpacity>
    			</View>
    		</View>

    	</View>
    );
}