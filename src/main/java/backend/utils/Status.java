package backend.utils;

public enum Status {
    /** not started yet */ not_started,
    /** currently working */ in_progress,
    /** done */ completed;

    // Helpers if you prefer UI-style hyphens:
    public static Status fromUi(String s) {
        return Status.valueOf(s.replace('-', '_'));
    }
    public String toUi() {
        return name().replace('_', '-');
    }
}
