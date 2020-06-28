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
                <v-btn color="primary" dark class="mb-2" @click="resetClose">Cancelar</v-btn>
              </v-card-actions>
            </v-layout>
          </v-form>
        </v-card>
      </v-expand-transition>
    
      <v-expand-transition>
        <v-card v-if="detalharEmpresa">
          <v-card-title>
            <h3 class="ml-3">Dados da Empresa:</h3>
            <v-spacer></v-spacer>
             <v-btn @click="fecharDetalharEmpresa()" color="primary" dark small>Fechar</v-btn>
          </v-card-title>

          <v-container>
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

          <v-toolbar flat color="dark-grey">
              <v-toolbar-title>Lista de Produtos e Serviços da Empresa</v-toolbar-title>
          </v-toolbar>

            <v-data-table
              :headers="headersProdutosServicos"
              :items="produtosServicos"
              sort-by="nome"
              class="elevation-1">
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
                  <money v-model="item.valor" v-bind="money" readonly="true"></money>
                </tr>
              </template>
              <template v-slot:item.actions="{ item }">
                <v-icon
                  size="20"
                  @click="detalharProdutoServico(item)"
                  v-bind:title="msnDetalharProdutoServico"
                >mdi-magnify</v-icon>

                <v-dialog
                  size="20"
                  v-model="dialogDetalhaProdutoServico"
                  :retain-focus="false"
                  transition="dialog-transition"
                  overlay-color="grey"
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
                          <money v-model="produtoServicoDetalhado.valor" v-bind="money" readonly></money>
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
                  size="20"
                  class="ml-2"
                  v-if="item.ativo"
                  color="green"
                  @click="ativarDesativarProdutoServico(item)"
                  v-bind:title="msnDesativarProdutoServico"
                >mdi-check-bold</v-icon>
                <v-icon
                  size="20"
                  class="ml-2"
                  v-if="!item.ativo"
                  color="red"
                  @click="ativarDesativarProdutoServico(item)"
                  v-bind:title="msnAtivarProdutoServico"
                >mdi-cancel</v-icon>
                <v-icon
                  class="ml-2"
                  size="20"
                  v-if="item.ativo"
                  @click="editarProdutoServico(item)"
                  v-bind:title="msnEditarProdutoServico"
                >mdi-pencil</v-icon>
                <v-icon
                  class="ml-2"
                  v-bind:title="msnNaoEditaProdutoServicoInativo"
                  size="20"
                  v-if="!item.ativo"
                >mdi-pencil-remove</v-icon>
              </template>
            </v-data-table>
              <v-layout justify-center>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" dark class="mb-2" @click="fecharDetalharEmpresa()">FECHAR DETALHAMENTO DE EMPRESAS</v-btn>
                </v-card-actions>
            </v-layout>
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
      <tr v-bind:class="{ empresaInativa: !item.ativo }">
        {{
        item.empresa
        }}
      </tr>
    </template>
    <template v-slot:item.cnpj="{ item }">
      <tr v-bind:class="{ empresaInativa: !item.ativo }">
        {{
        item.cnpj
        }}
      </tr>
    </template>
    <template v-slot:item.email="{ item }">
      <tr v-bind:class="{ empresaInativa: !item.ativo }">
        {{
        item.email
        }}
      </tr>
    </template>
    <template v-slot:item.telefone="{ item }">
      <tr v-bind:class="{ empresaInativa: !item.ativo }">
        {{
        item.telefone
        }}
      </tr>
    </template>

    <template v-slot:item.actions="{ item }">
      <v-icon
        size="20"
        @click="mostrarNovoProdServ(item)"
        v-bind:title="msnCadastraListaProdutosServicos"
      >mdi-wrench-outline</v-icon>
      <v-icon
        size="20"
        class="ml-1"
        @click="abrirDialogMensagens(item)"
        v-bind:title="msgMensagens"
      >mdi-email-outline</v-icon>
      <v-icon
        size="20"
        class="ml-1"
        @click="visualizaEmpresa(item)"
        v-bind:title="msgVisualizar"
      >mdi-magnify</v-icon>
      <v-icon
        size="20"
        class="ml-1"
        v-if="!item.ativo"
        color="red"
        @click="ativarDesativarEmpresa(item)"
        v-bind:title="messageEnable"
      >mdi-cancel</v-icon>
      <v-icon
        size="20"
        class="ml-1"
        v-if="item.ativo"
        color="green"
        @click="ativarDesativarEmpresa(item)"
        v-bind:title="messageDisable"
      >mdi-check-bold</v-icon>
      <v-icon
        size="20"
        class="ml-1"
        v-if="item.ativo"
        @click="editItem(item)"
        v-bind:title="msnEditar"
      >mdi-pencil</v-icon>
      
      <!-- * HTML MENSAGENS INICIO * -->
      <!-- Todas as mensagens de uma empresa inicio -->
      <v-dialog
        max-width="800px"
        :retain-focus="false"
        v-model="dialogMensagens"
        scrollable
        transition="dialog-transition"
        overlay-color="grey"
        :persistent="vDialogMensagensPersistent">
        <v-card>
          <v-toolbar class="toolbarCadMsg" flat color="dark-grey">
            <v-toolbar-title>Mensagens:</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn @click="fecharDialogMensagens" color="primary">Fechar</v-btn>
          </v-toolbar>

          <v-data-table
            :headers="headersMensagens"
            :items="empresaMensagens.mensagens"
            sort-by="nome"
            class="elevation-1"
          >
            <template v-slot:item.cliente="{ item }">
              <tr>
                {{
                item.cliente
                }}
              </tr>
            </template>

            <template v-slot:item.actions="{ item }">
              <v-icon
                size="20"
                @click="abrirDialogMensagem(item)"
                class="ml-3"
                v-bind:title="msnAcessarMensagens"
              >mdi-message-text-outline</v-icon>
              <v-icon
                size="20"
                class="ml-10"
                v-if="item.visualizada"
                color="green"
                v-bind:title="msnMensagensVisualizadas"
              >mdi-checkbox-marked-circle-outline</v-icon>
              <v-icon
                size="20"
                class="ml-10"
                v-if="!item.visualizada"
                color="yellow"
                v-bind:title="msnMensagensNaoVisualizadas"
              >mdi-alert-circle-outline</v-icon>
            </template>
          </v-data-table>
        </v-card>
      </v-dialog>
      <!-- Todas as mensagens de uma empresa fim -->

      <!-- Uma conversa individualizada de um cliente com a empresa inicio -->
      <v-dialog
        :retain-focus="false"
        :persistent="vDialogMensagemPersistent"
        scrollable
        v-model="dialogMensagem"
        width="800"
        overlay-opacity="0.3">
        <v-card>
          <v-container class="pa-5 ma-0">
            <v-row>
              <v-col cols="12" sm="12">
                <v-card>
                  <v-toolbar>
                    <v-card-title primary-title>Mensagens de {{ clienteMensagemConsultada.cliente }}</v-card-title>
                    <v-spacer></v-spacer>
                    <v-btn @click="fecharDialogMensagem()" color="primary">Fechar</v-btn>
                  </v-toolbar>

                  <v-list-item
                    two-line
                    v-for="conversa in clienteMensagemConsultada.conversa"
                    :key="conversa.mensagem"
                  >
                    <v-list-item-content>
                      <v-list-item-title>{{conversa.origem}}: {{conversa.mensagem}}</v-list-item-title>
                      <v-list-item-subtitle>Data e hora</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>
                </v-card>
              </v-col>
            </v-row>
            <v-form ref="formMensagens" v-model="validChat">
              <v-row class="mt-10 mb-0">
                <v-col cols="12" sm="12">
                  <v-textarea
                    required
                    :rules="mensagemRules"
                    filled
                    outlined
                    v-model="mensagemEmEdicao"
                    name="inputTextoMensagem"
                    label="Escreva sua mensagem"
                  ></v-textarea>
                </v-col>
              </v-row>
              <v-row class="mt-0">
                <v-col cols="12" sm="12">
                  <v-layout row wrap justify-center>
                    <v-btn
                      color="primary"
                      dark
                      class
                      @click="salvaMensagem()"
                      :disabled="!validChat"
                    >Enviar</v-btn>
                    <v-btn
                      color="primary"
                      ref="refBotaoCancelarMensagem"
                      dark
                      class="ml-5"
                      @click="resetCampoMensagem()"
                    >Cancelar</v-btn>
                  </v-layout>
                </v-col>
              </v-row>
            </v-form>
          </v-container>
        </v-card>
      </v-dialog>
      <!-- Uma conversa individualizada de um cliente com a empresa fim -->
      <!-- * HTML MENSAGENS FIM * -->

      <!-- * HTML PRODUTOS/SERVICOS INICIO * -->
      <!-- BUG 1 (VUETIFY COM ERRO AO DEFINIR ENDEREÇO DINAMICO PARA V-IMG, ENCONTREI NA INTERNET SOLUÇÃO DE USAR 'REQUEST', IMPLEMENTEI NOS PRODUTOS/SERVIÇOS PRÉ-GERADOS, MAS AINDA NÃO É UMA SOLUÇÃO PRÁTICA) -->
      <!-- BUG 2 (POR CAUSA DO BUG 2 NOVOS PRODUTOS/SERVIÇOS CADASTRADOS NÃO MOSTRAM IMG) -->
      <!-- TODO: (Produtos e Serviços):
      // 1- Arrumar as imagens na lista de Produtos e Serviços (não foi possível até a entrega)
      // 2.1- fazer imagens por url para demonstração ()
      // 2.2- implementar upload de arquivo, endereçamento, pasta e efetivo dowload do arquivo para algum lugar
      // 3- Integrar variáveis/objetos/arrays de Produtos e Serviços com Chat-->

       <!-- * CADASTRO PRODUTOS E SERVIÇOS * -->
      <v-dialog
        :retain-focus="false"
        :persistent="vDialogProdutosServicosPersistentVariable"
        v-model="dialogProdutosServicos"
        scrollable
        transition="dialog-transition"
        overlay-color="grey">
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

                          <label>Valor:</label>
                          <money v-model="produtoServicoEditado.valor" v-bind="money"></money>
                        </v-col>
                        <v-col cols="12" sm="6" md="6" lg="4" xl="3">
                          <v-file-input accept="image/*" label="Imagem (Opcional)" prepend-icon></v-file-input>
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

            
          </v-content>
        </v-card>
      </v-dialog>
      <!-- HTML PRODUTOS/SERVICOS FIM -->
    </template>
  </v-data-table>
