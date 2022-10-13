use employees;

INSERT INTO department 
    (name)
VALUES
    ('SALES'),
    ('IT'),
    ('LEGAL'),
    ('ENGINEERING'),
    ('FINANCE');

    INSERT INTO role 
    (title, salary, department_id)
VALUES
    ('SALES LEAD', 75000, 1),
    ('IT SUPPORT', 100000, 2),
    ('LAWYER', 30000, 3),
    ('ENGINEER', 150000, 4),
    ('ACCOUNTANT',51000, 5);

    INSERT INTO employee 
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Alex', 'Chen', 1, NULL),
    ('Lindsay', 'Reiner', 2, NULL),
     ('Caleb', 'Crum', 1, 1);