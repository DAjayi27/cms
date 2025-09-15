export type TaskColumns = "due" | "priority" | "course" | "name" | "status";
export type TaskColOptions = Priority | TaskStatus;

export type FilterOptions =  "priority" | "status" | "none";
export type FilterValue = Priority | TaskStatus;

export const PriorityArray = ["high", "low", "medium", "all"] as const;
export type Priority = typeof PriorityArray[number];

export const TaskStatusArray = ["not_started", "completed", "in_progress","all"] as const;
export type TaskStatus = typeof TaskStatusArray[number];

export const CourseStatusArray = ['active' , 'closed' , 'upcoming' ,"all"] as const;
export type CourseStatus = typeof CourseStatusArray[number];

export type Direction = "asc" | "desc";


export const TermArray = ["all","winter" , "summer" , "spring" ,"fall"] as const;

export type Term = typeof TermArray[number];



export const PriorityRank:Record<Priority, number> = {
    'low':0,
    'medium':1,
    'high':2,
    'all':3
}


export const TaskStatusRank:Record<TaskStatus, number> = {
    'not_started': 0,
    'in_progress': 1,
    'completed': 2,
    'all': 3
}

export const PriorityVariant:Record<Priority, String> = {
    'low':'primary',
    'medium': 'warning',
    'high': 'danger',
    'all':'info'
}


export const CourseStatusVariant:Record<CourseStatus, string> = {
    'active': 'success',
    'closed': 'secondary',
    'upcoming': 'warning',
    'all': 'danger',
}



export const TaskStatusVariant:Record<TaskStatus, string> = {
    'not_started': 'secondary',
    'completed': 'success',
    'in_progress': 'warning',
    'all': 'danger',
}





