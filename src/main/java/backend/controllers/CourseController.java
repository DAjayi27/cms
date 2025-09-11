package backend.controllers;

import backend.course.Course;
import backend.course.CourseRepository;
import backend.task.TaskRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/courses")
public class CourseController {

    private final CourseRepository repo;

    public CourseController (CourseRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Course> getCourses(){
        return (List<Course>) repo.findAll();
    }

    @GetMapping("/{id}")
    public Course getCourse(@PathVariable Long id ){
        return repo.findById(id).orElseThrow();
    }

    @PostMapping
    public Course create(@RequestBody Course courseData ){
        return repo.save(courseData);
    }

    @PutMapping("/{id}")
    public Course update(@PathVariable long id, @RequestBody Course patch) {

        Course existing = repo.findById(id).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Course not found")
        );

        // Optional: guard against mismatched IDs
        if (patch.getId() != null && !patch.getId().equals(id)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "ID in path and body differ");
        }

        // Apply only provided fields (leave others untouched)
        if (patch.getTitle() != null)    existing.setTitle(patch.getTitle());
        if (patch.getName() != null)     existing.setName(patch.getName());
        if (patch.getPriority() != null) existing.setPriority(patch.getPriority()); // Priority enum
        if (patch.getTerm() != null)     existing.setTerm(patch.getTerm());         // Term enum
        // year is an int in your entity; treat 0 as "no change"
        if (patch.getYear() != 0)        existing.setYear(patch.getYear());

        return repo.save(existing);      // <-- UPDATE
    }

}
