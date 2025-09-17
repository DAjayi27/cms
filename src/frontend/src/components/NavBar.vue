<script setup lang="ts">
import { BNavbar, BNavbarBrand, BNavbarToggle, BCollapse, BNavbarNav, BNavItem, BNavItemDropdown, BDropdownItem, BNavForm, BFormInput, BButton } from 'bootstrap-vue-next'
import { RouterLink, RouterView } from 'vue-router'
import ThemeToggle from "@/components/ThemeToggle.vue";
import {useThemeStore} from "@/stores/theme.ts";

const theme = useThemeStore()

</script>

<template>
  <BNavbar toggleable="lg" class="bg-body-tertiary">
    <BNavbarBrand href="/" class="fs-1 fw-bolder ">CMS</BNavbarBrand>
    <BNavbarToggle target="nav-collapse" />
    <BCollapse id="nav-collapse" is-nav>
      <BNavbarNav>
        <router-link :to="{name:'dashboard'}" class="nav-link">Dashboard</router-link>
        <router-link :to="{name:'tasks'}" class="nav-link">Tasks</router-link>
        <router-link :to="{name:'courses'}" class="nav-link">Courses</router-link>
<!--        <router-link :to="{name:'about'}" class="nav-link">About</router-link>-->

      </BNavbarNav>
      <!-- Right aligned nav items -->
      <BNavbarNav class="ms-auto mb-2 mb-lg-0">
        <ThemeToggle :mode="theme.mode" @click="theme.cycle()" variant="icon-label" />
        <BNavItemDropdown right>
          <!-- Using 'button-content' slot -->
          <template #button-content>
            <em>User</em>
          </template>
          <BDropdownItem href="#">Profile</BDropdownItem>
          <BDropdownItem href="#">Sign Out</BDropdownItem>
        </BNavItemDropdown>
      </BNavbarNav>
    </BCollapse>
  </BNavbar>
</template>

<style scoped>

</style>