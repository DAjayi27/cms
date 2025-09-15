<script setup lang="ts">

import AssessmentCard from "@/components/cards/AssessmentCard.vue";
import {ref} from "vue";



const tasks = ref([
  { id: 1, title: '3D Animation Conference', date: 'Dec 14, 08:30 PM', gradient: 'linear-gradient(135deg, #ff7a18, #af002d 85%)', badge: '21' },
  { id: 2, title: 'Handle UX Research', date: 'Dec 18, 10:30 PM', gradient: 'linear-gradient(135deg, #7f00ff, #00d4ff)' },
  { id: 3, title: 'Machine Learning Lesson', date: 'Dec 18, 10:30 PM', gradient: 'linear-gradient(135deg, #ff6a88, #ff99ac)' },
  { id: 4, title: '3D Animation Conference', date: 'Dec 22, 10:30 PM', gradient: 'linear-gradient(135deg, #00b4db, #0083b0)' },
])

const selectedOption = ref('Week');

</script>

<template>
  <div class="card border-0 shadow-sm rounded-4 h-100">
    <div class="card-body py-3">
      <div class="d-flex justify-content-between align-items-center mb-2">
        <h2 class="h6 mb-0">Upcoming Deadlines</h2>
        <!-- Dropdown -->
        <div class="dropdown">
          <button class="btn btn-light rounded-pill dropdown-toggle px-3" data-bs-toggle="dropdown" aria-expanded="false">
            {{selectedOption}}
          </button>
          <ul class="dropdown-menu dropdown-menu-end" >
            <li><button class="dropdown-item" @click="selectedOption = 'Day'">Day</button></li>
            <li><button class="dropdown-item" @click="selectedOption = 'Week'">Week</button></li>
            <li><button class="dropdown-item" @click="selectedOption = 'Month'">Month</button></li>
          </ul>
        </div>
        <!-- Dropdown -->
      </div>

      <div class="d-flex flex-column gap-2">
        <assessment-card
            v-for="t in tasks" :key="t.id"
            :assessment-name=" t.title"
            :assessment-date="new Date(t.date)"
            assessment-course="CSCI2170 - Server-Side Scripting"
            :gradient = t.gradient
        />
        <a href="#" class="text-decoration-none small align-self-end">View all</a>
      </div>

    </div>
  </div>
</template>


<style scoped>

</style>