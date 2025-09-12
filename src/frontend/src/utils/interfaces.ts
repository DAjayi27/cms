import type {CourseStatus, Priority, TaskStatus, Term} from "@/utils/utils.ts";

export interface Course {
    id: number
    status: CourseStatus
    title: string
    name:string
    term: Term
    year: number
    description?: string
    endedAt?: string
    imgSrc?: string
    priority?: Priority
}
export interface Task {
    id: number
    name: string
    courseId: number
    courseName: string,
    courseTitle:string,
    priority: Priority,
    status:TaskStatus,
    due: string // ISO-like string preferred (e.g., 2025-12-18T22:30)
    modalTarget: string
}
