<template>
  <v-content class="pa-5">
    <v-container>
      <v-row justify="center">
        <v-col cols="12" sm="8" md="8" lg="6" xl="4">
          <v-card class="elevation-12">
            <v-toolbar dark flat>
              <v-toolbar-title>Login High Service</v-toolbar-title>
            </v-toolbar>
            <v-card-text class="px-10">
              <v-row justify="center">
                <img
                  class="mb-8"
                  width="160"
                  alt="Logo High Service"
                  src="../assets/LOGO HIGH SERVICE 1.jpg"
                />
              </v-row>
              <v-form v-model="valid" ref="form">
                <v-text-field
                  label="Username"
                  name="login"
                  prepend-icon="mdi-account"
                  type="text"
                  :maxlength="10"
                  v-model="usuario.username"
                  :rules="usernameRule"
                />

                <v-text-field
                  id="password"
                  label="Senha"
                  name="password"
                  prepend-icon="mdi-lock"
                  type="password"
                  :maxlength="6"
                  v-model="usuario.password"
                  :rules="pass"
                />
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn class="botaoLogin" color="primary" @click="autenticar()">Login</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-snackbar
      color="primary"
      v-model="snackbarAutenticado"
      :timeout="snackbarTimeout"
      multi-line="true"
      top="true"
    >Usuário autenticado</v-snackbar>
    <v-snackbar
      color="red"
      v-model="snackbarInvalido"
      :timeout="snackbarTimeout"
      multi-line="true"
      top="true"
    >Usuário ou senha inválido(s)</v-snackbar>
  </v-content>
</template>

<script>
export default {
  data() {
    return {
      usuario: {},
      usuarios: [],
      usuarioAutenticado: {},
      dialog: false,
      snackbarAutenticado: false,
      snackbarInvalido: false,
      snackbarTimeout: 2000,
      valid: false,
      usernameRules: [v => !v || "Digite um nome de usuário"],
      passwordRules: [v => !v || "Digite um nome de usuário"]
    };
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

    autenticar() {
      this.usuarioAutenticado = {};
      let stop = false;
      let i = 0;
      while (stop == false && i <= this.usuarios.length - 1) {
        stop = true;
        if (
          this.usuario.username != this.usuarios[i].username ||
          this.usuario.password != this.usuarios[i].password
        ) {
          stop = false;
          i++;
        }
        if (i == 50) {
          stop = true;
        }
      }
      if (stop == true) {
        this.usuarioAutenticado = Object.assign(this.usuarios[i]);
        this.snackbarAutenticado = true;
        setTimeout(() => {
          this.$router.push("/");
        }, 2500);
      } else {
        this.snackbarInvalido = true;
      }
      this.$refs.form.reset();
    }
  }
};
</script>

<style>
.botaoLogin {
  margin-bottom: 20px;
  width: 100px;
}
</style>