<script setup lang="ts">

import type {Course, Task} from "@/utils/interfaces.ts";
import {fetchData} from "@/utils/fetch.ts";

const props = defineProps<{ modalData: Course }>()
const emit = defineEmits<{
  (e: 'cancel'): void
  (e: 'delete-course', value: Course): void
}>()

async function handleDelete() {

  // Delete all related tasks.

  const taskRes =  await fetchData(`/api/tasks/course/${props.modalData.id}`,'DELETE');

  if (!taskRes.ok){
    alert('Error Occurred while deleting associated tasks');
  }


  const res = await fetchData(`/api/courses/${props.modalData.id}` , 'DELETE');

  if (res.ok){
    emit('delete-course',props.modalData)
  }else{
    alert('Error Occurred while deleting Course');
  }

}

</script>

<template>
  <div
      class="modal fade"
      id="deleteCourseModal"
      tabindex="-1"
      aria-labelledby="deleteTaskLabel"
      aria-hidden="true"
      ref="modalEl"
      v-if="modalData"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 id="deleteTaskLabel" class="modal-title">Delete Course?</h5>
          <button type="button" class="btn-close" aria-label="Close" data-bs-dismiss="modal"></button>
        </div>

        <div class="modal-body">
          <p class="mb-0">
            Are you sure you want to delete
            <template v-if="props.modalData?.title && props.modalData.name">
              <strong>{{props.modalData.title}} - {{ props.modalData.name }}</strong>
            </template>
            <template v-else>
              this course
            </template>
            ?.
            <strong> This will also delete all related tasks.</strong>
            This action cannot be undone.
          </p>

        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
          <!-- No data-bs-dismiss: only close after confirm handler runs -->
          <button type="button" class="btn btn-danger" data-bs-dismiss="modal"  @click="handleDelete">
<!--            <span v-if="isBusy" class="spinner-border spinner-border-sm me-1" role="status" aria-hidden="true"></span>-->
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

