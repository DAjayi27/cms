<script setup lang="ts">
import {toTitle} from "@/utils/functions.ts";
import {CourseStatusVariant, PriorityVariant, TaskStatusVariant} from "@/utils/utils.ts";

interface Props {
  status: string
  title: string
  name:string
  term: string
  year: number
  description?: string
  endedAt?: string
  imgSrc?: string
  // CourseCard.vue props
  priority?: string
}

const props = withDefaults(defineProps<Props>(), {
  status: 'Open',
  statusVariant: 'primary',
  priority: '',
  priorityVariant: 'secondary',
  description: '',
  endedAt: ''
})

</script>

<template>
  <div class="card border-0 shadow-sm h-100" style="border-radius: .75rem; overflow: hidden;">
    <!-- Image -->
    <div class="position-relative">
      <img v-if="props.imgSrc" :src="props.imgSrc" class="card-img-top" alt="Course image" />
      <div v-else class="bg-light d-flex align-items-center justify-content-center" style="height: 120px;">
        <span class="text-muted">No Image</span>
      </div>
      <span
          v-if="props.status"
          class="badge position-absolute start-0 top-0 m-2"
          :class="'text-bg-' + CourseStatusVariant.get(props.status)"
      >
        {{toTitle(props.status)}}
      </span>
    </div>
    <!-- Body -->
    <div class="card-body">
      <!-- Status -->
      <div v-if="props.priority" class="mb-2 d-flex flex-wrap gap-1">
        <span class="badge" :class="'text-bg-' + PriorityVariant.get(props.priority)">{{ toTitle(props.priority) }}</span>
      </div>

      <!-- Title -->
      <h6 class="card-title mb-1">{{`${props.title} - ${props.name} - ${props.year} ${toTitle(props.term)}`}}</h6>

      <!-- Term -->
      <p class="mb-1 text-muted small">{{ `${props.year} ${toTitle(props.term)}`}}</p>

      <!-- Description -->
      <p v-if="props.description" class="mb-1 small">{{ props.description }}</p>

      <!-- End Date -->
      <small v-if="props.endedAt" class="text-muted">Ended {{ props.endedAt }}</small>
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
