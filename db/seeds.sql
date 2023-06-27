INSERT INTO department (name) VALUES
  ('Sales'),
  ('Engineering'),
  ('Finance'),
  ('Legal');

INSERT INTO role (title, salary, department_id) VALUES
  ('Sales Manager', 90000.00, 1),
  ('Sales Representative', 65000.00, 1),
  ('Lead Engineer', 120000.00, 2),
  ('Software Engineer', 90000.00, 2),
  ('Account Manager', 95000.00, 3),
  ('Accountant', 60000.00, 3),
  ('Legal Team Lead', 15000.00, 4),
  ('Legal Assistant', 10000.00, 4),

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
  ('John', 'Doe', 1, null),
  ('Jane', 'Smith', 2, 1),
  ('Mike', 'Johnson', 3, null),
  ('Sarah', 'Williams', 4, 3),
  ('David', 'Brown', 5, null),
  ('Emily', 'Taylor', 6, 5),
  ('Michael', 'Davis', 7, null),
  ('Jennifer', 'Miller', 8, 7),