import type {Task} from "@/utils/interfaces.ts";

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