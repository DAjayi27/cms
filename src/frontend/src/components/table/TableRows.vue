<script setup lang="ts">


import { PriorityVariant, TaskStatusVariant} from "@/utils/utils.ts";
import {formatDate, toTitle} from "@/utils/functions.ts";
import type {Task} from "@/utils/interfaces.ts";

const props = defineProps<Task>()





</script>

<template>
  <tr>
    <td class="fw-semibold text-truncate">{{ props.name }}</td>
    <td class="text-truncate">{{ `${props.courseTitle} - ${props.courseName}` }}</td>
    <td><span class="text-body-secondary">{{ formatDate(props.due) }}</span></td>
    <td>
      <span class="badge" :class="'text-bg-' + PriorityVariant[props.priority]">{{ toTitle(props.priority) }}</span>
    </td>
    <td>
      <span class="badge" :class="'text-bg-' + TaskStatusVariant[props.status]">{{ toTitle(props.status) }}</span>
    </td>
    <td class="text-end">
      <div class="btn-group">
        <button class="btn btn-sm btn-outline-secondary" data-bs-target="#editTaskModal" data-bs-toggle="modal" @click="$emit('edit-task',props)">Edit</button>
        <button class="btn btn-sm btn-outline-danger" data-bs-target="#deleteTaskModal" data-bs-toggle="modal" @click="$emit('delete-task',props)">Delete</button>
      </div>
    </td>
  </tr>

</template>

<style scoped>

</style>