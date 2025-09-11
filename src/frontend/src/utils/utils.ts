export type TaskColumns = "due" | "priority" | "course" | "name" | "status";
export type TaskColOptions = Priority | Status;

export const PriorityArray = ["high", "low", "medium", "all"] as const;
export type Priority = typeof PriorityArray[number];

export const StatusArray = ["not-started", "completed", "in-progress","all"] as const;
export type Status = typeof StatusArray[number];

export type Direction = "asc" | "desc";



export const PriorityRank = new Map<Priority, number>([
    ['low', 0],
    ['medium', 1],
    ['high', 2],
]);

export const StatusRank = new Map<Status, number>([
    ['not-started', 0],
    ['in-progress', 1],
    ['completed', 2]
])

export const PriorityVariant = new Map<Priority, String>([
    ['low', 'info'],
    ['medium', 'warning'],
    ['high', 'danger'],
])

export const StatusVariant = new Map<Status, String>([
    ['not-started', 'secondary'],
    ['completed', 'success'],
    ['in-progress', 'warning'],
    ['all', 'danger'],
])



