<template>
  <v-app id="formularioCadastroUsuario">
    <v-content class="pa-0">
      <v-container fluid>
        <v-row justify="center" >
          <v-col cols="12" sm="12" md="12">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Cadastro de Usuários</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form v-model="valid" ref="form">
                  <v-text-field
                    label="Nome de usuário (de 2 a 10 caracteres)"
                    name="username"
                    prepend-icon="mdi-account"
                    type="text"
                    v-model="usuario.username"
                    :rules="nameRules"
                  />

                  <v-text-field
                    id="password"
                    label="Senha (6 caracteres)"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                    v-model="usuario.password"
                    :rules="passwordRules"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions class="pb-5">
                <v-spacer />
                <v-btn :disabled="!valid" class="mr-3" color="primary" @click="cadastrarUsuario()">Salvar</v-btn>
                <v-btn color="primary" @click="reset()">Cancelar</v-btn>
                <v-spacer />
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      usuario: {},
      usuarios: [{username: "teste", password: "testee"}],
      valid: true,
      nameRules: [
        v => !!v || 'Digite um nome de usuário!',
        v => (!!v && v.length >=2 && v.length <= 10) || 'Nome de usuário deve possuir no mínimo 2 e no máximo 10 caracteres!',
      ],
      passwordRules: [
        v => !!v || 'Digite uma senha!',
        v => (!!v && v.length == 6) || 'A senha deve possuir 6 caracteres!',
      ],

    };
  },
  methods: {
    cadastrarUsuario() {
      let usuario = Object.assign({}, this.usuario)
      this.usuarios.push(usuario);
      alert(
        JSON.stringify(this.usuarios)
      );
      // *** Nessa linha faz o request para a API salvar o novo usuário
      this.reset()
    },
    
    reset() {
      this.$refs.form.reset()
    }
  }
};
</script>

<style>
.v-btn {
width: 100px;
}
</style>