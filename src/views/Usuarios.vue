<template class="overflow-y-hidden">
  <v-data-table :headers="headers" :items="usuarios" sort-by="username" class="elevation-1">
    <template v-slot:top>
      <v-expand-transition>
        <v-card v-if="mostraNovoUsuario">
          <v-card-title>
            <span class="headline">{{formTitle}}</span>
          </v-card-title>
          <v-form @submit="e.keyCode === 13" v-model="valid" ref="form">
            <v-card-text class="pa-0">
              <v-container>
                <v-row justify="center">
                  <v-col cols="12" sm="6" md="6" lg="4" xl="3">
                    <v-text-field
                      v-model="editedItem.username"
                      label="Nome de usuário"
                      :rules="nameRules"
                      counter
                      :maxlength="10"
                      type="text"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row justify="center">
                  <v-col cols="12" sm="6" md="6" lg="4" xl="3">
                    <v-text-field
                      v-model="editedItem.password"
                      label="Senha"
                      :rules="passwordRules"
                      counter
                      :maxlength="6"
                      type="password"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <v-layout justify-center>
              <v-card-actions class="mb-3">
                <v-spacer></v-spacer>
                <v-btn
                  type="submit"
                  color="primary"
                  dark
                  class="mb-2"
                  @click="save"
                  :disabled="!valid"
                >Salvar</v-btn>
                <v-btn color="primary" dark class="mb-2" @click="reset">Cancelar</v-btn>
              </v-card-actions>
            </v-layout>
          </v-form>
        </v-card>
      </v-expand-transition>
      <v-toolbar flat color="dark-grey">
        <v-toolbar-title>Lista de Usuários</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn color="primary" fab dark small @click="mostrarNovoUsuario">
          <v-icon v-if="!mostraNovoUsuario" dark v-bind:title="msnBotaoUser">mdi-plus</v-icon>
          <v-icon v-if="mostraNovoUsuario" dark>mdi-minus</v-icon>
        </v-btn>
      </v-toolbar>
    </template>
    <template v-slot:item.tipo="{ item }">
      <tr v-bind:class="{ usuarioInativo: !item.ativo }">
        {{
        item.tipo
        }}
      </tr>
    </template>
    <template v-slot:item.username="{ item }">
      <tr v-bind:class="{ usuarioInativo: !item.ativo }">
        {{
        item.username
        }}
      </tr>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        v-if="item.ativo"
        small
        color="green"
        @click="ativarDesativarUsuario(item)"
        v-bind:title="msnDesativar"
      >mdi-check-bold</v-icon>
      <v-icon
        v-if="!item.ativo"
        small
        color="red"
        @click="ativarDesativarUsuario(item)"
        v-bind:title="msnAtivar"
      >mdi-cancel</v-icon>
      <v-icon small v-if="item.ativo" @click="editItem(item)" v-bind:title="msnEditar">mdi-pencil</v-icon>
      <v-icon small v-if="!item.ativo">mdi-pencil-remove</v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">Reset</v-btn>
    </template>
  </v-data-table>
</template>
<script>
export default {
  data: () => ({
    usuario: {},
    usuarios: [],
    mostraNovoUsuario: false,
    valid: true,
    nameRules: [
      v => !!v || "Digite um nome de usuário!",
      v =>
        (!!v && v.length >= 3 && v.length <= 10) ||
        "Nome de usuário deve possuir no mínimo 3 e no máximo 10 caracteres!"
    ],
    passwordRules: [
      v => !!v || "Digite uma senha!",
      v => (!!v && v.length == 6) || "A senha deve possuir 6 caracteres!"
    ],
    headers: [
      { text: "Nome de usuário", value: "username" },
      { text: "Tipo", value: "tipo" },
      { text: "Ações", value: "actions", sortable: false }
    ],
    editedIndex: -1,
    msnBotaoUser: "Novo Usuario",
    msnDesativar: "Desativar Usuario",
    msnAtivar: "Ativar Usuario",
    msnEditar: "Editar Usuario",
    editedItem: {
      username: "",
      password: "",
      tipo: "",
      ativo: Boolean
    },
    defaultItem: {
      username: "",
      password: "",
      tipo: "",
      ativo: Boolean
    }
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Novo Usuário" : "Editar Usuário";
    }
  },
  created() {
    this.initialize();
  },
  methods: {
    initialize() {
      this.usuarios = [
        {
          username: "ADMIN",
          password: "0123",
          tipo: "ADMIN",
          ativo: true
        },
        {
          username: "ADMIN2",
          password: "112233",
          tipo: "ADMIN",
          ativo: false
        }
      ];
    },
    abreNovoUsuario() {
      this.mostraNovoUsuario = true;
    },
    mostrarNovoUsuario() {
      this.mostraNovoUsuario = !this.mostraNovoUsuario;
      setTimeout(() => {
        this.reset();
      }, 100);
    },
    ativarDesativarUsuario(usuario) {
      confirm("Tem certeza que deseja Ativar/Desativar esse usuário?") &&
        (usuario.ativo = !usuario.ativo);
    },
    reset() {
      if (this.mostraNovoUsuario) {
        this.$refs.form.reset();
        this.editedIndex = -1;
      }
    },
    editItem(item) {
      this.abreNovoUsuario();
      this.editedIndex = this.usuarios.indexOf(item);
      this.editedItem = Object.assign({}, item);
    },
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.usuarios[this.editedIndex], this.editedItem);
      } else {
        this.editedItem.tipo = "ADMIN";
        this.editedItem.ativo = true;
        this.usuarios.push(Object.assign({}, this.editedItem));
      }
      this.reset();
    }
  }
};
</script>
<style>
.usuarioAtivo {
  color: white;
}
.usuarioInativo {
  color: #454547;
}
html {
  overflow-y: auto;
}
</style>