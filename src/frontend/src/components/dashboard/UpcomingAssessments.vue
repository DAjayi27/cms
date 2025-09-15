<script setup lang="ts">

import AssessmentCard from "@/components/cards/AssessmentCard.vue";
import {computed, onMounted, ref} from "vue";
import type {Task} from "@/utils/interfaces.ts";
import {fetchData} from "@/utils/fetch.ts";


const tasks = ref<Task[]>([]);

type selectOptions = "Day" | "Week" | "Month";

const selectedOption = ref<selectOptions>('Week');



onMounted(async () => {

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

})


const filteredTasks =  computed<Task[]>(()=>{

  let currentDay = new Date(Date.now())
  let currentDayOfWeek = currentDay.getDay();

  let firstDayOfWeek = currentDay;
  let lastDayOfWeek = null;

  if (currentDayOfWeek !== 0 ){
    firstDayOfWeek.setDate(firstDayOfWeek.getDate() - currentDayOfWeek )
  }

  lastDayOfWeek = firstDayOfWeek;
  lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 6)

  if (!tasks.value) return [];

  let filter:Task[] = tasks.value.filter((task) => {

    let taskDay = new Date(task.due);

    switch (selectedOption.value) {

      case 'Day':
        return (currentDay === taskDay);

      case 'Week':
        return ( taskDay >= firstDayOfWeek && taskDay <= lastDayOfWeek  )

      case 'Month':
        return (taskDay.getMonth() === currentDay.getMonth())

      default:
        return false;
    }




  })


  return filter;


})




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

      <div class="d-flex flex-column gap-2 overflow-y-auto" style="max-height: 34vh">
        <assessment-card
            v-for="t in filteredTasks.slice(0,5)" :key="t.id"
            :id="t.id"
            :name="t.name"
            :priority="t.priority"
            :status="t.status"
            :course-title="t.courseTitle"
            :course-name="t.courseName"
            :course-id="t.courseId"
            :due="t.due"
        />
        <div v-if="filteredTasks.length === 0">
          <div class="text-center text-body-secondary py-4">No tasks due this {{selectedOption.toLowerCase()}}.</div>
        </div>
      </div>
      <div class="d-flex flex-column gap-2">
        <RouterLink :to="{name:'tasks'}" class="text-decoration-none small align-self-end">View all</RouterLink>
      </div>


    </div>
  </div>
</template>


<style scoped>

</style>