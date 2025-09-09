<script setup lang="ts">
import {computed, ref} from 'vue'
import TableRows from "@/components/table/TableRows.vue";
import type {Task} from "@/utils/interfaces.ts";
import {type Direction, PriorityRank, type SortOption} from "@/components/table/utils.ts";
import * as sea from "node:sea";

const localTasks = ref<Task[]>([
  { id: 1, name: 'Assignment 1: HTTP Forms',     courseId: 'csci2170', courseName: 'CSCI2170 - Server-Side Scripting', due: '2025-12-18T22:30', priority:'high'},
  { id: 2, name: 'Lab 3: Memory & Pointers',     courseId: 'csci2122', courseName: 'CSCI2122 - Systems Programming', due: '2025-12-14T20:30', priority:'low'},
  { id: 3, name: 'Quiz 2: Regular Languages',    courseId: 'csci2115', courseName: 'CSCI2115 - Theory of Computation', due: '2025-12-22T10:00' , priority:'medium'},
  { id: 4, name: 'Project Proposal',             courseId: 'csci2170', courseName: 'CSCI2170 - Server-Side Scripting', due: '2025-12-19T18:00' , priority:'high'},
  { id: 5, name: 'Reading: Chapter 4',           courseId: 'csci1105', courseName: 'CSCI1105 - Intro to Programming', due: '2025-12-20T08:30' , priority:'high'},
  { id: 6, name: 'Midterm Review Notes',         courseId: 'csci2122', courseName: 'CSCI2122 - Systems Programming', due: '2025-12-21T09:00' , priority:'low'},
])


interface Props {
  tasks : Task[]
}

const props = withDefaults(defineProps<Props>(), {
  tasks : []
})


function filterTasksByQuery(searchQuery:String ,  tasks:Task[]):Task[]{

  searchQuery = searchQuery.toLowerCase();

  return tasks.filter( (task) => {

    if (task.name.toLowerCase().includes(searchQuery) || task.courseName.toLowerCase().includes(searchQuery)){
      return task;
    }

  });
}

function filterTasksByOption(sortOption: SortOption, sortDirection:Direction , tasks: Task[]):Task[] {

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
    }

  });

}

// Ref Variables //
const searchQuery = ref<string>('');
const sortOption = ref<SortOption>('all')
const sortDirection = ref<Direction>('asc')

 const sortedTasks = computed(()=>{

   let tempTasks : Task[] = localTasks.value;

   if (searchQuery){
     tempTasks = filterTasksByQuery(searchQuery.value , tempTasks);
   }

   if (sortOption.value){
      tempTasks = filterTasksByOption(sortOption.value , sortDirection.value , tempTasks);
   }

   return tempTasks


 })


function setSort(column:SortOption) {

  sortOption.value = column;
  if (sortDirection.value === 'asc'){
    sortDirection.value = 'desc';
  }
  else{
    sortDirection.value = 'asc';
  }
}

function arrowFor(column:SortOption) {
  if (sortOption.value !== column){
    return '';
  }
  return sortDirection.value === 'asc' ? '▲' : '▼'
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
      <RouterLink to="/tasks/new" class="btn btn-primary">+ Add Task</RouterLink>
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
            <label for="sortBy" class="form-label">Sort by</label>
            <select id="sortBy" v-model="sortOption" class="form-select">
              <option value="due">Due date</option>
              <option value="priority">Priority</option>
              <option value="course">Course</option>
              <option value="name">Task name</option>
            </select>
          </div>
          <div class="col-6 col-md-2 col-lg-2">
            <label for="sortDir" class="form-label">Direction</label>
            <select id="sortDir" v-model="sortDirection" class="form-select">
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </select>
          </div>
          <div class="col-12 col-md d-flex justify-content-end mt-2 mt-md-0">
            <button class="btn btn-outline-secondary" @click="searchQuery=''; sortOption=''; sortDirection=''">Reset</button>
          </div>
        </div>
      </div>
    </div>

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
              <th scope="col" class="text-end" style="width: 60px;">Actions</th>
            </tr>
            </thead>
            <tbody>
              <table-rows v-for="task in sortedTasks"
                :name = "task.name"
                :course = "task.courseName"
                :date = "task.due"
                :priority = "task.priority"
                :priority-variant = "'danger'"
              />
            <tr v-if="localTasks.length === 0">
              <td colspan="5" class="text-center text-body-secondary py-4">No tasks found.</td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.table th button { color: inherit; }
.table th button:hover { text-decoration: underline; }
</style>
