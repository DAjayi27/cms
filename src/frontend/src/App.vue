<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import NavBar from "@/components/NavBar.vue";
</script>

<template>
  <div class="main-container ">
    <nav-bar/>
    <main class="bg-body-tertiary" >
      <router-view></router-view>
    </main>
  </div>
</template>

<style scoped>

.main-container{
  display: grid;
  grid-template-rows: auto 1fr;
  height: 100%;
  min-height: 100vh;
}



</style>