</template>

<script>
import { mask } from "vue-the-mask";
import ConverterUtil from "@/util/ConverterUtil";
import { Money } from "v-money";

import EmpresasRequestUtil from "@/util/request-utils/EmpresasRequestUtil";

export default {
  directives: { mask },
  components: { Money },

  data: () => ({
    //Telas
    valid: true,
    readonly: false,
    novoCadastro: false,
    detalharEmpresa: false,
    teste: true,
    dialog: false,
    dialogMensagens: false,
    dialogMensagem: false,
    //Telas

    // declaraçao mensagem
    user: "",
    message: "",
    mensagem: {},
    mensagens: [],
    valida: true,
    // fim da mensagem

    headers: [
      { text: "Empresa", value: "empresa" },
      { text: "CNPJ", value: "cnpj" },
      { text: "E-mail", value: "email" },
      { text: "Telefone", value: "telefone" },
      { text: "Ações", value: "actions", sortable: false }
    ],
    empresas: [],
    editedIndex: -1,

    // mensagens
    msgCadastrarProduto: "Cadastrar Produto",
    messageDisable: "Desativar Empresa",
    messageEnable: "Ativar Empresa",
    msgVisualizar: "Visualizar Empresa",
    messageNewAdd: "Novo Cadastro",
    msgMensagens: "Área de Mensagens",
    msnEditar: "Editar Empresa",
    msgClose: "Fechar Campos",
    //mensagens

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

    // Data de Produtos e Serviços INICIO
    money: {
      decimal: ",",
      thousands: ".",
      prefix: "R$ ",
      suffix: "",
      precision: 2,
      masked: false
    },
    empresaProdutosServicos: {},
    vDialogProdutosServicosPersistentVariable: true,
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
      valor: 0,
      descricao: "",
      img: "",
      ativo: Boolean
    },
    produtoServicoPadrao: {
      nome: "",
      tipo: "",
      valor: 0,
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
    ],
    // Data de Produtos e Serviços FIM

    // mensagens - data
    msnMensagensVisualizadas: "Mensagens visualizadas",
    msnMensagensNaoVisualizadas: "Existem mensagens não visualizadas",
    msnAcessarMensagens: "Acessar mensagens do cliente",
    mensagemRules: [v => !!v || "Digite uma mensagem"],
    mensagemEmEdicao: "",
    validChat: false,
    clienteMensagemConsultada: {},
    clienteMensagemConsultadaPadrao: {},
    vDialogMensagensPersistent: true,
    vDialogMensagemPersistent: true,
    empresaMensagens: {},
    headersMensagens: [
      { text: "Cliente", value: "cliente", class: "" },
      {
        text: "Acessar / Visualizado?",
        value: "actions",
        width: "160px",
        sortable: false
      }
    ],
    mensagemEditadaIndex: -1,
    mensagemEditada: {
      user: "",
      messagem: "",
      visualizado: Boolean
    },
    mensagemPadrao: {
      user: "",
      messagem: "",
      visualizado: Boolean
    }
    // fim data mensagens
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
      EmpresasRequestUtil.buscarTodos().then(empresas => {
        this.empresas = empresas;
      });
      // this.mensagens = [
      //   {
      //     user: "JAO",
      //     message: "ola gostaria de saber como funciona esse produto",
      //     visualizado: true
      //   },
      //   {
      //     user: "Empresa 1",
      //     message:
      //       "o produto possue x y e z intes para mais informaçoes entre em contato como nossos canais x y e z",
      //     visualizado: true
      //   }
      // ];
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

      setTimeout(() => {
        if (this.novoCadastro) {
          this.reset();
        }
      }, 200);
    },

    fechaCadastro() {
      this.novoCadastro = false;
    },

    visualizaEmpresa(item) {
      this.visualizedtItem = Object.assign({}, item);
      this.produtosServicos = this.visualizedtItem.produtosServicos;
      this.detalharEmpresa = true;
      this.teste = false;
    },

    fecharDetalharEmpresa(){
      this.detalharEmpresa = false
    },

    save() {
      /* alert(JSON.stringify(this.editedItem)); */

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
    },

    close() {
      this.editedItem = Object.assign({}, this.defaultItem);
      this.editedIndex = -1;
      this.reset();
      this.novoCadastro = false;
    },

    resetClose() {
      this.reset();
      this.close();
    },

    // Methods de Produtos e Serviços INICIO
    mostrarNovoProdServ() {
      this.mostraNovoProdServ = !this.mostraNovoProdServ;
      this.dialogProdutosServicos = true;
      setTimeout(() => {
        this.resetProdutosServicos();
      }, 100);
    },
    abreNovoProdServ() {
      this.mostraNovoProdServ = true;
    },
    fechaNovoProdServ() {
      this.mostraNovoProdServ = false;
    },
    abrirDialogProdutosServicos(empresa) {
      this.empresaProdutosServicos = empresa;
      if (empresa.produtosServicos == null) {
        empresa.produtosServicos = [];
      }
      this.produtosServicos = empresa.produtosServicos;
      this.dialogProdutosServicos = true;
    },
    fecharDialogProdutosServicos() {
      this.produtoServicoEditado.valor = 0;
      this.resetProdutosServicos();
      this.fechaNovoProdServ();
      this.dialogProdutosServicos = false;
    },
    salvarProdutoServicoEditado() {
      if (this.produtoServicoEditadoIndex > -1) {
        // EDITAR
        Object.assign(
          this.produtosServicos[this.produtoServicoEditadoIndex],
          this.produtoServicoEditado
          //Aqui dispara a requisição enviando pacoteEdicaoProdutoServico para a API usando o seguinte:
          // let pacoteEdicaoProdutoServico = {}
          // pacoteEdicaoProdutoServico.idDaEmpresa = this.empressaProdutosServicos._id)
          // pacoteEdicaoProdutoServico.indexDoProduto = this.produtoServicoEditadoIndex)
        );
      } else {
        // SALVAR
        this.produtoServicoEditado.ativo = true;
        this.produtosServicos.push(
          Object.assign({}, this.produtoServicoEditado)
          //Aqui dispara a requisição enviando this.empresaProdutosServicos para a API
        );
      }
      this.produtoServicoEditado.valor = 0;
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
      if (this.mostraNovoProdServ) {
        this.$refs.form.reset();
        this.produtoServicoEditadoIndex = -1;
        this.produtoServicoEditado = Object.assign(
          {},
          this.produtoServicoPadrao
        );
      }
    },
    // this.produtoServicoEditado.valor = 0;
    detalharProdutoServico(item) {
      this.produtoServicoDetalhado = Object.assign(
        {},
        this.produtoServicoPadrao
      );
      this.produtoServicoDetalhado = Object.assign({}, item);
      this.dialogDetalhaProdutoServico = true;
    },
    // Methods de Produtos e Serviços FIM

    // Methods de mensagens
    salvaMensagem() {
      let mensagem = {};
      mensagem.mensagem = this.mensagemEmEdicao;
      mensagem.origem = "Empresa";
      this.clienteMensagemConsultada.conversa.push(mensagem);
      this.$refs.formMensagens.reset();
    },
    resetCampoMensagem() {
      this.$refs.formMensagens.reset();
    },
    abrirDialogMensagens(empresa) {
      this.empresaMensagens = empresa;
      if (this.empresaMensagens.mensagens == null) {
        this.empresaMensagens.mensagens = [];
      }
      this.dialogMensagens = true;
    },
    fecharDialogMensagens() {
      this.dialogMensagens = false;
    },
    SalvarMensagemEditada() {
      if (this.mensagemEditadaIndex > -1) {
        Object.assign(
          this.mensagens[this.mensagemEditadaIndex],
          this.mensagemEditada
        );
      } else {
        this.mensagemEditada.visualizado = true;
        this.mensagens.push(Object.assign({}, this.mensagemEditada));
      }
      this.resetaMensagem();
    },
    resetaMenssagem() {},
    abrirDialogMensagem(cliente) {
      this.clienteMensagemConsultada = cliente;
      this.clienteMensagemConsultada.visualizada = true;
      this.dialogMensagem = true;
    },
    fecharDialogMensagem() {
      this.clienteMensagemConsultada = Object.assign(
        {},
        this.clienteMensagemConsultadaPadrao
      );
      this.dialogMensagem = false;
    }
    // fim do metodo de mensagens
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
