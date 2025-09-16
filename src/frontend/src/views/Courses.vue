<script setup lang="ts">
import {computed, onMounted, ref} from 'vue'
import CourseCard from '@/components/cards/CourseCard.vue'
import {fetchData} from "@/utils/fetch.ts";
import type {Course} from "@/utils/interfaces.ts";
import AddCourseModal from "@/components/modals/AddCourseModal.vue";
import {toTitle} from "../utils/functions.ts";
import type {CourseStatus, Term} from "@/utils/utils.ts";
import DeleteCourseModal from "@/components/modals/DeleteCourseModal.vue";
import {defaultCourse, defaultTask} from "@/utils/defaults.ts";


let list = ref<Course[]>( []);


onMounted(async () => {

  list.value = await getApiData();

})


// Filters
const q = ref('')
const courseStatus = ref<CourseStatus>('all')
const term = ref<Term>('all')
const showClosed = ref<boolean>(false);

// Build term options from the data
const termOptions = computed(() => {
  const set = new Set(list.value.map(c => c.term))
  return ['All', ...Array.from(set)]
})

const filtered = computed<Course[]>(() => {

  const query = q.value.trim().toLowerCase()

  let tempList = list.value.filter(c => {
    const matchesQuery = !query || c.title.toLowerCase().includes(query) || c.term.toLowerCase().includes(query)
    const matchesStatus = courseStatus.value === 'all' || c.status === courseStatus.value
    const matchesTerm = term.value === 'all' || c.term === term.value
    return matchesQuery && matchesStatus && matchesTerm
  })

  if (!showClosed.value){

    tempList = tempList.filter((val) => val.status !== 'closed');

  }

  return tempList;
})


async function getApiData(  ):Promise<Course[]> {

  let res;

  try {
    res = await fetchData('/api/courses','GET');

    let data:Course[] = await res.json();

    data.forEach((value) => {

      value.imgSrc = 'https://picsum.photos/id/22/640/320';

    });

    return data;

  }
  catch (e) {
    console.error('error loading data');
  }

  return [];
}

function addNewCourse(course:Course) {

  list.value.push(course);

}

function deleteCourse(course:Course) {

  let courseIndex = list.value.findIndex((val) => val.id === course.id);

  if (courseIndex !== -1 ){
    list.value.splice(courseIndex,1);
  }

}

const modalData =  ref<Course>(defaultCourse);


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
        <div class="btn btn-primary" data-bs-target="#createCourseModal" data-bs-toggle="modal" >+ Add Course</div>
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
            <select id="courses-taskStatus" v-model="courseStatus" class="form-select">
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="closed">Closed</option>
              <option value="upcoming">Upcoming</option>data-bs-dismiss="modal"
            </select>
          </div>
          <div class="col-6 col-md-3 col-lg-2">
            <label class="form-label" for="courses-term">Term</label>
            <select id="courses-term" v-model="term" class="form-select">
              <option v-for="t in termOptions" :key="t" :value="t">{{ toTitle(t) }}</option>
            </select>
          </div>
          <div class="col-6 col-md-3 col-lg-2">
            <div class="form-check mt-4">
              <input type="checkbox" class="btn-check" id="btn-check" autocomplete="off" v-model="showClosed">
              <label class="btn btn-primary" for="btn-check">Show Closed</label>
            </div>
          </div>
          <div class="col-12 col-lg d-flex gap-2 justify-content-end mt-2 mt-lg-0">
            <button class="btn btn-outline-secondary" @click="q=''; courseStatus='all'; term='all'">Reset</button>
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
              :id = "c.id"
              :status="c.status"
              :title="c.title"
              :name="c.name"
              :term="c.term"
              :year="c.year"
              :ended-at="c.endedAt"
              :img-src="c.imgSrc"
              :priority="c.priority"
              @delete-course = "( course )=> {modalData = course} "
          />
        </RouterLink>
      </div>

    </div>

    <!-- Empty state -->
    <div v-if="filtered.length === 0" class="text-center text-body-secondary py-5">
      <p class="mb-1">No courses match your filters.</p>
      <button class="btn btn-outline-secondary" @click="q=''; courseStatus='all'; term='all'">Clear filters</button>
    </div>
  </div>

<!--  Add Course Modal-->
  <add-course-modal @add-course="addNewCourse"></add-course-modal>
<!--  Delete Course Modal-->
  <delete-course-modal :modal-data="modalData" @delete-course="deleteCourse"></delete-course-modal>
</template>

<style scoped>
/* Make cards feel consistent */
:deep(.card-img-top){ object-fit: cover; height: 140px; }
</style>
