<script setup lang="ts">

  const props =  defineProps({
    title:String,
    value:String
  })

</script>

<template>
  <div class="card border-0 shadow-sm rounded-4 py-2">
    <div class="card-body py-2">
      <div class="text-body-secondary small">{{props.title}}</div>
      <div class="fs-4 fw-bold">{{props.value}}</div>
    </div>
  </div>
</template>

<style scoped>

</style>