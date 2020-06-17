/*
	A pasta assets na raiz serve apenas para o splash(imagem da tela de carregamento)
	e o Icon(icone do sistema).

	A pasta assets em src serve para o resto das imagens da aplicação.

*/

import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

import React from 'react';

import Routes from './src/routes'; //importa as rotas.


export default function App() {
    return (

        <Routes/>
    );

}