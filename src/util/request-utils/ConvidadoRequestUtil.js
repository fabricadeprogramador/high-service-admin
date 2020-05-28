const API_URL = "http://localhost:3000/convidados";
import axios from "axios";

export default {
  async buscarTodos() {
    return axios.get(API_URL).then((response) => response.data);
  },
};
