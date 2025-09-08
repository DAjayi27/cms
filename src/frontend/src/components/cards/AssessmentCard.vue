<script setup lang="ts">

const props = defineProps({

  assessmentName: String,
  assessmentCourse: String,
  assessmentDate: Date,
  gradient:String

});

</script>

<template>
  <div  class="mini-task">
    <div class="d-flex align-items-center gap-2">

      <!--  Icon  -->
      <div class="mini-task-icon position-relative" :style="{ background: gradient }"></div>
      <!--  Icon  -->

      <!--  content  -->
      <div class="flex-grow-1 overflow-hidden">
        <div class="fw-semibold text-truncate">{{ props.assessmentName }}</div>
        <small class="text-body-secondary text-truncate d-block">
          <template v-if="props.assessmentCourse">{{ props.assessmentCourse }}</template>
          <template v-if="props.assessmentCourse && props.assessmentDate"> • </template>
          <template v-if="props.assessmentDate">{{ props.assessmentDate }}</template>
        </small>
      </div>
      <!--  content  -->

      <button class="btn btn-link p-0 text-muted" aria-label="More"><i class="bi bi-three-dots-vertical"></i></button>
    </div>
  </div>

</template>

<style scoped>


*{
  font-family: Inter;
}

p{
  color:#A5B4CB ;
}

.mini-task { background: #fff; border-radius: .5rem; box-shadow: var(--bs-box-shadow-sm); padding: .5rem .5rem; color: black }
.mini-task-icon { width: 42px; height: 42px; border-radius: .5rem; }
</style>