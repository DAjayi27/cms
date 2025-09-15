<script setup lang="ts">
import {computed, onBeforeMount, ref} from 'vue'
import TableRows from "@/components/table/TableRows.vue";
import type {Task} from "@/utils/interfaces.ts";
import {
  type Direction,
  PriorityArray,
  PriorityRank, TaskStatusArray, TaskStatusRank,
  type TaskColumns, type FilterOptions, type FilterValue
} from "@/utils/utils.ts";

import ResultCount from "@/components/table/ResultCount.vue";
import {toTitle} from "../utils/functions.ts";
import EditTaskModal from "@/components/modals/EditTaskModal.vue";
import AddTaskModal from "@/components/modals/AddTaskModal.vue";
import {fetchData} from "@/utils/fetch.ts";
import DeleteTaskModal from "@/components/modals/DeleteTaskModal.vue";



const fetched = ref<Task[]>([]) // child-owned data

function filterTasksByQuery(searchQuery:string ,  tasks:Task[]):Task[]{

  searchQuery = searchQuery.toLowerCase();

  return tasks.filter( (task) => {

    if (task.name.toLowerCase().includes(searchQuery) || task.courseName.toLowerCase().includes(searchQuery)){
      return task;
    }

  });
}

function sortTasksByOption(sortOption: TaskColumns, sortDirection:Direction , tasks: Task[]):Task[] {

  const dir = sortDirection === "asc" ? 1 : -1;

  return tasks.sort((a, b) => {
    switch (sortOption) {
      case "course": {
        // strings
        return a.courseName.localeCompare(b.courseName) * dir;
      }

      case "name": {
        // strings
        return a.name.localeCompare(b.name) * dir;
      }

      case "due": {
        // dates → numbers
        const ta = new Date(a.due).getTime();
        const tb = new Date(b.due).getTime();
        return (ta - tb) * dir;
      }

      case "priority": {
        // numeric ranks; ensure defaults so it's always a number
        const ar = PriorityRank[a.priority];
        const br = PriorityRank[b.priority];
        return (ar - br) * dir;
      }

      case "status": {
        const ar = TaskStatusRank[a.status];
        const br = TaskStatusRank[b.status];
        return (ar - br) * dir;
      }
    }

    // If an unknown sortOption sneaks in, keep order unchanged
    return 0;
  });

}

function filterTasksByOption(filterOption:FilterOptions , filterValue: FilterValue , tasks:Task[]):Task[]{

 return tasks.filter( (task) => {

   if (filterValue === "all" || filterOption === "none"){
     return task
   }

   if (task[filterOption] === filterValue){
     return task;
   }

 });

}

// Ref Variables //
const searchQuery = ref<string>('');
const sortOption = ref<TaskColumns>('due')
const sortDirection = ref<Direction>('asc')

const filterOption = ref<FilterOptions>('none')
const filterValue = ref<FilterValue>('all');

onBeforeMount(async () => {

  let data = await fetchData('/api/tasks/active','GET');

  fetched.value = await data.json()


})

 const sortedTasks = computed<Task[]>(()=>{

   let tempTasks : Task[] = fetched.value; //@TODO (change this when db data gets added)

   if (searchQuery){
     tempTasks = filterTasksByQuery(searchQuery.value , tempTasks);
   }

   if (sortOption.value){
      tempTasks = sortTasksByOption(sortOption.value , sortDirection.value , tempTasks);
   }

   if (filterOption.value){
     tempTasks = filterTasksByOption(filterOption.value,filterValue.value,tempTasks)
   }

   return tempTasks


 })

const filterOptionVals = computed(() => {

  if (filterOption.value === 'none') return [];

  switch (filterOption.value) {
    case 'priority':
      return PriorityArray;
    case 'status':
      return TaskStatusArray;
    default:
      return [];
  }

});


function setSort(column:TaskColumns) {

  sortOption.value = column;
  if (sortDirection.value === 'asc'){
    sortDirection.value = 'desc';
  }
  else{
    sortDirection.value = 'asc';
  }
}

function arrowFor(column:TaskColumns) {
  if (sortOption.value !== column){
    return '';
  }
  return sortDirection.value === 'asc' ? '▲' : '▼'
}

function resetFilterAndSort() {
  searchQuery.value = ''
  sortOption.value = 'due'
  sortDirection.value = 'asc'
  filterValue.value = 'all'
  filterOption.value = 'none'
}

// onBeforeMount(()=>{
//
//   fetched.value = rawTasks;
//
// })

const taskData = ref<Task>()

