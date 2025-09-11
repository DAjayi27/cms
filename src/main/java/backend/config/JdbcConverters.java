package backend.config;


import backend.utils.TaskStatus;
import backend.utils.Term;
import backend.utils.Priority;
import org.springframework.core.convert.converter.Converter;
import org.springframework.data.convert.ReadingConverter;
import org.springframework.data.convert.WritingConverter;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

/** ISO formatter like 2025-12-18T22:30 */
final class Iso {
    static final DateTimeFormatter FMT = DateTimeFormatter.ofPattern("yyyy-MM-dd'T'HH:mm");
    private Iso() {}
}

/* ----- LocalDateTime <-> TEXT ----- */
@WritingConverter
 class LocalDateTimeWriteConverter implements Converter<LocalDateTime, String> {
    @Override public String convert(LocalDateTime source) { return source == null ? null : source.format(Iso.FMT); }
}

@ReadingConverter
 class LocalDateTimeReadConverter implements Converter<String, LocalDateTime> {
    @Override public LocalDateTime convert(String source) { return (source == null || source.isBlank()) ? null : LocalDateTime.parse(source, Iso.FMT); }
}

/* ----- Priority enum <-> TEXT ----- */
@WritingConverter
 class PriorityWriteConverter implements Converter<Priority, String> {
    @Override public String convert(Priority source) { return source == null ? null : source.name(); }
}

@ReadingConverter
 class PriorityReadConverter implements Converter<String, Priority> {
    @Override public Priority convert(String source) { return (source == null) ? null : Priority.valueOf(source); }
}

/* ----- Status enum <-> TEXT (UI hyphens supported) ----- */
@WritingConverter
 class StatusWriteConverter implements Converter<TaskStatus, String> {
    @Override public String convert(TaskStatus source) { return source == null ? null : source.name(); }
}

@ReadingConverter
 class StatusReadConverter implements Converter<String, TaskStatus> {
    @Override public TaskStatus convert(String source) {
        if (source == null) return null;
        // accept either DB-friendly "in_progress" or UI "in-progress"
        String normalized = source.contains("-") ? source.replace('-', '_') : source;
        return TaskStatus.valueOf(normalized);
    }
}


@WritingConverter
 class TermWriteConverter implements Converter<Term, String> {
    @Override public String convert(Term source) {
        return source == null ? null : source.name();
    }
}

@ReadingConverter
 class TermReadConverter implements Converter<String, Term> {
    @Override public Term convert(String source) {
        return (source == null || source.isBlank()) ? null : Term.valueOf(source.trim());
    }
}

