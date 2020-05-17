
import axios from 'axios';

const api = axios.create({

    baseURL: 'http://localhost:3333',
    

})

export default api;    /*assim outros arquivos consegem importar esse arquivo */





/*

baseURL - parte da url que é padrao em todas as paginas.
*/