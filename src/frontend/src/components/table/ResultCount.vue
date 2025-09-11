<script setup lang="ts">
interface Props {
  shown: number
  total: number
  noun?: string // e.g., "results", "tasks", etc.
  small?: boolean // render as small, muted text
}

const props = withDefaults(defineProps<Props>(), {
  noun: 'results',
  small: false,
})
</script>

<template>
  <div :class="['result-count', small ? 'small text-body-secondary' : '']">
    Showing <strong>{{ shown }}</strong> of <strong>{{ total }}</strong> {{ noun }}
  </div>
</template>

<style scoped>
.result-count { line-height: 1.25; }
</style>
