<script setup lang="ts">

import type {Course, Task} from "@/utils/interfaces.ts";
import {ref, toRef, useTemplateRef, watch} from "vue";
import { CourseStatusArray,  PriorityArray, TermArray} from "@/utils/utils.ts";
import {toTitle} from "@/utils/functions.ts";
import { computed } from 'vue'
import {fetchData} from "@/utils/fetch.ts";
import Modal from 'bootstrap/js/dist/modal'
import {defaultCourse, defaultTask} from "@/utils/defaults.ts";

const priorityArr = computed(() => PriorityArray.filter(p => p !== 'all'))

const statusArr = computed(() => CourseStatusArray.filter(p => p !== 'all'))

const props = defineProps<{ modalData: Course }>()

const emit = defineEmits<{
  (e: 'cancel'): void
  (e: 'edit-course', value: Course): void
}>()

const form = ref<Course>(defaultCourse)
const formEl = useTemplateRef('formEl');
const modalDataRef = toRef(props, 'modalData')


watch(modalDataRef,
    (m) => { if (m) form.value = { ...form.value, ...m } },
    { immediate: true, deep: true }
)


async function onSave() {

  let modalEl:any =  document.querySelector('#editCourseModal')
  const modal = Modal.getInstance(modalEl);

  if (!formEl.value) {return;}

  formEl.value.classList.add('was-validated');

  if (formEl.value.checkValidity()){

    debugger;

    let res = await fetchData(`/api/courses/${form.value.id}`,'PUT',form.value);

    if (res.ok) {
      let updatedData: Course = await res.json()
      emit('edit-course', updatedData)
    }

    if (modal){
      modal.hide()
      modal.dispose();
      document.querySelector('.modal-backdrop')?.remove();
    }


  }


}

//
// document.addEventListener('hidden.bs.modal',()=>{
//
//   course.value.name = ''
//   course.value.id = undefined;
//   course.value.title = '';
//
//   // Show Bootstrap validation UI right away
//   form.value?.classList.remove('was-validated')
// })

</script>

<template>
  <div
      class="modal fade"
      id="editCourseModal"
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
          <form @submit.prevent class="" novalidate ref="formEl">
            <div class="row g-3">
              <!-- Name -->
              <div class="col-12">
                <label for="add-task-name" class="form-label">Course Title</label>
                <input id="add-task-name" v-model="form.title" type="text" class="form-control" placeholder="CSCI 2122" required/>
              </div>

              <div class="col-12">
                <label for="task-course" class="form-label">Course Name</label>
                <input id="add-task-name" v-model="form.name" type="text" class="form-control" placeholder="Systems Programming" required/>
              </div>

              <!-- Year -->
              <div class="col-6 col-md-3">
                <label for="add-task-priority" class="form-label">Year</label>
                <input id="add-task-name" v-model="form.year" type="text" class="form-control" placeholder="2025" required/>
              </div>

              <!-- Term -->
              <div class="col-6 col-md-3">
                <label for="add-task-priority" class="form-label">Term</label>
                <select id="add-task-priority" v-model="form.term" class="form-select" required>
                  <option v-for="term in TermArray"  :value="term"> {{toTitle(term)}} </option>
                </select>
              </div>


              <!-- Priority -->
              <div class="col-6 col-md-3">
                <label for="add-task-priority" class="form-label">Priority</label>
                <select id="add-task-priority" v-model="form.priority" class="form-select" required>
                  <option v-for="priority in priorityArr" :value="priority">{{toTitle(priority)}}</option>
                </select>
              </div>

              <!-- Status -->
              <div class="col-6 col-md-3">
                <label for="add-task-taskStatus" class="form-label">Status</label>
                <select id="add-task-taskStatus" v-model="form.status" class="form-select" required>
                  <option v-for="status in statusArr" :value="status">{{toTitle(status)}}</option>
                </select>
              </div>
            </div>
          </form>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="emit('cancel')">Cancel</button>
          <button type="button" class="btn btn-primary" @click="onSave">Save changes</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>