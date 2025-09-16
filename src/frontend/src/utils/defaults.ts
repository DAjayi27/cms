import type {Course, Task} from "@/utils/interfaces.ts";
import type {CourseStatus, Priority, Term} from "@/utils/utils.ts";

export const defaultTask:Task = {
    id:undefined,
    name: '',
    courseName: '',
    courseTitle: '',
    due: '',
    courseId: undefined,
    priority: 'medium',
    status: 'not_started' ,
};


export const defaultCourse:Course={
    id: undefined,
    status: 'upcoming',
    title: '',
    name: '',
    term: 'fall',
    year: 2099,
    description: '',
    endedAt: '',
    imgSrc: '',
    priority: 'low'
}