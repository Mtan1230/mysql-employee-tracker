SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, 
    CONCAT(m.first_name, ' ', m.last_name) AS manager
FROM employee e
LEFT JOIN role r ON e.role_id = r.id
LEFT JOIN department d ON r.department_id = d.id
LEFT JOIN employee m ON e.manager_id = m.id
ORDER BY e.id;


SELECT CONCAT(first_name, ' ', last_name) AS manager
FROM employee
WHERE manager_id IS NULL;


SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary, 
    CONCAT(m.first_name, ' ', m.last_name) AS manager
FROM employee e
LEFT JOIN role r ON e.role_id = r.id
LEFT JOIN department d ON r.department_id = d.id
LEFT JOIN employee m ON e.manager_id = m.id
ORDER BY m.id;

SELECT e.id, e.first_name, e.last_name, r.title, d.name AS department, r.salary 
FROM employee e
LEFT JOIN role r ON e.role_id = r.id
LEFT JOIN department d ON r.department_id = d.id
LEFT JOIN employee m ON e.manager_id = m.id
WHERE CONCAT(m.first_name, ' ', m.last_name) = 'John Doe';

SELECT e.id, e.first_name, e.last_name, r.title, r.salary,
    CONCAT(m.first_name, ' ', m.last_name) AS manager
FROM employee e
LEFT JOIN role r ON e.role_id = r.id
LEFT JOIN department d ON r.department_id = d.id
LEFT JOIN employee m ON e.manager_id = m.id
WHERE d.name = 'Sales';

SELECT d.name AS department, SUM(r.salary) AS total_salary
FROM employee e
LEFT JOIN role r ON e.role_id = r.id
LEFT JOIN department d ON r.department_id = d.id
GROUP BY d.name;