<script setup lang="ts">



const props = defineProps({
  name:String,
  course:String,
  date:String,
  priority:String,
  priorityVariant:String
})

function formatDate(date:String) {
  let dateObj = new Date(date);

  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hourCycle: 'h12'
  };

  return dateObj.toLocaleDateString("en-GB",options );
}

</script>

<template>
  <tr>
    <td class="fw-semibold text-truncate">{{ props.name }}</td>
    <td class="text-truncate">{{ props.course }}</td>
    <td><span class="text-body-secondary">{{ formatDate(props.date) }}</span></td>
    <td>
      <span class="badge" :class="'text-bg-' + props.priorityVariant">{{ props.priority }}</span>
    </td>
    <td class="text-end">
      <div class="btn-group">
        <button class="btn btn-sm btn-outline-secondary">Edit</button>
        <button class="btn btn-sm btn-outline-danger">Delete</button>
      </div>
    </td>
  </tr>

</template>

<style scoped>

</style>