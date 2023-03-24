import { createRouter, createWebHistory } from 'vue-router'
import Sidebar from '@/components/Sidebar.vue'
import Home from '@/views/Home.vue'
import NotFound from '@/views/404.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    components: {
      Sidebar,
      Main: Home,
    },
  },
  {
    path: '/users',
    name: 'users',
    components: {
      Sidebar,
      Main: () => import('@/views/Users.vue')
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
