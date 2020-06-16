const API_URL = "https://high-service-api.herokuapp.com/clientes";

import axios from "axios";

export default {
  async buscarTodos() {
    return axios.get(API_URL).then((response) => response.data);
  },

  async salvar(cliente) {
    return axios.post(API_URL, cliente).then((response) => response.data);
  },

  async editar(cliente) {
    return axios.put(API_URL, cliente).then((response) => response.data);
  },

  async ativarInativar(cliente) {
    return axios
      .put(
        "https://high-service-api.herokuapp.com/clientes/ativarInativar",
        cliente
      )
      .then((response) => response.data);
  },
};
