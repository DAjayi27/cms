<script setup lang="ts">


import {type Priority, PriorityVariant, TaskStatusVariant} from "@/utils/utils.ts";
import type {TaskStatus} from "@/utils/utils.ts";
import {toTitle} from "@/utils/functions.ts";
import type {Task} from "@/utils/interfaces.ts";

const props = defineProps<Task>()

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
    <td class="text-truncate">{{ `${props.courseTitle} - ${props.courseName}` }}</td>
    <td><span class="text-body-secondary">{{ formatDate(props.due) }}</span></td>
    <td>
      <span class="badge" :class="'text-bg-' + PriorityVariant.get(props.priority)">{{ toTitle(props.priority) }}</span>
    </td>
    <td>
      <span class="badge" :class="'text-bg-' + TaskStatusVariant.get(props.status)">{{ toTitle(props.status) }}</span>
    </td>
    <td class="text-end">
      <div class="btn-group">
        <button class="btn btn-sm btn-outline-secondary" :data-bs-target="props.modalTarget" data-bs-toggle="modal" @click="$emit('open-modal',props)">Edit</button>
        <button class="btn btn-sm btn-outline-danger">Delete</button>
      </div>
    </td>
  </tr>

</template>

<style scoped>

</style>