import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import Logon from './pages/Logon';
import Register from './pages/Register';
import Profile from './pages/Profile';
import NewIncident from './pages/NewIncident';


export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Logon}/>
                <Route path="/register" component={Register}/>
                <Route path="/profile" component={Profile}/>
                <Route path="/incidents/new" component={NewIncident}/>
            </Switch>
        </BrowserRouter>
    );
}



/*

o BrowserRouter precisa estar por volta de tudo.
o Switch vai garantir que apenas uma rota seja excutada por momento.
o path é qual o caminho que será usado para acessar a pagina.
o exact diz que o caminho tem que ser exatamente aquele para entrar na rota.
*/