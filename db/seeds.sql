INSERT INTO departments (name)
VALUES ('HR'),
       ('Engineering'),
       ('Finance'),
       ('Legal');

INSERT INTO roles (title, salary, department_id)
VALUES ('HR Lead', 50000, 1),
       ('Engineer', 75000, 2),
       ('Accountant', 60000, 3),
       ('Legal Team Lead', 75000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ('John', 'Doe', 1, NULL),
       ('Mike', 'Chan', 4, NULL),
       ('Ashley', 'Rodriguez', 1, 1),
       ('Kevin', 'Tupik', 3, NULL),
       ('Malia', 'Brown', 2, NULL),
       ('Sarah', 'Lourd', 2, 3),
       ('Tom', 'Allen', 4, 1),
       ('Tina', 'Lee', 3, 3),
       ('Liz', 'Kim', 2, 3),
       ('Samantha', 'Lopez', 2, 3),
       ('Katie', 'Smith', 4, 1);