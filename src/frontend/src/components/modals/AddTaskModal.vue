<script setup lang="ts">
import { ref, watch, toRef } from 'vue'
import type { Priority, Status } from '@/utils/utils.ts'
import type { Task } from '@/utils/interfaces.ts'

// Optional prefill values (e.g., when adding from a specific course)
const props = defineProps<{ prefill?: Partial<Task> }>()
const emit = defineEmits<{ (e: 'cancel'): void; (e: 'save', value: Task): void }>()

// Local form with safe defaults for "Add"
const form = ref<Task>({
  id: undefined as any,           // parent can assign on save
  name: '',
  courseId: '' as any,            // optional depending on your Task shape
  courseName: '',
  due: '',                        // use "due" to match Tasks.vue dataset
  priority: 'medium' as Priority,
  status: 'not-started' as Status,
  modalTarget: '#editTaskModal',
} as unknown as Task)

// Hydrate from prefill when provided
const prefillRef = toRef(props, 'prefill')
watch(prefillRef, (p) => {
  if (!p) return
  form.value = { ...form.value, ...p, modalTarget: '#addTaskModal' } as Task
}, { immediate: true, deep: true })

function onSave() {
  emit('save', { ...form.value })
}
</script>

<template>
  <div class="modal fade" id="addTaskModal" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="addTaskModal-label">Add Task</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" @click="emit('cancel')"></button>
        </div>

        <div class="modal-body">
          <form @submit.prevent>
            <div class="row g-3">
              <!-- Name -->
              <div class="col-12">
                <label for="add-task-name" class="form-label">Name</label>
                <input id="add-task-name" v-model="form.name" type="text" class="form-control" placeholder="Task name" />
              </div>

              <!-- Course (free text by default; swap to a select if you have a course list) -->
              <div class="col-12">
                <label for="add-task-course" class="form-label">Course</label>
                <input id="add-task-course" v-model="form.courseName" type="text" class="form-control" placeholder="e.g. CSCI2170 - Server-Side Scripting" />
              </div>

              <!-- Due date -->
              <div class="col-12 col-md-6">
                <label for="add-task-due" class="form-label">Due date</label>
                <input id="add-task-due" v-model="form.due" type="datetime-local" class="form-control" />
                <div class="form-text">Format: YYYY-MM-DDTHH:mm</div>
              </div>

              <!-- Priority -->
              <div class="col-6 col-md-3">
                <label for="add-task-priority" class="form-label">Priority</label>
                <select id="add-task-priority" v-model="form.priority" class="form-select">
                  <option value="low">Low</option>
                  <option value="medium">Medium</option>
                  <option value="high">High</option>
                </select>
              </div>

              <!-- Status -->
              <div class="col-6 col-md-3">
                <label for="add-task-status" class="form-label">Status</label>
                <select id="add-task-status" v-model="form.status" class="form-select">
                  <option value="not-started">Not Started</option>
                  <option value="in-progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>
          </form>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="emit('cancel')">Cancel</button>
          <button type="button" class="btn btn-primary" data-bs-dismiss="modal" @click="onSave">Add task</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.form-label { font-weight: 600; }
</style>
