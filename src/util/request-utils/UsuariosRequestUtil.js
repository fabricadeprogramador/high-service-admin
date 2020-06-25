const API_URL = "http://localhost:3000/usuarios";

import axios from "axios";

export default {
  async buscarTodos() {
    return axios.get(API_URL).then((response) => response.data);
  },

  async salvar(usuario) {
    return axios.post(API_URL, usuario).then((response) => response.data);
  },

  async ativardesativar(usuario) {
    return axios.put(API_URL + "/ativarInativar", usuario).then((response) => response.data);
  },

  async editar(usuario) {
    return axios.put(API_URL, usuario).then((response) => response.data);
  },

  async logar(usuario) {
    return axios.post(API_URL + "/login", usuario).then((response) => response.data);
  }
};