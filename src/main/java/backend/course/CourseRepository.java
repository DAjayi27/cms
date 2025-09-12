package backend.course;

import backend.utils.Priority;
import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface CourseRepository extends CrudRepository<Course, Long> {

    // Search helpers
    List<Course> findByTitleContainingIgnoreCaseOrderByTitleAsc(String titlePart);
    List<Course> findByNameContainingIgnoreCaseOrderByNameAsc(String namePart);
    List<Course> findByPriorityOrderByTitleAsc(Priority priority);

    // Convenience
    boolean existsByTitleIgnoreCase(String title);
    long countByPriority(Priority priority);

    @Query("""
        SELECT * FROM course
        WHERE status != "closed"
        ORDER BY title;
     """)
    List<Course> findAllActiveCourses();

}
