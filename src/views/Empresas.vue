
<template>
  <v-data-table :headers="headers" :items="empresas" sort-by="empresa">
    <template v-slot:top>
      <v-expand-transition>
        <v-card v-if="novoCadastro">
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-form ref="form" v-model="valid">
            <v-card-text>
              <v-container>
                <v-row>
                  <h3 class="ml-3">Dados:</h3>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.empresa"
                      :rules="campoRules"
                      label="Nome da Empresa"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="editedItem.cnpj"
                      :rules="cnpjRules"
                      v-mask="['###.###.###-##', '##.###.###/####-##']"
                      label="CPNJ"
                      required
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field :rules="emailRules" v-model="editedItem.email" label="E-mail"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      :rules="telRules"
                      v-model="editedItem.telefone"
                      label="Telefone"
                      v-mask="['(##) ####-####', '(##) #####-####']"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row class="mt-7">
                  <h3 class="ml-3">Endereço:</h3>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="6" md="5" lg="3">
                    <v-text-field
                      :rules="cepRules"
                      v-mask="'#####-###'"
                      v-model="editedItem.cep"
                      label="CEP"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="5" lg="3">
                    <v-text-field :rules="campoRules" v-model="editedItem.rua" label="Rua:"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="5" lg="3">
                    <v-text-field
                      :rules="campoRules"
                      v-model="editedItem.numero"
                      label="Número"
                      type="number"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="5" lg="3">
                    <v-text-field v-model="editedItem.complemento" label="Complemento"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="5" lg="3">
                    <v-text-field :rules="campoRules" v-model="editedItem.bairro" label="Bairro"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="5" lg="3">
                    <v-text-field :rules="campoRules" v-model="editedItem.cidade" label="Cidade"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="2" md="2" lg="1" xl="1">
                    <v-select :rules="campoRules" v-model="editedItem.uf" :items="uf" label="UF"></v-select>
                  </v-col>
                  <v-col cols="12" sm="6" md="5" lg="3">
                    <v-text-field
                      :rules="campoRules"
                      v-model="editedItem.ramo"
                      label="Ramo de Atividade"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-layout justify-center>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" dark class="mb-2" @click="save" :disabled="!valid">Salvar</v-btn>
                <v-btn color="primary" dark class="mb-2" @click="reset">Cancelar</v-btn>
              </v-card-actions>
            </v-layout>
          </v-form>
        </v-card>
      </v-expand-transition>

      <v-toolbar flat color="dark-grey">
        <v-toolbar-title>Lista de Empresas</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn color="primary" fab dark small @click="mostrarCadastro">
          <v-icon v-if="!novoCadastro" dark v-bind:title="messageNewAdd">mdi-plus</v-icon>
          <v-icon v-if="novoCadastro" dark v-bind:title="msgClose">mdi-minus</v-icon>
        </v-btn>
      </v-toolbar>
    </template>

    <template v-slot:item.empresa="{ item }">
      <tr v-bind:class="{ empresaInativa: !item.ativo }">{{item.empresa}}</tr>
    </template>
    <template v-slot:item.cnpj="{ item }">
      <tr v-bind:class="{ empresaInativa: !item.ativo }">{{item.cnpj}}</tr>
    </template>
    <template v-slot:item.email="{ item }">
      <tr v-bind:class="{ empresaInativa: !item.ativo }">{{item.email}}</tr>
    </template>
    <template v-slot:item.telefone="{ item }">
      <tr v-bind:class="{ empresaInativa: !item.ativo }">{{item.telefone}}</tr>
    </template>

    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        @click="abrirDialogProdutosServicos()"
        v-bind:title="msnCadastraListaProdutosServicos"
      >mdi-wrench-outline</v-icon>
      <v-icon small @click="abrirDialogMenssagem()" v-bind:title="msgMensagens">mdi-email-outline</v-icon>
      <v-icon
        small
        class="mr-2"
        @click="visualizaEmpresa(item)"
        v-bind:title="msgVisualizar"
      >mdi-magnify</v-icon>
      <v-icon
        v-if="!item.ativo"
        color="red"
        small
        @click="ativarDesativarEmpresa(item)"
        v-bind:title="messageEnable"
      >mdi-cancel</v-icon>
      <v-icon
        v-if="item.ativo"
        small
        color="green"
        @click="ativarDesativarEmpresa(item)"
        v-bind:title="messageDisable"
      >mdi-check-bold</v-icon>
      <v-icon small v-if="item.ativo" @click="editItem(item)" v-bind:title="msnEditar">mdi-pencil</v-icon>



      <v-dialog v-model="dialog" overlay-color="grey">
        <v-card>
          <v-container>
            <v-row>
              <h3 class="ml-3">Dados:</h3>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="visualizedtItem.empresa" label="Nome da Empresa" readonly></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="visualizedtItem.cnpj" label="CPNJ" readonly></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="visualizedtItem.email" label="E-mail" readonly></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field v-model="visualizedtItem.telefone" label="Telefone" readonly></v-text-field>
              </v-col>
            </v-row>
            <v-row class="mt-7">
              <h3 class="ml-3">Endereço:</h3>
            </v-row>
            <v-row>
              <v-col cols="12" sm="6" md="5" lg="3">
                <v-text-field v-model="visualizedtItem.cep" label="CEP" readonly></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="5" lg="3">
                <v-text-field v-model="visualizedtItem.rua" label="Rua:" readonly></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="5" lg="3">
                <v-text-field v-model="visualizedtItem.numero" label="Número" readonly></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="5" lg="3">
                <v-text-field v-model="visualizedtItem.complemento" label="Complemento" readonly></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="5" lg="3">
                <v-text-field v-model="visualizedtItem.bairro" label="Bairro" readonly></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="5" lg="3">
                <v-text-field v-model="visualizedtItem.cidade" label="Cidade" readonly></v-text-field>
              </v-col>
              <v-col cols="12" sm="2" md="2" lg="1" xl="1">
                <v-select v-model="visualizedtItem.uf" :items="uf" label="UF" readonly></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="5" lg="3">
                <v-text-field v-model="visualizedtItem.ramo" label="Ramo de Atividade" readonly></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card>
      </v-dialog>


      <!-- EMPRESAS - Mensagens  -->

  
   <v-dialog
        :retain-focus="false"
        
        v-model="dialogMenssagem"
        scrollable
        transition="dialog-transition"
        overlay-color="grey"
      >
        <v-card>
          <v-container>
            <v-row>
              <h3 class="ml-3">Mensagens :</h3>
            </v-row>
                                    
           


      <div class="card-footer">
          <form id="chat">

              <div class="gorm-group">
                  <label for="user">Usuario: </label>
                  <input type="text" v-model="user" 
                  placeholder="Digite seu usuario"
                  >
              </div>

                <div class="messages"></div>


  <!-- logica pra aplicar
               <div class="messages" v-for="(msg, index) in messages" :key="index">
                  <p><span class="font-weight-bold">{{ msg.user }}: </span>{{ msg.message }}</p>
              </div>
        -->


              <div class="gorm-group pb-3">
                  <label for="message">Mensagem: </label>
                  <input type="text" v-model="message" 
                  placeholder="Digite sua mensagem">
              </div>
              


               <v-btn color="primary" dark class="mb-2" @click="EnviarMsg">Enviar</v-btn>

             
          </form>
      </div>
                                
            
           
          </v-container>
        </v-card>
      </v-dialog>


   <!-- EMPRESAS - Fim Mensagens  -->



     <!-- EMPRESAS PRODUTOS/SERVICOS -->
      <!-- BUG 1 (ABRIR E FECHAR O DETALHAR TRAVA O NAVEGADOR) -->
      <!-- BUG 2 (VUETIFY COM ERRO AO DEFINIR ENDEREÇO DINAMICO PARA V-IMG, ENCONTREI NA INTERNET SOLUÇÃO DE USAR 'REQUEST', IMPLEMENTEI NOS PRODUTOS/SERVIÇOS PRÉ-GERADOS, MAS AINDA NÃO É UMA SOLUÇÃO PRÁTICA) -->
      <!-- BUG 3 (POR CAUSA DO BUG 2 NOVOS PRODUTOS/SERVIÇOS CADASTRADOS NÃO MOSTRAM IMG) -->

      <v-dialog
        :retain-focus="false"
        persistent="true"
        v-model="dialogProdutosServicos"
        scrollable
        transition="dialog-transition"
        overlay-color="grey"
      >
        <v-card>
          <v-toolbar class="toolbarCadLisProdServ" flat color="dark-grey">
            <v-toolbar-title>Cadastro de Produtos e Serviços</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn @click="fecharDialogProdutosServicos()" color="primary" dark small>VOLTAR</v-btn>
          </v-toolbar>
          <v-content class="ma-0 pa-0">
            <v-expand-transition>
              <v-card v-if="mostraNovoProdServ">
                <v-card-title>
                  <span class="headline">{{ formTitleProdutosServicos }}</span>
                </v-card-title>
                <v-form @submit="e.keyCode === 13" v-model="validProdutosServicos" ref="form">
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6" md="6" lg="4" xl="3">
                          <v-text-field
                            v-model="produtoServicoEditado.nome"
                            label="Nome"
                            :rules="nomeProdutoServicoRules"
                            counter
                            :maxlength="30"
                            type="text"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="6" lg="4" xl="3">
                          <v-select
                            :items="selectProdServTipo"
                            v-model="produtoServicoEditado.tipo"
                            label="Tipo"
                          ></v-select>
                        </v-col>
                        <v-col cols="12" sm="6" md="6" lg="4" xl="3">
                          <v-text-field
                            class="inputNumeroLimpo"
                            v-model="produtoServicoEditado.valor"
                            label="Valor"
                            :rules="produtosServicosValorRules"
                            :maxlength="14"
                            type="number"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="6" lg="4" xl="3">
                          <v-file-input
                            v-model="produtoServicoEditado.img"
                            accept="image/*"
                            label="Imagem (Opcional)"
                            prepend-icon
                          ></v-file-input>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="12" sm="12" md="12" lg="6" xl="6">
                          <v-textarea
                            v-model="produtoServicoEditado.descricao"
                            label="Descrição"
                            :rules="produtosServicosDescricaoRules"
                            type="text"
                            counter
                            :maxlength="200"
                          ></v-textarea>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>

                  <v-layout justify-center>
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn
                        type="submit"
                        color="primary"
                        dark
                        class="mb-2"
                        @click="salvarProdutoServicoEditado"
                        :disabled="!validProdutosServicos"
                      >Salvar</v-btn>
                      <v-btn
                        color="primary"
                        dark
                        class="mb-2"
                        @click="resetProdutosServicos"
                      >Cancelar</v-btn>
                    </v-card-actions>
                  </v-layout>
                </v-form>
              </v-card>
            </v-expand-transition>
            <v-toolbar flat color="dark-grey">
              <v-toolbar-title>Lista de Produtos e Serviços</v-toolbar-title>
              <v-spacer></v-spacer>

              <v-btn color="primary" fab dark small @click="mostrarNovoProdServ">
                <v-icon v-if="!mostraNovoProdServ" dark v-bind:title="msnBotaoNovoProdServ">mdi-plus</v-icon>
                <v-icon v-if="mostraNovoProdServ" dark>mdi-minus</v-icon>
              </v-btn>
            </v-toolbar>
            <v-data-table
              :headers="headersProdutosServicos"
              :items="produtosServicos"
              sort-by="nome"
              class="elevation-1"
            >
              <template v-slot:item.img="{ item }">
                <tr>
                  <v-img :src="item.img" height="50px" width="50px"></v-img>
                </tr>
              </template>

              <template v-slot:item.nome="{ item }">
                <tr v-bind:class="{ produtoServicoInativo: !item.ativo }">
                  {{
                  item.nome
                  }}
                </tr>
              </template>

              <template v-slot:item.tipo="{ item }">
                <tr v-bind:class="{ produtoServicoInativo: !item.ativo }">
                  {{
                  item.tipo
                  }}
                </tr>
              </template>

              <template v-slot:item.valor="{ item }">
                <tr v-bind:class="{ produtoServicoInativo: !item.ativo }">
                  {{
                  item.valor
                  }}
                </tr>
              </template>

              <template v-slot:item.actions="{ item }">
                <v-icon
                  small
                  @click="detalharProdutoServico(item)"
                  v-bind:title="msnDetalharProdutoServico"
                >mdi-magnify</v-icon>

                <v-dialog
                  v-model="dialogDetalhaProdutoServico"
                  :retain-focus="false"
                  transition="dialog-transition"
                >
                  <v-card>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6" md="6" lg="4" xl="3">
                          <v-text-field
                            v-model="produtoServicoDetalhado.nome"
                            label="Nome"
                            type="text"
                            readonly
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="6" lg="4" xl="3">
                          <v-select
                            v-model="produtoServicoDetalhado.tipo"
                            :items="selectProdServTipo"
                            label="Tipo"
                            readonly
                          ></v-select>
                        </v-col>
                        <v-col cols="12" sm="6" md="5" lg="3">
                          <v-text-field
                            v-model="produtoServicoDetalhado.valor"
                            label="Valor"
                            type="text"
                            readonly
                          ></v-text-field>
                        </v-col>
                        <v-col cols="12" sm="6" md="5" lg="3">
                          <v-img :src="produtoServicoDetalhado.img" height="50px" width="50px"></v-img>
                        </v-col>
                        <v-col cols="12" sm="12" md="12" lg="6" xl="6">
                          <v-textarea
                            v-model="produtoServicoDetalhado.descricao"
                            label="Descrição"
                            type="text"
                            readonly
                          ></v-textarea>
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card>
                </v-dialog>

                <v-icon
                  v-if="item.ativo"
                  small
                  color="green"
                  @click="ativarDesativarProdutoServico(item)"
                  v-bind:title="msnDesativarProdutoServico"
                >mdi-check-bold</v-icon>

                <v-icon
                  v-if="!item.ativo"
                  small
                  color="red"
                  @click="ativarDesativarProdutoServico(item)"
                  v-bind:title="msnAtivarProdutoServico"
                >mdi-cancel</v-icon>

                <v-icon
                  small
                  v-if="item.ativo"
                  @click="editarProdutoServico(item)"
                  v-bind:title="msnEditarProdutoServico"
                >mdi-pencil</v-icon>

                <v-icon
                  v-bind:title="msnNaoEditaProdutoServicoInativo"
                  small
                  v-if="!item.ativo"
                >mdi-pencil-remove</v-icon>
              </template>
            </v-data-table>
          </v-content>
        </v-card>
      </v-dialog>
      <!-- EMPRESAS PRODUTOS/SERVICOS -->
    </template>
  </v-data-table>
