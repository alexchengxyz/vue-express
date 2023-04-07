import { createRouter, createWebHistory } from 'vue-router';
import SidebarItem from '@/components/SidebarItem.vue';
import Home from '@/views/HomePage.vue';
import NotFound from '@/views/404Page.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    components: {
      Sidebar: SidebarItem,
      Main: Home,
    },
  },
  {
    path: '/users',
    name: 'users',
    components: {
      Sidebar: SidebarItem,
      Main: () => import('@/views/UsersPage.vue'),
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
