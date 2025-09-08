import { createRouter, createWebHistory } from 'vue-router'
import Main from '@/components/Main.vue'
import AboutView from "@/views/AboutView.vue";
import Dashboard from "@/views/Dashboard.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/about',
      name: 'about',
      component:AboutView
    },
    {
      path: '/',
      name: 'dashboard',
      component:Dashboard
    }

  ],
})

export default router
