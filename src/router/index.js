import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/usuarios",
    name: "Usuário",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Usuarios.vue")
  },
  {
    path: "/empresas",
    name: "Empresas",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Empresas.vue")
  },
  {
    path: "/transacoes",
    name: "Transações",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Transacoes.vue")
  },
  {
    path: "/clientes",
    name: "Clientes",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Clientes.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
