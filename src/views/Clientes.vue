<template>
  <v-data-table
    :headers="headers"
    :items="clientes"
    sort-by="nome"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-expand-transition>
        <v-card v-if="mostraNovocliente">
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <the-mask></the-mask>

          <v-form v-model="valid" ref="form">
            <v-card-text>
              <v-container>
                <v-row>
                  <v-spacer></v-spacer>
                  <v-col cols="12" sm="6" md="5" lg="3">
                    <v-text-field
                      v-model="editedItem.nome"
                      label="Nome do cliente"
                      :rules="nameRules"
                      counter
                      :maxlength="25"
                      type="text"
                    ></v-text-field>
                  </v-col>
                  <v-spacer></v-spacer>
                  <v-col cols="12" sm="6" md="5" lg="3">
                    <!-- Falta máscara do CPF, não consegui implementar -->
                    <v-text-field
                      v-model="editedItem.cpf"
                      class="CPF"
                      label="CPF"
                      :rules="cpfRules"
                      counter
                      :maxlength="11"
                      type="number"
                      oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                      placeholder="CPF"
                    ></v-text-field>
                  </v-col>
                  <v-spacer></v-spacer>
                </v-row>
                <v-row>
                  <v-spacer></v-spacer>
                  <v-col cols="12" sm="6" md="5" lg="3">
                    <v-text-field
                      v-model="editedItem.tel"
                      label="Telefone"
                      :rules="telRules"
                      counter
                      :maxlength="11"
                      type="text"
                    ></v-text-field>
                  </v-col>
                  <v-spacer></v-spacer>
                  <v-col cols="12" sm="6" md="5" lg="3">
                    <v-text-field
                      v-model="editedItem.email"
                      label="E-mail"
                      :rules="emailRules"
                      type="text"
                    ></v-text-field>
                  </v-col>
                  <v-spacer></v-spacer>
                </v-row>
              </v-container>
            </v-card-text>

            <v-layout justify-center>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  @click="save"
                  :disabled="!valid"
                  >Salvar</v-btn
                >
                <v-btn color="primary" dark class="mb-2" @click="reset"
                  >Cancelar</v-btn
                >
              </v-card-actions>
            </v-layout>
          </v-form>
        </v-card>
      </v-expand-transition>

      <v-toolbar flat color="dark-grey">
        <v-toolbar-title>Lista de clientes</v-toolbar-title>
        <v-spacer></v-spacer>

        <v-btn color="primary" fab dark small @click="mostrarNovocliente">
          <v-icon v-if="!mostraNovocliente" dark v-bind:title="msnBotaoUser"
            >mdi-plus</v-icon
          >
          <v-icon v-if="mostraNovocliente" dark>mdi-minus</v-icon>
        </v-btn>
      </v-toolbar>
    </template>

    <template v-slot:item.nome="{ item }">
      <tr v-bind:class="{ clienteInativo: !item.ativo }">
        {{
          item.nome
        }}
      </tr>
    </template>

    <template v-slot:item.cpf="{ item }">
      <tr v-bind:class="{ clienteInativo: !item.ativo }">
        {{
          item.cpf
        }}
      </tr>
    </template>

    <template v-slot:item.tel="{ item }">
      <tr v-bind:class="{ clienteInativo: !item.ativo }">
        {{
          item.tel
        }}
      </tr>
    </template>

    <template v-slot:item.email="{ item }">
      <tr v-bind:class="{ clienteInativo: !item.ativo }">
        {{
          item.email
        }}
      </tr>
    </template>

    <template v-slot:item.actions="{ item }">
      <v-icon
        v-if="item.ativo"
        small
        color="green"
        @click="ativarDesativarcliente(item)"
        v-bind:title="msnDesativar"
        >mdi-check-bold</v-icon
      >

      <v-icon
        v-if="!item.ativo"
        small
        color="red"
        @click="ativarDesativarcliente(item)"
        v-bind:title="msnAtivar"
        >mdi-cancel</v-icon
      >

      <v-icon
        small
        v-if="item.ativo"
        @click="editItem(item)"
        v-bind:title="msnEditar"
        >mdi-pencil</v-icon
      >

      <v-icon small v-if="!item.ativo">mdi-pencil-remove</v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
  </v-data-table>
