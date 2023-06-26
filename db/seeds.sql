INSERT INTO department (name) VALUES
  ('Sales'),
  ('Engineering'),
  ('Finance'),
  ('Legal');

INSERT INTO role (title, salary, department_id) VALUES
  ('Sales Manager', 80000.00, 1),
  ('Sales Representative', 50000.00, 1),
  ('Software Engineer', 90000.00, 2),
  ('Quality Assurance Engineer', 70000.00, 2),
  ('Financial Analyst', 75000.00, 3),
  ('Accountant', 60000.00, 3),
  ('Legal Counsel', 85000.00, 4),
  ('Legal Assistant', 45000.00, 4),
  ('Office Clerk', 40000.00, NULL);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
  ('John', 'Doe', 1, NULL),
  ('Jane', 'Smith', 2, 1),
  ('Mike', 'Johnson', 3, 1),
  ('Sarah', 'Williams', 4, 2),
  ('David', 'Brown', 5, 3),
  ('Emily', 'Taylor', 6, 3),
  ('Michael', 'Davis', 7, 4),
  ('Jennifer', 'Miller', 8, 7),
  ('Laura', 'Anderson', 9, NULL);