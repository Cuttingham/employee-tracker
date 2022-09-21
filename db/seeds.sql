INSERT INTO department (name)
VALUES ("Accounting"), 
        ("Front Office"), 
        ("Back Office "),
        ("Training"),
        ("Human Resources");

INSERT INTO roles (title, salary, department_id)
VALUE   ("Accountant", 80000.00, 1), 
        ("Manager", 75000.00, 3), 
        ("Intern", 40000.00, 3), 
        ("Secretary", 35000.00, 2), 
        ("Corporate Trainer", 65000.00, 4),
        ("Human Resources",75000.00,5);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUE   ("Jacob", "Karla", 2, null), 
        ("Bofa", "Deez", 1, null), 
        ("Alex", "Cheng", 3, 1), 
        ("Eric", "Donald", 4, 2), 
        ("Patricia", "Plank", 5, 2);