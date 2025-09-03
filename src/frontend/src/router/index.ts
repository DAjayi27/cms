import { createRouter, createWebHistory } from 'vue-router'
import Main from '@/components/Main.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/about',
      name: 'about',
      component:Main
    },

  ],
})

export default router
