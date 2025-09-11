package backend.controllers;

import backend.task.Task;
import backend.task.TaskRepository;
import backend.task.TaskWithCourse;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private final TaskRepository repo;

    public TaskController (TaskRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<TaskWithCourse> list() {
        return repo.findAllWithCourse();
    }

    @PostMapping
    public TaskWithCourse create(@RequestBody Task t) {
        Task saved = repo.save(t);                // write via entity
        return repo.findOneWithCourse(saved.getId()).orElseThrow();
    }

    @PutMapping("/{id}")
    public TaskWithCourse update(@PathVariable long id, @RequestBody Task patch) {
        Task existing = repo.findById(id).orElseThrow();
        if (patch.getName() != null) existing.setName(patch.getName());
        if (patch.getCourseId() != null) existing.setCourseId(patch.getCourseId());
        if (patch.getDue() != null) existing.setDue(patch.getDue());
        if (patch.getPriority() != null) existing.setPriority(patch.getPriority());
        if (patch.getStatus() != null) existing.setStatus(patch.getStatus());
        Task saved =  repo.save(existing);
        return repo.findOneWithCourse(saved.getId()).orElseThrow();
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable long id) { repo.deleteById(id); }
}
