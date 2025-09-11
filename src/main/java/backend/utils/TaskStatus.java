package backend.utils;

public enum TaskStatus {
    /** not started yet */ not_started,
    /** currently working */ in_progress,
    /** done */ completed;

    // Helpers if you prefer UI-style hyphens:
    public static TaskStatus fromUi(String s) {
        return TaskStatus.valueOf(s.replace('-', '_'));
    }
    public String toUi() {
        return name().replace('_', '-');
    }
}
