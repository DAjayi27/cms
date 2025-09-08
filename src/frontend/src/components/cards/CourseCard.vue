<script setup lang="ts">
interface Props {
  status?: string
  statusVariant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark'
  title: string
  term: string
  description?: string
  endedAt?: string
  imgSrc?: string
}

const props = withDefaults(defineProps<Props>(), {
  status: 'Open',
  statusVariant: 'primary',
  description: 'hELLO',
  endedAt: ''
})
</script>

<template>
  <div class="card border-0 shadow-sm h-100" style="border-radius: .75rem; overflow: hidden;">
    <!-- Image -->
    <img v-if="props.imgSrc" :src="props.imgSrc" class="card-img-top" alt="Course image" />
    <div v-else class="bg-light d-flex align-items-center justify-content-center" style="height: 120px;">
      <span class="text-muted">No Image</span>
    </div>

    <!-- Body -->
    <div class="card-body">
      <!-- Status -->
      <span v-if="props.status" class="badge mb-2" :class="'text-bg-' + props.statusVariant">
        {{ props.status }}
      </span>

      <!-- Title -->
      <h6 class="card-title mb-1">{{ props.title }}</h6>

      <!-- Term -->
      <p class="mb-1 text-muted small">{{ props.term }}</p>

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
