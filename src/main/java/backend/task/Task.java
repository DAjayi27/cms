package backend.task;

import backend.utils.Priority;
import backend.utils.Status;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;
import org.springframework.data.relational.core.mapping.Column;

import java.time.LocalDateTime;

/**
 * Spring Data JDBC aggregate root for the "task" table.
 */
@Table("task")
public class Task {

    @Id
    private Long id;

    private String name;

    @Column("course_id")
    private Long courseId;

    /** ISO local date-time: 2025-12-18T22:30 */
    private LocalDateTime due;

    private Priority priority;

    private Status status;

    public Task() {}

    public Task(String name, Long courseId, LocalDateTime due,
                Priority priority, Status status) {
        this.name = name;
        this.courseId = courseId;
        this.due = due;
        this.priority = priority;
        this.status = status;
    }

    // --- getters/setters ---
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public void setCourseId(Long courseId) {
        this.courseId = courseId;
    }

    public Long getCourseId() {
        return courseId;
    }

    public LocalDateTime getDue() { return due; }
    public void setDue(LocalDateTime due) { this.due = due; }

    public Priority getPriority() { return priority; }
    public void setPriority(Priority priority) { this.priority = priority; }

    public Status getStatus() { return status; }
    public void setStatus(Status status) { this.status = status; }
}
