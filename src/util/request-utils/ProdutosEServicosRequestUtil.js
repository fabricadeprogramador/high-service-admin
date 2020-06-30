const API_URL = "http://localhost:3000";

// "http://localhost:3000"
// "https://high-service-api.herokuapp.com"

import axios from "axios";

export default {
  async buscarTodos(idDaEmpresaBuscarTodosProdutosEServicos) {
    return axios
      .get(
        API_URL +
          "/empresas/produtosEServicos/buscarTodos/" +
          idDaEmpresaBuscarTodosProdutosEServicos
      )
      .then((response) => response.data);
  },

  async salvar(pacoteEmpresaNovoProdutoServico) {
    return axios
      .post(
        API_URL + "/empresas/produtosEServicos",
        pacoteEmpresaNovoProdutoServico
      )
      .then((response) => response.data);
  },

  async editar(pacoteEmpresaEditaProdutoServico) {
    return axios
      .put(
        API_URL + "/empresas/produtosEServicos",
        pacoteEmpresaEditaProdutoServico
      )
      .then((response) => response.data);
  },

  async ativarInativar(idsEmpresaEProdutoServico) {
    return axios
      .put(
        API_URL + "/empresas/produtosEServicos/ativarInativar",
        idsEmpresaEProdutoServico
      )
      .then((response) => response.data);
  },
};
