/*
  Je crée une instance Axios :
  le moyen d'utiliser Axios avec un configuration
  personnalisée et pré-définie
 */

import axios from 'axios';

export default axios.create({
  baseURL: 'https://orecipes-api.onrender.com/api/',
});
