PRAGMA foreign_keys = ON;

-- Courses
CREATE TABLE IF NOT EXISTS course (
  id       INTEGER PRIMARY KEY AUTOINCREMENT,
  title    TEXT NOT NULL,
  name     TEXT,
  priority TEXT,
  term     TEXT,                      -- enum name via converter
  year     INTEGER NOT NULL,          -- store as int
  status TEXT,

  CHECK (priority IS NULL OR priority IN ('high','medium','low')),
  CHECK (term IS NULL OR term IN ('fall','winter','spring','summer')),
  CHECK ( status IS NOT NULL or status IN ('active' , 'closed' , 'upcoming')),
  CHECK (year BETWEEN 1900 AND 3000)
);


CREATE TABLE IF NOT EXISTS task (
    id         INTEGER PRIMARY KEY AUTOINCREMENT,
    name       TEXT NOT NULL,
    due        TEXT,                        -- ISO 'yyyy-MM-dd''T''HH:mm'
    priority   TEXT,
    status     TEXT,
    course_id  INTEGER,

    -- Enforce enum-like values written by your converters
    CONSTRAINT priority_constraint CHECK (priority IS NULL OR priority IN ('high','medium','low')),
    CONSTRAINT status_constraint CHECK (status   IS NULL OR status   IN ('not_started','in_progress','completed')),

    FOREIGN KEY (course_id)
    REFERENCES course(id)
    ON UPDATE CASCADE
    ON DELETE SET NULL
);

-- -- Helpful index for joins/lookups
-- CREATE INDEX IF NOT EXISTS idx_task_course_id ON task(course_id);