async function taskEditHandler(saveData:Task) {

  let index = fetched.value.findIndex((x)=> {
    return x.id == saveData.id
  })

  if ( index !== -1){
    fetched.value.splice(index,1,saveData);
  }



}


async function addNewTask(newTaskData:Task) {
  fetched.value.push(newTaskData);
}

async function deleteTask(taskData:Task) {

  let index = fetched.value.findIndex((x)=> {
    return x.id == taskData.id
  })

  fetched.value.splice(index,1);
}


</script>

<template>
  <div class="container-fluid px-3 px-sm-4 py-3 py-sm-4">
    <!-- Header -->
    <div class="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3 mb-sm-4">
      <div>
        <h1 class="h4 mb-1">Tasks</h1>
        <p class="text-body-secondary mb-0">Browse, search, and sort your tasks. Priority mirrors the course priority.</p>
      </div>
      <div  class="btn btn-primary" data-bs-target="#addTaskModal" data-bs-toggle="modal">+ Add Task</div>
    </div>

    <!-- Controls -->
    <div class="card border-0 shadow-sm rounded-4 mb-3">
      <div class="card-body">
        <div class="row g-2 align-items-end">
          <div class="col-12 col-md-5 col-lg-4">
            <label for="q" class="form-label">Search</label>
            <input id="q" v-model="searchQuery" type="search" class="form-control" placeholder="Search by task or course" />
          </div>
          <div class="col-6 col-md-3 col-lg-2">
            <label for="sortBy" class="form-label">Filter by</label>
            <select id="sortBy" v-model="filterOption" class="form-select">
              <option value="none">None</option>
              <option value="priority">Priority</option>
              <option value="status">Status</option>
            </select>
          </div>
          <div class="col-6 col-md-2 col-lg-2">
            <label for="sortDir" class="form-label">Value</label>
            <select id="sortDir" v-model="filterValue" class="form-select">
              <option :value="opt" v-for=" opt in filterOptionVals" >{{toTitle(opt)}}</option>
            </select>
          </div>
          <div class="col-12 col-md d-flex justify-content-end mt-2 mt-md-0">
            <button class="btn btn-outline-secondary" @click="resetFilterAndSort">Reset</button>
          </div>
        </div>
      </div>
    </div>

    <result-count :shown="sortedTasks.length" :total="fetched.length" :small="true"/>
    <!-- Table/List -->
    <div class="card border-0 shadow-sm rounded-4">
      <div class="card-body p-0">
        <div class="table-responsive">
          <table class="table align-middle mb-0">
            <thead class="table-light">
            <tr>
              <th scope="col">
                <button class="btn btn-link p-0 text-decoration-none" @click="setSort('name')">Task {{ arrowFor('name') }}</button>
              </th>
              <th scope="col" style="min-width: 220px;">
                <button class="btn btn-link p-0 text-decoration-none" @click="setSort('course')">Course {{ arrowFor('course') }}</button>
              </th>
              <th scope="col" style="min-width: 160px;">
                <button class="btn btn-link p-0 text-decoration-none" @click="setSort('due')">Due {{ arrowFor('due') }}</button>
              </th>
              <th scope="col" style="width: 140px;">
                <button class="btn btn-link p-0 text-decoration-none" @click="setSort('priority')">Priority {{ arrowFor('priority') }}</button>
              </th>
              <th scope="col" style="width: 140px;">
                <button class="btn btn-link p-0 text-decoration-none" @click="setSort('status')">Status {{ arrowFor('status') }}</button>
              </th>
              <th scope="col" class="text-end" style="width: 60px;">Actions</th>
            </tr>
            </thead>
            <tbody>
              <table-rows v-for="task in sortedTasks"
                :id = "task.id"
                :name = "task.name"
                :course-name = "task.courseName"
                :course-title="task.courseTitle"
                :course-id = "task.courseId"
                :due = "task.due"
                :priority = "task.priority"
                :status = "task.status"
                @edit-task="(n:Task)=> taskData = n"
                @delete-task="(n:Task) => taskData = n"
              />
            <tr v-if="fetched.length === 0">
              <td colspan="5" class="text-center text-body-secondary py-4">No tasks found.</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>


<!-- Edit Modal  -->
  <edit-task-modal v-if="taskData"  :modalData="taskData" @edit-task="taskEditHandler"></edit-task-modal>
<!--  Add Modal-->
  <add-task-modal @add-task="addNewTask"></add-task-modal>
  <delete-task-modal v-if="taskData" :modal-data="taskData" @delete-task="deleteTask"></delete-task-modal>
</template>

<style scoped>
.table th button { color: inherit; }
.table th button:hover { text-decoration: underline; }
</style>
