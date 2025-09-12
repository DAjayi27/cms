<script setup lang="ts">
import {computed, onBeforeMount, ref} from 'vue'
import TableRows from "@/components/table/TableRows.vue";
import type {Task} from "@/utils/interfaces.ts";
import {
  type Direction,
  PriorityArray,
  PriorityRank, TaskStatusArray, TaskStatusRank,
  type TaskColOptions,
  type TaskColumns
} from "@/utils/utils.ts";

import ResultCount from "@/components/table/ResultCount.vue";
import {toTitle} from "../utils/functions.ts";
import rawTasks from'@/files/tasks.json'
import EditTaskModal from "@/components/modals/EditTaskModal.vue";
import AddTaskModal from "@/components/modals/AddTaskModal.vue";
import {fetchData} from "@/utils/fetch.ts";
import DeleteTaskModal from "@/components/modals/DeleteTaskModal.vue";



const fetched = ref<Task[]>([]) // child-owned data

function filterTasksByQuery(searchQuery:String ,  tasks:Task[]):Task[]{

  searchQuery = searchQuery.toLowerCase();

  return tasks.filter( (task) => {

    if (task.name.toLowerCase().includes(searchQuery) || task.courseName.toLowerCase().includes(searchQuery)){
      return task;
    }

  });
}

function sortTasksByOption(sortOption: TaskColumns, sortDirection:Direction , tasks: Task[]):Task[] {

  return tasks.sort((a, b) => {

    switch (sortOption) {
      case "course":
        if (sortDirection === 'asc') {
          return (a.courseName < b.courseName) ? -1 : 1;
        } else if (sortDirection === 'desc') {
          return (a.courseName < b.courseName) ? 1 : -1;

        }
        break;

      case "due":
        let dateA = new Date(a.due);
        let dateB = new Date(b.due);
        if (sortDirection === 'asc') {
          return (dateA < dateB) ? -1 : 1;
        } else if (sortDirection === 'desc') {
          return (dateA < dateB) ? 1 : -1;
        }
        break;

      case "priority":
        let aRank = PriorityRank.get(a.priority);
        let bRank = PriorityRank.get(b.priority);
        if (sortDirection === 'asc') {
          return (aRank < bRank) ? -1 : 1;
        } else if (sortDirection === 'desc') {
          return (aRank < bRank) ? 1 : -1;
        }
        break

      case "name":
        if (sortDirection === 'asc') {
          return (a.name < b.name) ? -1 : 1;
        } else if (sortDirection === 'desc') {
          return (a.name < b.name) ? 1 : -1;
        }
        break

      case "status":
        let aStatusRank = TaskStatusRank.get(a.status);
        let bStatusRank = TaskStatusRank.get(b.status);
        if (sortDirection === 'asc') {
          return (aStatusRank < bStatusRank) ? -1 : 1;
        } else if (sortDirection === 'desc') {
          return (aStatusRank < bStatusRank) ? 1 : -1;
        }
        break
    }

  });

}

function filterTasksByOption(filterOption:TaskColumns , filterValue: TaskColOptions , tasks:Task[]):Task[]{

 return tasks.filter( (task) => {

   if (filterValue === "all"){
     return task
   }

   if (task[filterOption] === filterValue){
     return task;
   }

 });

}

// Ref Variables //
const searchQuery = ref<string>('');
const sortOption = ref<TaskColumns>('all')
const sortDirection = ref<Direction>('asc')

const filterOption = ref<TaskColumns>('')
const filterValue = ref<TaskColOptions>('');

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

  if (filterOption.value === '') return [];

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
  sortOption.value = ''
  sortDirection.value = ''
  filterValue.value = ''
  filterOption.value = ''
}

// onBeforeMount(()=>{
//
//   fetched.value = rawTasks;
//
// })

const taskData = ref<Task>()

async function taskEditHandler(saveData:Task) {




  let index = fetched.value.findIndex((x)=> {
    return x.id == updatedData.id
  })

  if ( index !== -1){
    fetched.value.splice(index,1,updatedData);
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
              <option value="">None</option>
              <option value="priority">Priority</option>
              <option value="status">Status</option>
            </select>
          </div>
          <div class="col-6 col-md-2 col-lg-2">
            <label for="sortDir" class="form-label">Value</label>
            <select id="sortDir" v-model="filterValue" class="form-select">
              <option :value="optionValue" v-for=" optionValue in filterOptionVals">{{toTitle(optionValue)}}</option>
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
                :modal-target = "'#editTaskModal'"
                @edit-task="(n)=> taskData = n"
                @delete-task="(n) => taskData = n"
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
  <edit-task-modal  :modalData="taskData" @edit-task="taskEditHandler"></edit-task-modal>
<!--  Add Modal-->
  <add-task-modal @add-task="addNewTask"></add-task-modal>
  <delete-task-modal :modal-data="taskData" @delete-task="deleteTask"></delete-task-modal>
</template>

<style scoped>
.table th button { color: inherit; }
.table th button:hover { text-decoration: underline; }
</style>
