<script setup lang="ts">
import { ref, computed } from 'vue'
import CourseCard from '@/components/cards/CourseCard.vue'
import StatsCard from "@/components/dashboard/StatsCard.vue";
import CalendarWidget from "@/components/dashboard/CalendarWidget.vue";
import UpcomingAssessments from "@/components/dashboard/UpcomingAssessments.vue";

// Keep data minimal so everything fits without scrolling
const userName = 'Daniel'

const courses = ref([
  { id: 'csci2122', status: 'Closed', statusVariant: 'secondary', title: 'CSCI2122 - Systems Programming', term: '2024/2025 Winter', endedAt: 'May 7, 2025', imgSrc: 'https://picsum.photos/seed/sysprog/640/320?grayscale' },
  { id: 'csci2170', status: 'Active', statusVariant: 'success', title: 'CSCI2170 - Server-Side Scripting', term: '2025 Summer', imgSrc: 'https://picsum.photos/seed/sss/640/320' },
  { id: 'csci2115', status: 'Active', statusVariant: 'success', title: 'CSCI2115 - Theory of Computation', term: '2025 Summer', imgSrc: 'https://picsum.photos/seed/toc/640/320' },
])


const coursesTop = computed(() => courses.value.slice(0, 3))

function onAddTask() {}
function onAddCourse() {}
</script>

<template>
  <!-- Fit the screen under the navbar: parent layout should set main area to flex-grow-1 -->
  <div class="dashboard container-fluid d-flex flex-column h-100 overflow-hidden px-3 px-sm-4 py-3">
    <!-- Header (compact) -->
    <div class="d-flex justify-content-between align-items-center mb-2">
      <div>
        <h1 class="h5 mb-0 text-primary">Hi {{ userName }}, quick overview</h1>
        <small class="text-body-secondary">No-scroll dashboard layout</small>
      </div>
      <div class="d-flex gap-2">
        <button class="btn btn-outline-secondary btn-sm" @click="onAddCourse">+ Course</button>
        <button class="btn btn-primary btn-sm" @click="onAddTask">+ Task</button>
      </div>
    </div>

    <!-- Content grid that fits available height -->
    <div class="d-grid gap-3" style="grid-template-rows: auto auto 1fr; min-height: 0;">
      <!-- Stats (compact) -->
      <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-3">
        <div class="col">
          <stats-card class="h-100" title="Active Courses" :value="courses.filter(c => c.status !== 'Closed').length.toString()" />
        </div>
        <div class="col">
          <stats-card class="h-100" title="Tasks (wk)" value="7" />
        </div>
        <div class="col">
          <stats-card class="h-100" title="Deadlines" value="3" />
        </div>
      </div>

      <!-- Deadlines + Calendar (compact) -->
      <div class="row g-3 align-items-stretch" style="min-height: 0;">
        <div class="col-12 col-lg-8">
          <upcoming-assessments></upcoming-assessments>
        </div>
        <div class="col-12 col-lg-4">
          <calendar-widget/>
        </div>
      </div>

      <!-- Courses (compact, single row) -->
      <div class="card border-0 shadow-sm rounded-4 flex-grow-1 overflow-hidden">
        <div class="card-body py-3 d-flex flex-column">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <h2 class="h6 mb-0">Courses</h2>
            <router-link :to="{name:'courses'}" class="text-decoration-none small">View all</router-link>
          </div>
          <div class="row g-1 course-card-compact" style="flex: 1 1 auto;">
            <div class="col" v-for="c in coursesTop" :key="c.id">
              <CourseCard
                  :status="c.status"
                  :status-variant="c.statusVariant"
                  :title="c.title"
                  :term="c.term"
                  :ended-at="c.endedAt"
                  :img-src="c.imgSrc"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>



</style>
