USE employee_db;

INSERT INTO departments (department_name)
VALUES 
('IT'),
('Finance & Accounting'),
('Sales & Marketing'),
('Operations');

INSERT INTO roles (title, salary, department_id)
VALUES
('Full Stack Developer', 80000, 1),
('Software Engineer', 120000, 1),
('Accountant', 10000, 2), 
('Finanical Analyst', 150000, 2),
('Marketing Coordindator', 70000, 3), 
('Sales Lead', 90000, 3),
('Project Manager', 100000, 4),
('Operations Manager', 90000, 4);


INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES 
('Shawn', 'Mendes', 2, null),
('Tom', 'Holland', 1, 1),
('Chris', 'Hemsworth', 4, null),
('Jonathan', 'Groff', 3, 3),
('Richard', 'Madden', 6, null),
('Zac', 'Efron', 5, 5),
('Gregg', 'Sulkin', 7, null),
('Grant', 'Gustin', 8, 7);

UPDATE `employee_db`.`employees` SET `manager_id` = '1' WHERE (`id` > '1');