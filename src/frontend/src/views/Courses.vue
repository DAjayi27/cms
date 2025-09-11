<script setup lang="ts">
import {computed, onBeforeMount, ref} from 'vue'
import CourseCard from '@/components/cards/CourseCard.vue'
import {fetchData} from "@/utils/fetch.ts";
import type {Course} from "@/utils/interfaces.ts";

// Optional: accept courses from parent/state; if none provided, use local mock



const localCourses = ref<Course[]>([
  {
    id: 'csci2122',
    taskStatus: 'Closed',
    statusVariant: 'secondary',
    priority: 'High',
    priorityVariant: 'danger',
    title: 'CSCI2122 - Systems Programming (Sec 1 & 2) - 2024/2025 Winter',
    term: '2024/2025 Winter',
    endedAt: 'May 7, 2025 at 11:59 PM',
    imgSrc: 'https://picsum.photos/seed/sysprog/640/320?grayscale'
  },
  {
    id: 'csci2170',
    taskStatus: 'Active',
    statusVariant: 'success',
    priority: 'Medium',
    priorityVariant: 'warning',
    title: 'CSCI2170 - Server-Side Scripting - 2025 Summer',
    term: '2025 Summer',
    imgSrc: 'https://picsum.photos/seed/sss/640/320'
  },
  {
    id: 'csci2115',
    taskStatus: 'Active',
    statusVariant: 'success',
    priority: 'Low',
    priorityVariant: 'secondary',
    title: 'CSCI2115 - Theory of Computation - 2025 Summer',
    term: '2025 Summer',
    imgSrc: 'https://picsum.photos/seed/toc/640/320'
  },
  {
    id: 'csci1105',
    taskStatus: 'Upcoming',
    statusVariant: 'warning',
    priority: 'Medium',
    priorityVariant: 'info',
    title: 'CSCI1105 - Intro to Programming - 2026 Winter',
    term: '2026 Winter',
    imgSrc: 'https://picsum.photos/seed/intro/640/320'
  }
])


let list = ref<Course>( []);

onBeforeMount(async () => {

  list.value = await getApiData();

})


// Filters
const q = ref('')
const taskStatus = ref<'All' | 'Active' | 'Closed' | 'Upcoming'>('All')
const term = ref<'All' | string>('All')

// Build term options from the data
const termOptions = computed(() => {
  const set = new Set(list.value.map(c => c.term))
  return ['All', ...Array.from(set)]
})

const filtered = computed<Course[]>(() => {
  const query = q.value.trim().toLowerCase()
  debugger;
  return list.value.filter(c => {
    const matchesQuery = !query || c.title.toLowerCase().includes(query) || c.term.toLowerCase().includes(query)
    const matchesStatus = taskStatus.value === 'All' || c.taskStatus === taskStatus.value
    const matchesTerm = term.value === 'All' || c.term === term.value
    return matchesQuery && matchesStatus && matchesTerm
  })
})


async function getApiData(  ) {

  let res;
  try {
    res = await fetchData('/api/courses','GET');

    let data:Course[] = await res.json();

    data.forEach((value) => {

      value.imgSrc = 'https://picsum.photos/id/22/640/320';

    });

    debugger;

    return data;

  }
  catch (e) {
    list.value = localCourses.value;
    alert('ERROR');
  }
}


</script>

<template>
  <div class="container-fluid h-100 px-3 px-sm-4 py-3 py-sm-4">
    <!-- Header -->
    <div class="d-flex flex-wrap justify-content-between align-items-center gap-2 mb-3 mb-sm-4">
      <div>
        <h1 class="h4 mb-1 text-primary">Courses</h1>
        <p class="text-body-secondary mb-0">Browse and manage your enrolled courses.</p>
      </div>
      <div>
        <RouterLink class="btn btn-primary" to="/courses/new">+ Add Course</RouterLink>
      </div>
    </div>

    <!-- Filters -->
    <div class="card border-0 shadow-sm rounded-4 mb-3">
      <div class="card-body">
        <div class="row g-2 align-items-end">
          <div class="col-12 col-md-6 col-lg-4">
            <label class="form-label" for="courses-search">Search</label>
            <input id="courses-search" v-model="q" type="search" class="form-control" placeholder="Search by title or term" />
          </div>
          <div class="col-6 col-md-3 col-lg-2">
            <label class="form-label" for="courses-taskStatus">Status</label>
            <select id="courses-taskStatus" v-model="taskStatus" class="form-select">
              <option>All</option>
              <option>Active</option>
              <option>Closed</option>
              <option>Upcoming</option>
            </select>
          </div>
          <div class="col-6 col-md-3 col-lg-2">
            <label class="form-label" for="courses-term">Term</label>
            <select id="courses-term" v-model="term" class="form-select">
              <option v-for="t in termOptions" :key="t">{{ t }}</option>
            </select>
          </div>
          <div class="col-12 col-lg d-flex gap-2 justify-content-end mt-2 mt-lg-0">
            <button class="btn btn-outline-secondary" @click="q=''; taskStatus='All'; term='All'">Reset</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Count -->
    <div class="d-flex justify-content-between align-items-center mb-2">
      <small class="text-body-secondary">Showing <strong>{{ filtered.length }}</strong> of {{ list.length }}</small>
    </div>

    <!-- Grid -->
    <div class="row g-3">
      <div v-for="c in filtered" :key="c.id" class="col-12 col-md-6 col-lg-4">
        <!-- Wrap in RouterLink if you have a course detail route -->
        <RouterLink class="text-reset text-decoration-none" :to="{ name: 'course', params: { id: c.id } }">
          <CourseCard
              :status="c.status"
              :title="c.title"
              :name="c.name"
              :term="c.term"
              :year="c.year"
              :ended-at="c.endedAt"
              :img-src="c.imgSrc"
              :priority="c.priority"
              :priority-variant="c.priorityVariant"
          />
        </RouterLink>
      </div>
    </div>

    <!-- Empty state -->
    <div v-if="filtered.length === 0" class="text-center text-body-secondary py-5">
      <p class="mb-1">No courses match your filters.</p>
      <button class="btn btn-outline-secondary" @click="q=''; taskStatus='All'; term='All'">Clear filters</button>
    </div>
  </div>
</template>

<style scoped>
/* Make cards feel consistent */
:deep(.card-img-top){ object-fit: cover; height: 140px; }
</style>
