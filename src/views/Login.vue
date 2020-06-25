<template>
  <v-content class="pa-5">
    <v-container>
      <v-row justify="center">
        <v-col cols="12" sm="7" md="7" lg="6" xl="4">
          <v-card class="elevation-12">
            <v-toolbar dark flat>
              <v-toolbar-title>Login High Service</v-toolbar-title>
            </v-toolbar>
            <v-card-text class="px-10">
              <v-row justify="center">
                <img class="mb-0" width="200" alt="Logo High Service" src="../assets/logo_hs_1.png" />
              </v-row>
              <v-form @submit="e.keyCode === 13" v-model="valid" ref="form">
                <v-text-field
                  ref="refInputUsername"
                  label="Username"
                  name="login"
                  prepend-icon="mdi-account"
                  type="text"
                  :maxlength="10"
                  v-model="usuario.username"
                  :rules="usernameRules"
                />
                <v-text-field
                  id="password"
                  label="Senha"
                  name="password"
                  prepend-icon="mdi-lock"
                  type="password"
                  :maxlength="6"
                  v-model="usuario.password"
                  :rules="passwordRules"
                />
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    :disabled="!valid"
                    type="submit"
                    class="botaoLogin"
                    color="primary"
                    @click="autenticar()"
                  >Login</v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-form>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-snackbar
      color="primary"
      v-model="snackbarAutenticado"
      :timeout="snackbarTimeout"
      :multi-line="multiLineVariavel"
      :top="topVariavel"
    >Usuário autenticado</v-snackbar>
    <v-snackbar
      color="red"
      v-model="snackbarInvalido"
      :timeout="snackbarTimeout"
      :multi-line="multiLineVariavel"
      :top="topVariavel"
    >Usuário ou senha inválido(s)</v-snackbar>
  </v-content>
</template>
<script>
import UsuariosRequestUtil from "@/util/request-utils/UsuariosRequestUtil";

export default {
  data() {
    return {
      multiLineVariavel: true,
      topVariavel: true,
      usuario: {},
      usuarios: [],
      usuarioAutenticado: {},
      dialog: false,
      snackbarAutenticado: false,
      snackbarInvalido: false,
      snackbarTimeout: 2000,
      valid: false,
      usernameRules: [v => !!v || "Digite o nome do usuário"],
      passwordRules: [v => !!v || "Digite a senha"]
    };
  },
  created() {
    this.initialize();
  },
  mounted() {
    this.$refs.refInputUsername.focus();
  },
  methods: {
    initialize() {
      UsuariosRequestUtil.buscarTodos().then(usuario => {
        this.usuarios = usuario;
      });
    },

    autenticar() {
      alert(JSON.stringify(this.usuario))
      let user = this.usuario
      UsuariosRequestUtil.logar(user).then(res => {
        alert(JSON.stringify(res))
      });
      /* this.usuarioAutenticado = {};
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
      this.$refs.refInputUsername.focus();
    },

    login(){
      let user = {}
      user.username = this.usuario.username
      user.password = this.usuario.password
 */    }
  }
};

</script>
<style>
.botaoLogin {
  margin-top: 10px;
  margin-bottom: 15px;
  width: 100px;
}
html {
  overflow-y: auto;
}
</style>