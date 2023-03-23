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
    path: '/admin',
    name: 'admin',
    components: {
      Sidebar,
      Main: () => import('@/views/Admin.vue')
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
