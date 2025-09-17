<script setup lang="ts">

import {FontAwesomeIcon} from "@fortawesome/vue-fontawesome";
import type {Task} from "@/utils/interfaces.ts";
import {defaultTask} from "@/utils/defaults.ts";
import {formatDate, toTitle} from "@/utils/functions.ts";
import {TaskStatusVariant} from "@/utils/utils.ts";
import {onMounted} from "vue";
import {Dropdown} from "bootstrap";


const props = defineProps<Task>();

function generateGradient():string {

  const colourOptionsA = ["#ff7a18","#7f00ff","#ff6a88","#00b4db"];
  const colourOptionsB = ["#af002d","#00d4ff","#ff99ac","#0083b0"];

  let minA = 0;
  let maxA = colourOptionsA.length-1;

  let randA = Math.floor(Math.random() * (maxA - minA + 1)) + minA;


  let minB = 0;
  let maxB = colourOptionsB.length-1;

  let randB = Math.floor(Math.random() * (maxB - minB + 1)) + minB;

  let style = `linear-gradient(135deg, ${colourOptionsA[randA]}, ${colourOptionsB[randB]})`
  return style;

}

</script>

<template>
  <div  class="mini-task">
    <div class="d-flex align-items-center gap-2">

      <!--  Icon  -->
      <div class="mini-task-icon position-relative" :style="{ background: generateGradient() }"></div>
      <!--  Icon  -->

      <!--  content  -->
      <div class="flex-grow-1 overflow-hidden">
        <div class="fw-semibold text-truncate">
          {{ props.name }}
          <span class="badge rounded-pill" :class="'text-bg-' + TaskStatusVariant[props.status]">{{ toTitle(props.status) }}</span>
        </div>
        <small class="text-body-secondary text-truncate d-block">
          <template v-if="props.courseTitle && props.courseName">{{props.courseTitle}} - {{props.courseName}}</template>
          <template v-if="props.courseName && props.due"> • </template>
          <template v-if="props.due">{{ formatDate(props.due) }}</template>

        </small>
      </div>
      <!--  content  -->
      <div class="btn-group">
        <button class="btn btn-sm btn-outline-secondary" data-bs-target="#editTaskModal" data-bs-toggle="modal" @click="$emit('edit-task',props)">Edit</button>
        <button class="btn btn-sm btn-outline-danger" data-bs-target="#deleteTaskModal" data-bs-toggle="modal" @click="$emit('delete-task',props)">Delete</button>
      </div>
    </div>
  </div>

</template>

<style scoped>


p{
  color:#A5B4CB ;
}

.mini-task {border-radius: .5rem; box-shadow: var(--bs-box-shadow-sm); padding: .5rem .5rem;}
.mini-task-icon { width: 42px; height: 42px; border-radius: .5rem; }
</style>