</template>

<script>
import { mask } from "vue-the-mask";
import ConverterUtil from '@/util/ConverterUtil'

export default {
  directives: { mask },

  data: () => ({
    valid: true,
    readonly: false,
    novoCadastro: false,
    dialog: false,
    dialogMenssagem: false,
    headers: [
      { text: "Empresa", value: "empresa" },
      { text: "CNPJ", value: "cnpj" },
      { text: "E-mail", value: "email" },
      { text: "Telefone", value: "telefone" },
      { text: "Ações", value: "actions", sortable: false }
    ],
    empresas: [],
    editedIndex: -1,
    msgCadastrarProduto: "Cadastrar Produto",
    messageDisable: "Desativar Empresa",
    messageEnable: "Ativar Empresa",
    msgVisualizar: "Visualizar Empresa",
    messageNewAdd: "Novo Cadastro",
    msgMensagens: "Área de Mensagens",
    msnEditar: "Editar Empresa",
    msgClose: "Fechar Campos",

    editedItem: {
      empresa: "",
      cnpj: "",
      email: "",
      telefone: "",
      rua: "",
      numero: "",
      complemento: "",
      bairro: "",
      cep: "",
      cidade: "",
      uf: "",
      ramo: "",
      ativo: Boolean
    },

    defaultItem: {
      empresa: "",
      cnpj: "",
      email: "",
      telefone: "",
      rua: "",
      numero: "",
      complemento: "",
      bairro: "",
      cep: "",
      cidade: "",
      uf: "",
      ramo: "",
      ativo: Boolean
    },

    visualizedtItem: {
      empresa: "",
      cnpj: "",
      email: "",
      telefone: "",
      rua: "",
      numero: "",
      complemento: "",
      bairro: "",
      cep: "",
      cidade: "",
      uf: "",
      ramo: "",
      ativo: Boolean
    },

    uf: [
      "AC",
      "AL",
      "AM",
      "AP",
      "BA",
      "CE",
      "DF",
      "ES",
      "GO",
      "MA",
      "MT",
      "MS",
      "MG",
      "PA",
      "PB",
      "PR",
      "PE",
      "PI",
      "RJ",
      "RN",
      "RO",
      "RS",
      "RR",
      "SC",
      "SE",
      "SP",
      "TO"
    ],

    campoRules: [v => !!v || "Campo obrigatório"],
    emailRules: [v => /.+@.+\..+/.test(v) || "Digite um e-mail válido"],
    cnpjRules: [
      v =>
        (!!v && v.length >= 14 && v.length <= 18) ||
        "CPF ou CNPJ deve ser válido"
    ],
    telRules: [v => (!!v && v.length >= 14) || "Digite telefone com DDD"],
    cepRules: [v => (!!v && v.length == 9) || "Digite o CEP com 8 dígitos"],

    // Data de Produtos e Serviços
    validProdutosServicos: true,
    nomeProdutoServicoRules: [
      v => (!!v && v.length >= 4) || "Digite o nome do Produto/Serviço"
    ],
    dialogDetalhaProdutoServico: false,
    dialogProdutosServicos: false,
    msnNaoEditaProdutoServicoInativo:
      "Não é possível editar um Produto/Serviço Inativo",
    msnDetalharProdutoServico: "Detalhar Produto/Serviço",
    msnDesativarProdutoServico: "Desativar Produto/Serviço",
    msnAtivarProdutoServico: "Ativar Produto/Serviço",
    msnEditarProdutoServico: "Editar Produto/Serviço",
    msnCadastraListaProdutosServicos: "Cadastro de Produtos ou Serviços",
    msnBotaoNovoProdServ: "Novo Produto ou Serviço",
    produtosServicosDescricaoRules: [
      v =>
        (!!v && v.length >= 20) ||
        "Descreva o Produto/Serviço - Mín. 20 caracteres"
    ],
    produtosServicosValorRules: [v => !!v || "Digite o valor"],
    selectProdServTipo: ["Produto", "Serviço"],
    produtoServico: {},
    produtosServicos: [],
    mostraNovoProdServ: false,
    produtoServicoEditadoIndex: -1,
    produtoServicoDetalhado: {
      nome: "",
      tipo: "",
      valor: "",
      descricao: "",
      img: "",
      ativo: Boolean
    },
    produtoServicoEditado: {
      nome: "",
      tipo: "",
      valor: "",
      descricao: "",
      img: "",
      ativo: Boolean
    },
    produtoServicoPadrao: {
      nome: "",
      tipo: "",
      valor: "",
      descricao: "",
      img: "",
      ativo: Boolean
    },
    testeImagem: require("../assets/maquiadora.jpg"),
    headersProdutosServicos: [
      { text: "", value: "img" },
      { text: "Nome", value: "nome" },
      { text: "Produto/Serviço", value: "tipo" },
      { text: "Valor", value: "valor" },
      { text: "Ações", value: "actions", sortable: false }
    ]
    // Data de Produtos e Serviços
  }),

  computed: {
    formTitle() {
      return this.editedIndex == -1
        ? "Cadastrar Empresa"
        : "Editar dados da Empresa";
    },
    formTitleProdutosServicos() {
      return this.produtoServicoEditadoIndex === -1
        ? "Novo Produto/Serviço"
        : "Editar Produto/Serviço";
    }


  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      // ConverterUtil.converterCNPJParaNumero()
      (this.empresas = [
        {
          empresa: "Empresa 1",
          cnpj: "11122233344455",
          email: "empresa1@empresa1.com.br",
          telefone: "6733334444",
          ativo: true
        },
        {
          empresa: "Empresa 2",
          cnpj: "11122233344456",
          email: "empresa2@empresa2.com.br",
          telefone: "6733334444",
          ativo: true
        }
      ]),
        // initialize de Produtos e Serviços
        (this.produtosServicos = [
          {
            nome: "Jardineiro",
            tipo: "Serviço",
            valor: 80.0,
            descricao: "Faço serviço de jardinagem",
            img: require("../assets/manutencao.jpg"),
            ativo: true
          },
          {
            nome: "Sapato1",
            tipo: "Produto",
            valor: 10,
            descricao: "Vendo sapato semi-novo",
            img: require("../assets/sapato.jpg"),
            ativo: true
          },
          {
            nome: "Maquiadora1",
            tipo: "Serviço",
            valor: 10,
            descricao: "Maquiadora profissional",
            img: require("../assets/maquiadora.jpg"),
            ativo: false
          },
          {
            nome: "Sapato2",
            tipo: "Produto",
            valor: 20,
            descricao: "Vendo sapato semi-novo",
            img: require("../assets/sapato.jpg"),
            ativo: false
          },
          {
            nome: "Maquiadora2",
            tipo: "Serviço",
            valor: 20,
            descricao: "Maquiadora profissional",
            img: require("../assets/maquiadora.jpg"),
            ativo: false
          },
          {
            nome: "Sapato3",
            tipo: "Produto",
            valor: 30,
            descricao: "Vendo sapato semi-novo",
            img: require("../assets/sapato.jpg"),
            ativo: true
          },
          {
            nome: "Maquiadora3",
            tipo: "Serviço",
            valor: 30,
            descricao: "Maquiadora profissional",
            img: require("../assets/maquiadora.jpg"),
            ativo: true
          }
        ]);
      // initialize de Produtos e Serviços
    },

    editItem(item) {
      this.novoCadastro = true;
      this.editedIndex = this.empresas.indexOf(item);
      this.editedItem = Object.assign({}, item);
    },

    ativarDesativarEmpresa(item) {
      let resp = "";
      if (item.ativo)
        resp = confirm("Tem certeza que deseja desativar essa empresa?");
      else resp = confirm("Tem certeza que deseja reativar essa empresa?");

      if (resp) {
        item.ativo = !item.ativo;
      }
    },

    mostrarCadastro() {
      this.novoCadastro = !this.novoCadastro;
      this.reset();
    },

    visualizaEmpresa(item) {
      this.visualizedtItem = Object.assign({}, item);
      this.dialog = true;
    },

    close() {
      this.novoCadastro = false;
      this.editedItem = Object.assign({}, this.defaultItem);
      this.editedIndex = -1;
      this.reset();
    },

    save() {
      /*             alert(JSON.stringify(this.editedItem)); */

      if (this.editedIndex > -1) {
        Object.assign(this.empresas[this.editedIndex], this.editedItem);
      } else {
        this.editedItem.ativo = true;
        this.empresas.push(this.editedItem);
      }
      this.close();
    },

    reset() {
      this.$refs.form.reset();
      this.novoCadastro = false;
    },

    // Methods de Produtos e Serviços
    mostrarNovoProdServ() {
      this.mostraNovoProdServ = !this.mostraNovoProdServ;
      this.resetProdutosServicos;
    },
    abreNovoProdServ() {
      this.mostraNovoProdServ = true;
    },
    abrirDialogProdutosServicos() {
      this.dialogProdutosServicos = true;
    },
    fecharDialogProdutosServicos() {
      this.dialogProdutosServicos = false;
    },
    salvarProdutoServicoEditado() {
      if (this.produtoServicoEditadoIndex > -1) {
        Object.assign(
          this.produtosServicos[this.produtoServicoEditadoIndex],
          this.produtoServicoEditado
        );
      } else {
        this.produtoServicoEditado.ativo = true;
        this.produtosServicos.push(
          Object.assign({}, this.produtoServicoEditado)
        );
      }
      this.resetProdutosServicos();
    },
    ativarDesativarProdutoServico(item) {
      confirm(
        "Tem certeza que deseja Ativar/Desativar esse Produto/Serviço?"
      ) && (item.ativo = !item.ativo);
    },
    editarProdutoServico(item) {
      this.abreNovoProdServ();
      this.produtoServicoEditadoIndex = this.produtosServicos.indexOf(item);
      this.produtoServicoEditado = Object.assign({}, item);
    },
    resetProdutosServicos() {
      this.$refs.form.reset();
      this.produtoServicoEditadoIndex = -1;
    },
    detalharProdutoServico(item) {
      this.produtoServicoDetalhado = Object.assign(
        {},
        this.produtoServicoPadrao
      );
      this.produtoServicoDetalhado = Object.assign({}, item);
      this.dialogDetalhaProdutoServico = true;
    },
    // Methods de Produtos e Serviços



   // Methods para Mensagens
  abrirDialogMenssagem() {
      this.dialogMenssagem = true;
    },
    
    fecharDialogMenssagem() {
      this.dialogMenssagem = false;
    },
  // Methods para Mensagens

}
};
</script>

<style>
.empresaInativa {
  color: #454547;
}
html {
  overflow-y: auto;
}

/* Styles de Produtos e Serviços */
.toolbarCadLisProdServ {
  border-bottom: solid 1px #454547;
}
.produtoServicoAtivo {
  color: white;
}
.produtoServicoInativo {
  color: #454547;
}
.inputNumeroLimpo input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
/* Styles de Produtos e Serviços */



/* Styles Mensagens */
#chat {
  height: 80%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
.messages {
  width: 600px;
  height: 400px;
  margin: 20px 0;
  border: 1px solid #ddd;
  padding: 20px;
}
/* Styles Mensagens */

</style>
