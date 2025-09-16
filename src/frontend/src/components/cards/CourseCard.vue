<script setup lang="ts">
import {toTitle} from "@/utils/functions.ts";
import {CourseStatusVariant, PriorityVariant} from "@/utils/utils.ts";
import type {Course} from "@/utils/interfaces.ts";



const props = withDefaults(defineProps<Course>(), {
  status: 'active',
  priority: 'low',
  description: '',
  endedAt: ''
})


const emits = defineEmits<{ (e: 'cancel'): void; (e: 'deleteCourse', value: Course): void }>();


</script>

<template>
  <div class="card border-0 bg-body-secondary h-100" style="border-radius: .75rem; overflow: hidden;">
    <!-- Image -->
    <div class="position-relative">
      <img v-if="props.imgSrc" :src="props.imgSrc" class="card-img-top" alt="Course image" />
      <div v-else class="bg-light d-flex align-items-center justify-content-center" style="height: 120px;">
        <span class="text-muted">No Image</span>
      </div>
      <span
          v-if="props.status"
          class="badge position-absolute start-0 top-0 m-2"
          :class="'text-bg-' + CourseStatusVariant[props.status]"
      >
        {{toTitle(props.status)}}
      </span>
    </div>
    <!-- Body -->
    <div class="card-body">
      <!-- Status -->
      <div v-if="props.priority" class="mb-2 d-flex flex-wrap gap-1">
        <span class="badge" :class="'text-bg-' + PriorityVariant[props.priority]">{{ toTitle(props.priority) }}</span>
      </div>

      <!-- Title -->
      <h6 class="card-title mb-1">{{`${props.title} - ${props.name} - ${props.year} ${toTitle(props.term)}`}}</h6>

      <!-- Term -->
      <p class="mb-1 text-muted small">{{ `${props.year} ${toTitle(props.term)}`}}</p>

      <!-- Description -->
      <p v-if="props.description" class="mb-1 small">{{ props.description }}</p>

      <!-- End Date -->
      <small v-if="props.endedAt" class="text-muted">Ended {{ props.endedAt }}</small>

      <div class="d-flex justify-content-end mt-2">
        <button type="button" class="btn btn-outline-danger btn-sm" data-bs-target="#deleteCourseModal"
                data-bs-toggle ="modal" @click="$emit('deleteCourse',props)"
        >
          <i class="bi bi-trash me-1"></i> Delete
        </button>
      </div>

    </div>

  </div>
</template>

<style scoped>
.card-title {
  font-size: 0.95rem;
  font-weight: 600;
}


img.card-img-top {
  height: 90px;
  object-fit: cover;
}

</style>
