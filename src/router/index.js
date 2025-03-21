import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Processos from '../views/Processos.vue';
import NovoProcesso from '../views/NovoProcesso.vue';
import Login from '../views/Login.vue';
import DetalhesProcesso from '../views/DetalhesProcesso.vue';
import EditarProcesso from '../views/EditarProcesso.vue';


const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/processos', component: Processos, meta: { requiresAuth: true } },
  { path: '/novo-processo', component: NovoProcesso, meta: { requiresAuth: true } },
  { path: '/processo/:numero', name: 'DetalhesProcesso', component: DetalhesProcesso, props: true },
  { path: '/editar-processo/:numero', name: 'EditarProcesso', component: EditarProcesso, props: true },
  ];

const router = createRouter(
  {
  history: createWebHistory('/prova-pge'),
  routes
  },
);

router.beforeEach((to, from, next) => {
  const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

  if (to.meta.requiresAuth && !usuarioLogado) {
    alert('Você precisa estar logado para acessar esta página.');
    next('/login');
  } else if (to.path === '/login' && usuarioLogado) {
    next('/processos');
  } else {
    next();
  }
});

export default router;
