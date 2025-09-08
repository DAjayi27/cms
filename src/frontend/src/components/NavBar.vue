<script setup lang="ts">
import { BNavbar, BNavbarBrand, BNavbarToggle, BCollapse, BNavbarNav, BNavItem, BNavItemDropdown, BDropdownItem, BNavForm, BFormInput, BButton } from 'bootstrap-vue-next'
import { RouterLink, RouterView } from 'vue-router'


</script>

<template>
  <BNavbar v-b-color-mode="'dark'" toggleable="lg" class="bg-body-tertiary">
    <BNavbarBrand href="/">NavBar</BNavbarBrand>
    <BNavbarToggle target="nav-collapse" />
    <BCollapse id="nav-collapse" is-nav>
      <BNavbarNav>
        <router-link :to="{name:'dashboard'}" class="nav-link">Dashboard</router-link>
        <router-link :to="{name:'about'}" class="nav-link">About</router-link>

      </BNavbarNav>
      <!-- Right aligned nav items -->
      <BNavbarNav class="ms-auto mb-2 mb-lg-0">
        <BNavItemDropdown text="Lang" right>
          <BDropdownItem href="#">EN</BDropdownItem>
          <BDropdownItem href="#">ES</BDropdownItem>
          <BDropdownItem href="#">RU</BDropdownItem>
          <BDropdownItem href="#">FA</BDropdownItem>
        </BNavItemDropdown>
        <BNavItemDropdown right>
          <!-- Using 'button-content' slot -->
          <template #button-content>
            <em>User</em>
          </template>
          <BDropdownItem href="#">Profile</BDropdownItem>
          <BDropdownItem href="#">Sign Out</BDropdownItem>
        </BNavItemDropdown>
      </BNavbarNav>
      <BNavForm class="d-flex">
        <BFormInput
            class="me-2"
            placeholder="Search"
        />
        <BButton
            type="submit"
            variant="outline-success"
        >Search</BButton
        >
      </BNavForm>
    </BCollapse>
  </BNavbar>
</template>

<style scoped>

</style>