CREATE TABLE task(
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) UNIQUE,
  description VARCHAR(255)
  created_at TIMESTAMP(0) NOT NULL,
  updated_at TIMESTAMP(0) NOT NULL
);