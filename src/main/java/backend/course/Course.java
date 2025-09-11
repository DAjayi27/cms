package backend.course;

import backend.utils.CourseStatus;
import backend.utils.Priority;
import backend.utils.Term;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Column;
import org.springframework.data.relational.core.mapping.Table;

import java.util.Objects;

@Table("course")
public class Course {

    @Id
    @Column("id")
    private Long id;

    @Column("title")
    private String title;

    @Column("name")
    private String name;

    @Column("priority")
    private Priority priority;

    @Column("term")
    private Term term;    // fall/WINTER/SPRING/summer

    @Column("year")
    private int year;     // e.g., 2025

    @Column("status")
    private CourseStatus status;

    public Course() {}

    public Course(String title, String name, Priority priority, Term term, int year,CourseStatus status) {
        this.title = title;
        this.name = name;
        this.priority = priority;
        this.term = term;
        this.year = year;
        this.status = status;
    }

    // getters/setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public Priority getPriority() { return priority; }
    public void setPriority(Priority priority) { this.priority = priority; }

    public Term getTerm() { return term; }
    public void setTerm(Term term) { this.term = term; }

    public int getYear() { return year; }
    public void setYear(int year) { this.year = year; }

    public CourseStatus getStatus() {
        return status;
    }

    public void setStatus(CourseStatus status) {
        this.status = status;
    }

    @Override public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Course)) return false;
        Course that = (Course) o;
        return id != null && Objects.equals(id, that.id);
    }
    @Override public int hashCode() { return (id == null) ? System.identityHashCode(this) : id.hashCode(); }
    @Override public String toString() {
        return "Course{id=" + id + ", title='" + title + "', name='" + name +
                "', priority=" + priority + ", term=" + term + ", year=" + year + "}";
    }
}
