-- View all Employees
SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, 
    CONCAT(m.first_name, ' ', m.last_name) AS manager
FROM employee e
LEFT JOIN role r ON e.role_id = r.id
LEFT JOIN department d ON r.department_id = d.id
LEFT JOIN employee m ON e.manager_id = m.id
ORDER BY e.id;

-- View employees by manager
SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary 
FROM employee e
LEFT JOIN role r ON e.role_id = r.id
LEFT JOIN department d ON r.department_id = d.id
LEFT JOIN employee m ON e.manager_id = m.id
WHERE CONCAT(m.first_name, ' ', m.last_name) = 'John Doe';

-- View employees by department
SELECT e.id, e.first_name, e.last_name, r.title, r.salary,
    CONCAT(m.first_name, ' ', m.last_name) AS manager
FROM employee e
LEFT JOIN role r ON e.role_id = r.id
LEFT JOIN department d ON r.department_id = d.id
LEFT JOIN employee m ON e.manager_id = m.id
WHERE d.name = 'Sales';

-- View budge group by department
SELECT d.name AS department, SUM(r.salary) AS total_salary
FROM employee e
LEFT JOIN role r ON e.role_id = r.id
LEFT JOIN department d ON r.department_id = d.id
GROUP BY d.name;

-- Find manager's employee_id 
SELECT e.id
FROM employee e
WHERE CONCAT(e.first_name, ' ', e.last_name) = 'John Doe';

-- Find all employee
SELECT CONCAT(e.first_name, ' ', e.last_name) AS name
FROM employee e;

-- Update role
UPDATE employee
SET role_id = 10
WHERE id = 5;