</template>

<script>
import { TheMask } from "vue-the-mask";
export default {
  components: { TheMask },
  data: () => ({
    mask: "###.###.###-##",
    cliente: {},
    clientes: [],
    mostraNovocliente: false,
    valid: true,
    nameRules: [(v) => !!v || "Digite o nome do cliente"],
    cpfRules: [(v) => (!!v && v.length == 11) || "Digite o CPF com 11 dígitos"],
    telRules: [
      (v) => (!!v && v.length >= 3 && v.length == 11) || "Digite o telefone",
    ],
    emailRules: [(v) => /.+@.+\..+/.test(v) || "Digite um e-mail válido"],
    headers: [
      { text: "Nome de cliente", value: "nome" },
      { text: "CPF", value: "cpf" },
      { text: "Telefone", value: "tel" },
      { text: "E-mail", value: "email" },
      { text: "Ações", value: "actions", sortable: false },
    ],
    dialog: false,
    editedIndex: -1,
    msnBotaoUser: "Novo cliente",
    msnDesativar: "Desativar cliente",
    msnAtivar: "Ativar cliente",
    msnEditar: "Editar cliente",

    editedItem: {
      nome: "",
      cpf: "",
      tel: "",
      email: "",
      ativo: Boolean,
    },
    defaultItem: {
      nome: "",
      cpf: "",
      tel: "",
      email: "",
      ativo: Boolean,
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Novo cliente" : "Editar cliente";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      this.clientes = [
        {
          nome: "Teste1",
          cpf: "11111111111",
          tel: "11111111",
          email: "teste1@teste.com",
          ativo: Boolean,
        },
        {
          nome: "Teste2",
          cpf: "22222222222",
          tel: "22222222",
          email: "teste2@teste.com",
          ativo: Boolean,
        },
      ];
    },

    corAtivo(ativo) {
      if (ativo == true) return "clienteAtivo";
      else return "clienteInativo";
    },

    mostra() {
      alert("hey");
    },

    abreNovocliente() {
      this.mostraNovocliente = true;
    },

    mostrarNovocliente() {
      this.mostraNovocliente = !this.mostraNovocliente;
      this.reset();
    },

    ativarDesativarcliente(cliente) {
      confirm("Tem certeza que deseja Ativar/Desativar esse cliente?") &&
        (cliente.ativo = !cliente.ativo);
    },

    cadastrarcliente() {
      let cliente = Object.assign({}, this.cliente);
      cliente.ativo = true;
      this.clientes.push(cliente);
      alert(JSON.stringify(this.clientes));
      // *** Nessa linha faz o request para a API salvar o novo cliente
      this.reset();
    },

    reset() {
      this.$refs.form.reset();
      this.editedIndex = -1;
    },

    editItem(item) {
      this.abreNovocliente();
      this.editedIndex = this.clientes.indexOf(item);
      this.editedItem = Object.assign({}, item);
    },

    deleteItem(item) {
      const index = this.desserts.indexOf(item);
      confirm("Você tem certeza que deseja apagar esse item?") &&
        this.clientes.splice(index, 1);
    },

    close() {
      this.mostraNovocliente = false;
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.clientes[this.editedIndex], this.editedItem);
      } else {
        this.editedItem.tipo = "ADMIN";
        this.editedItem.ativo = true;
        this.clientes.push(Object.assign({}, this.editedItem));
      }
      this.reset();
    },
  },
};
</script>

<style>
.clienteAtivo {
  color: white;
}
.clienteInativo {
  color: #454547;
}
.CPF input::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
</style>
