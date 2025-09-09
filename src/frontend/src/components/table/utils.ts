export type SortOption = "due" | "priority" | "course" | "name";

export const PriorityRank = new Map<Priority, number>([
    ['low', 0],
    ['medium', 1],
    ['high', 2],
]);

export type Priority = "high" | "low" | "medium" | "all";

export type Direction = "asc" | "desc";

