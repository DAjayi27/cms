<script setup lang="ts">
import {ref, computed, onMounted} from 'vue'
import CourseCard from '@/components/cards/CourseCard.vue'
import StatsCard from "@/components/dashboard/StatsCard.vue";
import CalendarWidget from "@/components/dashboard/CalendarWidget.vue";
import UpcomingAssessments from "@/components/dashboard/UpcomingAssessments.vue";
import type {Course, Task} from "@/utils/interfaces.ts";
import {fetchData, getActiveCourseData} from "@/utils/fetch.ts";
import AddTaskModal from "@/components/modals/AddTaskModal.vue";
import AddCourseModal from "@/components/modals/AddCourseModal.vue";

// Keep data minimal so everything fits without scrolling
const userName = 'Daniel'

const courses = ref<Course[]>([])
const tasks = ref<Task[]>([]);

onMounted(async () => {

  courses.value = await getActiveCourseData();

  try {
    let res = await fetchData('api/tasks/active','GET');

    let data:Task[] = await res.json();

    data.sort( (a, b) => {
      const ta = new Date(a.due).getTime();
      const tb = new Date(b.due).getTime();
      return (ta - tb);
    })

    tasks.value = data;
  }
  catch (e) {

  }

});

const coursesTop = computed(() => courses?.value.slice(0, 3))

function onAddTask() {}
function onAddCourse() {}

</script>

<template>
  <!-- Fit the screen under the navbar: parent layout should set main area to flex-grow-1 -->
  <div class="dashboard container-fluid d-flex flex-column h-100 overflow-hidden px-3 px-sm-4 py-3 ">
    <!-- Header (compact) -->
    <div class="d-flex justify-content-between align-items-center mb-2">
      <div>
        <h1 class="h5 mb-0 ">Hi {{ userName }}, quick overview</h1>
        <small class="text-body-secondary">No-scroll dashboard layout</small>
      </div>
      <div class="d-flex gap-2">
        <button class="btn btn-outline-success btn-sm" data-bs-target="#createCourseModal" data-bs-toggle="modal">+ Course</button>
        <button class="btn btn-primary btn-sm" data-bs-target="#addTaskModal" data-bs-toggle="modal">+ Task</button>
      </div>
    </div>

    <!-- Content grid that fits available height -->
    <div class="d-grid gap-3" style="grid-template-rows: auto auto 1fr; min-height: 0;">
      <!-- Stats (compact) -->
      <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-3">
        <div class="col">
          <stats-card class="h-100" title="Active Courses" :value="courses.filter(c => c.status !== 'closed').length.toString()" />
        </div>
        <div class="col">
          <stats-card class="h-100" title="Tasks (wk)" value="7" />
        </div>
        <div class="col">
          <stats-card class="h-100" title="Deadlines" value="3" />
        </div>
      </div>

      <!-- Deadlines + Calendar (compact) -->
      <div class="row g-3 align-items-stretch">
        <div class="col-12 col-lg-8" >
          <upcoming-assessments :tasks="tasks"></upcoming-assessments>
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
            <div class="col-4" v-for="c in coursesTop" :key="c.id">
              <CourseCard
                  :id ="c.id"
                  :priority ="c.priority"
                  :name = "c.name"
                  :description = "c.description"
                  :year = "c.year"
                  :status="c.status"
                  :title="c.title"
                  :term="c.term"
                  :img-src="c.imgSrc"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>


<!--  Modals-->
  <add-task-modal @add-task="(val) => {tasks.push(val)} "></add-task-modal>
  <add-course-modal @add-course="(val) => {courses.push(val)}"></add-course-modal>


</template>

<style scoped>



</style>
