<script setup lang="ts">

import type {Course} from "@/utils/interfaces.ts";
import {ref, useTemplateRef} from "vue";
import { CourseStatusArray,  PriorityArray, TermArray} from "@/utils/utils.ts";
import {toTitle} from "@/utils/functions.ts";
import { computed } from 'vue'
import {fetchData} from "@/utils/fetch.ts";
import Modal from 'bootstrap/js/dist/modal'

const defaultVals:Course = {
  id: undefined,
  title: '',
  status: 'active',
  name: '',
  term: 'fall',
  year: 2025,
  description: '',
  endedAt: '',
  imgSrc: '',
  priority: 'low'

}

const emit = defineEmits<{ (e: 'cancel'): void; (e: 'addCourse', value: Course): void }>();

const form = useTemplateRef('form');




const priorityArr = computed(() => PriorityArray.filter(p => p !== 'all'))

const statusArr = computed(() => CourseStatusArray.filter(p => p !== 'all'))

let course = ref<Course>(defaultVals)

async function onAddCourse() {

  const modalEl:any = document.querySelector('#createCourseModal');
  const modal = Modal.getInstance(modalEl);

  if (!form.value) {return;}

  form.value.classList.add('was-validated');


  if (form.value.checkValidity()){

    let data:Course = course.value;

    const res = await fetchData('api/courses','POST',data);

    if (res.ok){
      let createdCourse:Course = await res.json();
      emit('addCourse',createdCourse);
    }

    if (!createOtherTasks.value && modal){
      modal.hide()
      modal.dispose();
      document.querySelector('.modal-backdrop')?.remove();
      document.querySelector('.modal-backdrop')?.remove();
    }

  }


}

const createOtherTasks = ref<boolean>(false);

document.addEventListener('hidden.bs.modal',()=>{

  course.value.name = ''
  course.value.id = undefined;
  course.value.title = '';

  // Show Bootstrap validation UI right away
  form.value?.classList.remove('was-validated')
})

</script>

<template>
  <div
      class="modal fade"
      id="createCourseModal"
      tabindex="-1"
      aria-labelledby="createCourseLabel"
      aria-hidden="true"
      ref="modalEl"
  >
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="addTaskModal-label">Add Course</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="emit('cancel')"></button>
        </div>

        <div class="modal-body">
          <form @submit.prevent class="" novalidate ref="form">
            <div class="row g-3">
              <!-- Name -->
              <div class="col-12">
                <label for="add-task-name" class="form-label">Course Title</label>
                <input id="add-task-name" v-model="course.title" type="text" class="form-control" placeholder="CSCI 2122" required/>
              </div>

              <div class="col-12">
                <label for="task-course" class="form-label">Course Name</label>
                <input id="add-task-name" v-model="course.name" type="text" class="form-control" placeholder="Systems Programming" required/>
              </div>

              <!-- Year -->
              <div class="col-6 col-md-3">
                <label for="add-task-priority" class="form-label">Year</label>
                <input id="add-task-name" v-model="course.year" type="text" class="form-control" placeholder="2025" required/>
              </div>

              <!-- Term -->
              <div class="col-6 col-md-3">
                <label for="add-task-priority" class="form-label">Term</label>
                <select id="add-task-priority" v-model="course.term" class="form-select" required>
                  <option v-for="term in TermArray"  :value="term"> {{toTitle(term)}} </option>
                </select>
              </div>


              <!-- Priority -->
              <div class="col-6 col-md-3">
                <label for="add-task-priority" class="form-label">Priority</label>
                <select id="add-task-priority" v-model="course.priority" class="form-select" required>
                  <option v-for="priority in priorityArr" :value="priority">{{toTitle(priority)}}</option>
                </select>
              </div>

              <!-- Status -->
              <div class="col-6 col-md-3">
                <label for="add-task-taskStatus" class="form-label">Status</label>
                <select id="add-task-taskStatus" v-model="course.status" class="form-select" required>
                  <option v-for="status in statusArr" :value="status">{{toTitle(status)}}</option>
                </select>
              </div>
            </div>
          </form>
        </div>

        <div class="modal-footer">
          <div class="form-check me-auto">
            <input class="form-check-input" type="checkbox" value="" id="checkDefault" v-model="createOtherTasks">
            <label class="form-check-label" for="checkDefault">
              Create Other Courses
            </label>
          </div>
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="emit('cancel')">Cancel</button>
          <button type="button" class="btn btn-primary" @click="onAddCourse">Add task</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>