<script setup lang="ts">

</script>

<template>
  <div
      class="modal fade"
      id="deleteTaskModal"
      tabindex="-1"
      aria-labelledby="deleteTaskLabel"
      aria-hidden="true"
      ref="modalEl"
  >
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 id="deleteTaskLabel" class="modal-title">Delete task?</h5>
          <button type="button" class="btn-close" aria-label="Close" data-bs-dismiss="modal"></button>
        </div>

        <div class="modal-body">
          <p class="mb-0">
            Are you sure you want to delete
            <template v-if="props.modalData?.name">
              <strong>{{ props.modalData.name }}</strong>
            </template>
            <template v-else>
              this task
            </template>
            ?
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


<style scoped>

</style>