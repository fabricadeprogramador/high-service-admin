const API_URL = "http://localhost:300";

import axios from "axios";

export default {

 async buscarTodos(idEmpresa){
  return axios
  .get(
    API_URL + "/empresas/mensagens"+ idEmpresa
  ).then((response) => response.data);
},


async salvar(novaMensagem){
  return axios
  .post(
    API_URL +"/empresas/mensagens"+ idEmpresa  
  ).then((response)=> response.data);

}



}