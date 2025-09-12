# REST API

Base URL: `/api`

## Courses

| Method | Path | Description |
| ------ | ---- | ----------- |
| GET | `/courses` | List all courses |
| GET | `/courses/active` | List courses not marked `closed` |
| GET | `/courses/{id}` | Fetch a single course by ID |
| POST | `/courses` | Create a course from request body |
| PUT | `/courses/{id}` | Partially update a course; only provided fields are applied |

### Course model
```json
{
  "id": number,
  "title": string,
  "name": string,
  "priority": "low" | "medium" | "high",
  "term": "fall" | "winter" | "spring" | "summer",
  "year": number,
  "status": "active" | "closed" | "upcoming"
}
```

## Tasks

| Method | Path | Description |
| ------ | ---- | ----------- |
| GET | `/tasks` | List tasks joined with their courses, ordered by due date |
| GET | `/tasks/active` | Same as above but filters out tasks linked to closed courses |
| POST | `/tasks` | Create a task; response includes joined course info |
| PUT | `/tasks/{id}` | Partially update a task by ID |
| DELETE | `/tasks/{id}` | Remove a task by ID |

### Task model
```json
{
  "id": number,
  "name": string,
  "courseId": number,
  "due": "YYYY-MM-DDTHH:mm",
  "priority": "low" | "medium" | "high",
  "status": "not_started" | "in_progress" | "completed"
}
```

Task endpoints often return the `TaskWithCourse` projection, which adds `courseTitle`, `courseName`, `coursePriority`, `courseTerm` and `courseYear` from the joined course record.
