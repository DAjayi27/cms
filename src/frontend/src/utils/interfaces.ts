import type {Priority, Status} from "@/utils/utils.ts";

export interface Course {
    id: string | number
    title: string
    priority?: 'High' | 'Medium' | 'Low' | string
    priorityVariant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark'
}

export interface Task {
    id: string | number
    name: string
    courseId: string | number
    courseName: string,
    priority: Priority,
    status:Status,
    due: string // ISO-like string preferred (e.g., 2025-12-18T22:30)
    modalTarget: string
}
