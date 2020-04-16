<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>
        <v-list-item
          v-for="item in menu"
          :key="item.titulo"
          link
          router
          :to="item.rota"
        >
          <v-list-item-action>
            <v-icon>{{ item.icone }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{ item.titulo }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>High Service - Admin</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-icon>mdi-account-circle</v-icon>
      <span class="mx-2">Jão Admin</span>
      <v-icon @click="deslogar()">mdi-logout</v-icon>
    </v-app-bar>

    <v-content class="ma-3">
      <router-view></router-view>
    </v-content>

    <v-footer app>
      <span>High Service &copy; - Fábrica de Programador 2020 - T27</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: null,
    rotaAtual: "",
    menu: [
      {
        titulo: "Home",
        icone: "mdi-home",
        rota: "/"
      },
      {
        titulo: "Transações",
        icone: "mdi-align-vertical-bottom",
        rota: "transacoes"
      },
      {
        titulo: "Usuários",
        icone: "mdi-account-plus",
        rota: "usuarios"
      },
      {
        titulo: "Empresas",
        icone: "mdi-domain",
        rota: "empresas"
      },
      {
        titulo: "Clientes",
        icone: "mdi-account-group",
        rota: "clientes"
      },
      {
        titulo: "Login",
        icone: "mdi-login",
        rota: "login"
      },
      {
        titulo: "Sair",
        icone: "mdi-exit-run",
        rota: "logout"
      }
    ]
  }),
  methods: {
    deslogar() {
      alert("Chamou o deslogar!!");
    }
  },
  created() {
    this.$vuetify.theme.dark = true;
  },
  mounted() {}
};
</script>
