<script setup lang="ts">
import {onBeforeMount, ref, toRef, watch} from 'vue'
import type { Priority, TaskStatus } from '@/utils/utils.ts'
import type {Course, Task} from "@/utils/interfaces.ts";
import {fetchData} from "@/utils/fetch.ts";



const props = defineProps<{ modalData?: Task }>()
const emit = defineEmits<{
  (e: 'cancel'): void
  (e: 'edit-task', value: Task): void
}>()

const activeCourses = ref<Course[]>([]);

// Local form (safe defaults so nothing is undefined)
const form = ref<Task>({
  name: '',
  courseName: '',
  date: '',
  courseId: 0,
  priority: 'medium' as Priority,
  status: 'not_started' as TaskStatus,
})

const modalDataRef = toRef(props, 'modalData')

// ✅ Sync from prop now and whenever modalData changes
watch(modalDataRef,
  (m) => { if (m) form.value = { ...form.value, ...m } },
  { immediate: true, deep: true }
)

async function onSave() {

  let res = await fetchData(`api/tasks/${form.value.id}`,'PUT',form.value);

  let updatedData:Task = await res.json()

  emit('edit-task', updatedData)
}

onBeforeMount(async ()=>{
  let res = await fetchData('api/courses/active' , 'GET');
  activeCourses.value = await res.json();
})
</script>

<template>
  <div class="modal fade" id="editTaskModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <!-- (optional) bind the label id if you need it elsewhere -->
          <h1 class="modal-title fs-5" id="editTaskModal-label">Edit Task</h1>
          <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click="emit('cancel')"
          ></button>
        </div>

        <div class="modal-body">
          <form @submit.prevent>
            <div class="row g-3">
              <div class="col-12">
                <label for="task-name" class="form-label">Name</label>
                <input id="task-name" v-model="form.name" type="text" class="form-control" placeholder="Task name" />
              </div>

              <div class="col-12">
                <label for="task-course" class="form-label">Course <small class="text-danger"> *You Can Only Edit Course Name in the course page* </small> </label>
<!--                <input id="task-course" v-model="form.courseName" type="text" class="form-control" placeholder="e.g. CSCI2170 - Server-Side Scripting" disabled/>-->
                <select id="task-course" v-model="form.courseId" class="form-select">
                  <option v-for="course in activeCourses" :value="course.id">{{course.title}} - {{course.name}}</option>
                </select>
              </div>

              <div class="col-12 col-md-6">
                <label for="task-date" class="form-label">Due date</label>
                <input id="task-date" v-model="form.due" type="datetime-local" class="form-control" />
                <div class="form-text">Format: YYYY-MM-DDTHH:mm</div>
              </div>

              <!-- keep your existing selects if they’re defined elsewhere -->
              <div class="col-6 col-md-3">
                <label for="task-priority" class="form-label">Priority</label>
                <select id="task-priority" v-model="form.priority" class="form-select">
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div class="col-6 col-md-3">
                <label for="task-status" class="form-label">Status</label>
                <select id="task-status" v-model="form.status" class="form-select">
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
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="onSave">Save changes</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.form-label { font-weight: 600; }
</style>
