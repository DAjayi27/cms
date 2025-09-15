import type {CourseStatus, Priority, TaskStatus, Term} from "@/utils/utils.ts";

export interface Course {
    id: number | undefined
    status: CourseStatus
    title: string
    name:string
    term: Term
    year: number
    description?: string
    endedAt?: string
    imgSrc?: string
    priority: Priority
}
export interface Task {
    id: number | undefined
    name: string
    courseId: number | undefined
    courseName: string,
    courseTitle:string,
    priority: Priority,
    status:TaskStatus,
    due: string // ISO-like string preferred (e.g., 2025-12-18T22:30)
}
