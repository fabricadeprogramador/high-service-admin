const API_URL = "http://localhost:3000/transacao";

import axios from "axios";

export default {
  async buscarTodos() {
    return axios.get(API_URL).then((response) => response.data);
  },

  async salvar(transacao) {
    return axios.post(API_URL, transacao).then((response) => response.data);
  },

  async ativardesativar(transacao) {
    return axios.put(API_URL + "/ativarInativar", transacao).then((response) => response.data);
  },

  async editar(transacao) {
    return axios.put(API_URL, transacao).then((response) => response.data);
  }
};