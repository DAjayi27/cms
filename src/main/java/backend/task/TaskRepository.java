package backend.task;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;


public interface TaskRepository extends CrudRepository<Task, Long> {

    @Query("""
        SELECT
          t.id, t.name, t.due, t.priority, t.status,
          t.course_id AS course_id,
          c.title     AS course_title,
          c.name      AS course_name,
          c.priority  AS course_priority,
          c.term      AS course_term,
          c.year      AS course_year
        FROM task t
        LEFT JOIN course c ON c.id = t.course_id
        ORDER BY t.due
        """)
    List<TaskWithCourse> findAllWithCourse();

    @Query("""
        SELECT
          t.id, t.name, t.due, t.priority, t.status,
          t.course_id AS course_id,
          c.title     AS course_title,
          c.name      AS course_name,
          c.priority  AS course_priority,
          c.term      AS course_term,
          c.year      AS course_year
        FROM task t
        LEFT JOIN course c ON c.id = t.course_id
        WHERE c.status != "closed"
        ORDER BY t.due
        """)
    List<TaskWithCourse> findAllWithActiveCourse();

    @Query("""
        SELECT
          t.id, t.name, t.due, t.priority, t.status,
          t.course_id AS course_id,
          c.title     AS course_title,
          c.name      AS course_name,
          c.priority  AS course_priority,
          c.term      AS course_term,
          c.year      AS course_year
        FROM task t
        LEFT JOIN course c ON c.id = t.course_id
        WHERE t.id = :id
        """)
    Optional<TaskWithCourse> findOneWithCourse(@Param("id") Long id);

    @Query("""
        SELECT
          t.id, t.name, t.due, t.priority, t.status,
          t.course_id AS course_id,
          c.title     AS course_title,
          c.name      AS course_name,
          c.priority  AS course_priority,
          c.term      AS course_term,
          c.year      AS course_year
        FROM task t
        LEFT JOIN course c ON c.id = t.course_id
        WHERE (:courseId IS NULL OR t.course_id = :courseId)
        ORDER BY t.due
        """)
    List<TaskWithCourse> findWithCourse(@Param("courseId") Long courseId);

    void deleteByCourseId(Long courseId);
}
