<script setup lang="ts">
import {ref, watch, toRef, onBeforeMount, useTemplateRef} from 'vue'
import type { Priority, TaskStatus } from '@/utils/utils.ts'
import type {Course, Task} from '@/utils/interfaces.ts'
import {fetchData} from "@/utils/fetch.ts";
import * as bootstrap from 'bootstrap';

// Optional prefill values (e.g., when adding from a specific course)
const props = defineProps<{ prefill?: Partial<Task> }>()
const emit = defineEmits<{ (e: 'cancel'): void; (e: 'addTask', value: Task): void }>()

const activeCourses = ref<Course[]>([]);

// Local form with safe defaults for "Add"

let defaultVals = {
  id: null,           // parent can assign on save
  name: '',
  courseId: null,            // optional depending on your Task shape
  courseName: '',
  due: '',                        // use "due" to match Tasks.vue dataset
  priority: 'medium' as Priority,
  status: 'not_started' as TaskStatus,
  modalTarget: '#editTaskModal',
};

const form = ref<Task>( defaultVals as unknown as Task)

const formElement = useTemplateRef('form-element');


// Hydrate from prefill when provided
const prefillRef = toRef(props, 'prefill')
watch(prefillRef, (p) => {
  if (!p) return
  form.value = { ...form.value, ...p, modalTarget: '#addTaskModal' } as Task
}, { immediate: true, deep: true })

async function onAddTask() {

  const modalElement =  document.getElementById('addTaskModal')

  const formEl = formElement.value
  if (!formEl || !modalElement) return

  // Show Bootstrap validation UI right away
  formEl.classList.add('was-validated')

  if (!formEl.checkValidity()) {
    // Focus the first invalid control for better UX
    formEl.querySelector<HTMLElement>(':invalid')?.focus()
    return
  }

  let res = await fetchData('/api/tasks','POST',form.value);

  let data = await res.json();


  // Emit a copy (avoid mutating upstream refs)
  emit('addTask', data)

  // Clear fields (or formEl.reset() if you prefer)
  form.value.name = ''
  form.value.courseId = null
}


onBeforeMount(async ()=>{
  let res = await fetchData('api/courses/active' , 'GET');
  activeCourses.value = await res.json();
})


</script>

<template>
  <div class="modal fade" id="addTaskModal" tabindex="-1" aria-hidden="true" ref="modalElement">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="addTaskModal-label">Add Task</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="emit('cancel')"></button>
        </div>

        <div class="modal-body">
          <form @submit.prevent class="" novalidate ref="form-element">
            <div class="row g-3">
              <!-- Name -->
              <div class="col-12">
                <label for="add-task-name" class="form-label">Name</label>
                <input id="add-task-name" v-model="form.name" type="text" class="form-control" placeholder="Task name" required/>
              </div>

              <div class="col-12">
                <label for="task-course" class="form-label">Course <small class="text-danger"> *You Can Only Edit Course Name in the course page* </small> </label>
                <!--                <input id="task-course" v-model="form.courseName" type="text" class="form-control" placeholder="e.g. CSCI2170 - Server-Side Scripting" disabled/>-->
                <select id="task-course" v-model="form.courseId" class="form-select" required>
                  <option v-for="course in activeCourses" :value="course.id">{{course.title}} - {{course.name}}</option>
                </select>
              </div>

              <!-- Due date -->
              <div class="col-12 col-md-6">
                <label for="add-task-due" class="form-label">Due date</label>
                <input id="add-task-due" v-model="form.due" type="datetime-local" class="form-control" required/>
                <div class="form-text">Format: YYYY-MM-DDTHH:mm</div>
              </div>

              <!-- Priority -->
              <div class="col-6 col-md-3">
                <label for="add-task-priority" class="form-label">Priority</label>
                <select id="add-task-priority" v-model="form.priority" class="form-select" required>
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <!-- Status -->
              <div class="col-6 col-md-3">
                <label for="add-task-taskStatus" class="form-label">Status</label>
                <select id="add-task-taskStatus" v-model="form.status" class="form-select" required>
                  <option value="not_started">Not Started</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>
          </form>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="emit('cancel')">Cancel</button>
          <button type="button" class="btn btn-primary" @click="onAddTask">Add task</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.form-label { font-weight: 600; }
</style>
