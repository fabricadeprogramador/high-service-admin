const API_URL = "http://localhost:3000";

import axios from "axios";

export default {
  async buscarTodos() {
    return axios.get(API_URL + "/empresas").then((response) => response.data);
  },

  async salvar(empresa) {
    return axios
      .post(API_URL + "/empresas", empresa)
      .then((response) => response.data);
  },

  async editar(empresa) {
    return axios
      .put(API_URL + "/empresas", empresa)
      .then((response) => response.data);
  },

  async ativarInativar(empresa) {
    return axios
      .put(API_URL + "/empresas/ativarInativar", empresa)
      .then((response) => response.data);
  },
};