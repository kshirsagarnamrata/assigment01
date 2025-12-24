CREATE TABLE users(
    uid INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(20),
    email VARCHAR(50),
    password VARCHAR(100),
    mobile CHAR(10)
);