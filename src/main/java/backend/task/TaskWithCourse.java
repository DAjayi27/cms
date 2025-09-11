package backend.task;

import backend.utils.TaskStatus;
import backend.utils.Term;
import backend.utils.Priority;

import java.time.LocalDateTime;

public class TaskWithCourse{
    private Long id;
    private String name;
    private LocalDateTime due;
    private Priority priority;
    private TaskStatus status;
    private Long courseId;

    private String courseTitle;    // from course.title
    private String courseName;     // from course.name
    private Priority coursePriority;
    private Term courseTerm;
    private int courseYear;

    public TaskWithCourse() {}  // REQUIRED for mapping

    // --- getters & setters ---
    public Long getId() { return id; }                      public void setId(Long id) { this.id = id; }
    public String getName() { return name; }                public void setName(String name) { this.name = name; }
    public LocalDateTime getDue() { return due; }           public void setDue(LocalDateTime due) { this.due = due; }
    public Priority getPriority() { return priority; }      public void setPriority(Priority priority) { this.priority = priority; }
    public TaskStatus getStatus() { return status; }            public void setStatus(TaskStatus taskStatus) { this.status = taskStatus; }
    public Long getCourseId() { return courseId; }          public void setCourseId(Long courseId) { this.courseId = courseId; }

    public String getCourseTitle() { return courseTitle; }  public void setCourseTitle(String courseTitle) { this.courseTitle = courseTitle; }
    public String getCourseName() { return courseName; }    public void setCourseName(String courseName) { this.courseName = courseName; }
    public Priority getCoursePriority() { return coursePriority; }  public void setCoursePriority(Priority coursePriority) { this.coursePriority = coursePriority; }
    public Term getCourseTerm() { return courseTerm; }      public void setCourseTerm(Term courseTerm) { this.courseTerm = courseTerm; }
    public int getCourseYear() { return courseYear; }       public void setCourseYear(int courseYear) { this.courseYear = courseYear; }
}
