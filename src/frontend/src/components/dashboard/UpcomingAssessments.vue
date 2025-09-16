<script setup lang="ts">

import AssessmentCard from "@/components/cards/AssessmentCard.vue";
import {computed, onMounted, ref} from "vue";
import type {Task} from "@/utils/interfaces.ts";
import EditTaskModal from "@/components/modals/EditTaskModal.vue";
import DeleteTaskModal from "@/components/modals/DeleteTaskModal.vue";
import {defaultTask} from "@/utils/defaults.ts";





const tasks = defineModel<Task[]>('tasks',{required:true})

type selectOptions = "Day" | "Week" | "Month";

const selectedOption = ref<selectOptions>('Week');



onMounted(async () => {



})


const filteredTasks =  computed<Task[]>(()=>{

  let currentDay = new Date(Date.now())
  let currentDayOfWeek = currentDay.getDay();

  let firstDayOfWeek = new Date(currentDay);
  let lastDayOfWeek = null;

  if (currentDayOfWeek !== 0 ){
    firstDayOfWeek.setDate(firstDayOfWeek.getDate() - currentDayOfWeek )
  }

  lastDayOfWeek = new Date(firstDayOfWeek);
  lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 6)

  if (!tasks?.value) return [];

  let filter:Task[] = tasks.value.filter((task) => {

    let taskDay = new Date(task.due);

    switch (selectedOption.value) {

      case 'Day':
        debugger
        return (currentDay.toDateString() === taskDay.toDateString());

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


const taskData = ref<Task>(defaultTask)

async function deleteTask(taskData:Task) {

  let index = tasks.value.findIndex((x)=> {
    return x.id == taskData.id
  })

  tasks.value.splice(index,1);
}

async function editTask(saveData:Task) {

  let index = tasks.value.findIndex((x)=> {
    return x.id == saveData.id
  })

  if ( index !== -1){
    tasks.value.splice(index,1,saveData);
  }
}

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

      <div class="d-flex flex-column gap-2 overflow-y-auto position-relative" style="max-height: 34vh">
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
            @edit-task="(n:Task)=> taskData = n"
            @delete-task="(n:Task) => taskData = n"
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

  <!-- Edit Modal  -->
  <edit-task-modal  :modalData="taskData" @edit-task="editTask"></edit-task-modal>
  <delete-task-modal  :modal-data="taskData" @delete-task="deleteTask"></delete-task-modal>

</template>


<style scoped>

</style>