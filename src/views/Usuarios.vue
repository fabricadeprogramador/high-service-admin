<template>
  <v-app id="formularioCadastroUsuario">
    <v-content class="pa-0">
      <v-container fluid>
        <v-row justify="center" >
          <v-col cols="12" sm="12" md="9">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Cadastro de Usuários</v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="Username"
                    name="login"
                    prepend-icon="mdi-account"
                    type="text"
                    v-model="usuario.username"
                  />

                  <v-text-field
                    id="password"
                    label="Senha"
                    name="password"
                    prepend-icon="mdi-lock"
                    type="password"
                    v-model="usuario.password"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn color="primary" @click="cadastrarUsuario()">Cadastrar</v-btn>
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
      usuario: {}
    };
  },
  methods: {
    cadastrarUsuario() {
      alert(
        "Usuario '" + this.usuario.username + "' cadastrado!"
      );
    }
  }
};
</script>

<style>
</style>