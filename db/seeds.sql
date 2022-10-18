USE employees;

INSERT INTO department 
    (name)
VALUES
    ('Sales'),
    ('IT'),
    ('Legal'),
    ('Engineering'),
    ('Finance');

    INSERT INTO role 
    (title, salary, department_id)
VALUES
    ('Sales Lead', 75000, 1),
    ('IT Support', 100000, 2),
    ('Lawyer', 30000, 3),
    ('Engineer', 150000, 4),
    ('Accountant',51000, 5);

    INSERT INTO employee 
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Jester', 'Lavorre', 1, NULL),
    ('Mollymauk', 'Tealeaf', 2, NULL),
    ('Yasha', 'Nydoorin', 1, 1),
    ('Caleb', 'Widogast', 1, 1),
    ('Beau','Lionett', 1, NULL),
    ('Nott', 'The-Brave', 2, NULL),
    ('Fjord', 'Tough', 1, 2);