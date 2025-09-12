export type TaskColumns = "due" | "priority" | "course" | "name" | "status";
export type TaskColOptions = Priority | TaskStatus;

export const PriorityArray = ["high", "low", "medium", "all"] as const;
export type Priority = typeof PriorityArray[number];

export const TaskStatusArray = ["not_started", "completed", "in_progress","all"] as const;
export type TaskStatus = typeof TaskStatusArray[number];

export const CourseStatusArray = ['active' , 'closed' , 'upcoming' ,"all"] as const;
export type CourseStatus = typeof TaskStatusArray[number];

export type Direction = "asc" | "desc";


export const TermArray = ["winter" , "summer" , "spring" ,"fall"] as const;

export type Term = typeof TermArray[number];



export const PriorityRank = new Map<Priority, number>([
    ['low', 0],
    ['medium', 1],
    ['high', 2],
]);

export const TaskStatusRank = new Map<TaskStatus, number>([
    ['not_started', 0],
    ['in_progress', 1],
    ['completed', 2]
])

export const PriorityVariant = new Map<Priority, String>([
    ['low', 'info'],
    ['medium', 'warning'],
    ['high', 'danger'],
])


export const CourseStatusVariant = new Map<TaskStatus, String>([
    ['closed', 'secondary'],
    ['active', 'success'],
    ['upcoming', 'warning'],
    ['all', 'danger'],
])

export const TaskStatusVariant = new Map<TaskStatus, String>([
    ['not_started', 'secondary'],
    ['completed', 'success'],
    ['in_progress', 'warning'],
    ['all', 'danger'],
])



