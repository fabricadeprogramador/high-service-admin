const API_URL = "https://high-service-api.herokuapp.com/convidados";
import axios from "axios";

export default {
  async buscarTodos() {
    return axios.get(API_URL).then((response) => response.data);
  },

  async salvar(convidado) {
    return axios.post(API_URL, convidado).then((response) => response.data);
  },
};
