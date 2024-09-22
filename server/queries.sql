CREATE TABLE notes(
	id SERIAL UNIQUE PRIMARY KEY,
	title TEXT,
	content TEXT
)

INSERT INTO notes (title, content)
VALUES ('This is a test title', 'This is test content');
