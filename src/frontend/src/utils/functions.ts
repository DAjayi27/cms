// Converts "high" -> "High", "in-progress" -> "In Progress",
// also handles "IN_PROGRESS" and "inProgress"
export function toTitle(input: string): string {
    return input
        .replace(/[-_]+/g, ' ')              // kebab/snake -> spaces
        .replace(/([a-z])([A-Z])/g, '$1 $2') // camelCase -> spaces
        .trim()
        .toLowerCase()
        .replace(/\b\w/g, c => c.toUpperCase());
}
