import { createRouter, createWebHistory } from 'vue-router'
import Main from '@/components/Main.vue'
import AboutView from "@/views/AboutView.vue";
import Dashboard from "@/views/Dashboard.vue";
import Courses from "@/views/Courses.vue";
import Tasks from "@/views/Tasks.vue";

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
    },
    {
      path:'/courses',
      name:'courses',
      component: Courses
    },
    {
      path:'/course/:id',
      name:'course',
      component: Courses
    },
    {
      path:'/tasks',
      name:'tasks',
      component: Tasks
    }

  ],
})

export default router
