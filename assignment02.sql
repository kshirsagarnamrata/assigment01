--show databases
show databases;
--create database
create database mern_project;
--use database
use mern_project;
--create tables

create table users(email varchar(30) primary key,
  password varchar(30),
  role enum('admin','student'));


 create table courses(course_id int primary key, 
   course_name varchar(30),
    description varchar(50),
    fees int,start_date date,
    end_date date,
     video_expire_days int);

  CREATE TABLE videos (
        video_id INT PRIMARY KEY,
         course_id INT,
          title VARCHAR(30),
         description VARCHAR(50),
         youtube_url VARCHAR(50),
         added_at DATE,
              FOREIGN KEY (course_id) REFERENCES courses(course_id)
     );


     CREATE TABLE students (
        reg_no INT PRIMARY KEY,
          name VARCHAR(50),
          email VARCHAR(50),
         course_id INT,
         mobile_no BIGINT,
          profile_pic BLOB,
         FOREIGN KEY (email) REFERENCES users(email),
         FOREIGN KEY (course_id) REFERENCES courses(course_id)
     );


--show all tables
show tables;

--insert into all tables

INSERT INTO users (email, password, role) VALUES
('john@example.com', '123456', 'student'),
('aditi@example.com', '123456', 'student'),
('rahul@example.com', '123456', 'student'),
('sneha@example.com', '123456', 'student'),
('admin@example.com', 'admin123', 'admin'),
('megha@example.com', '123456', 'student'),
('karan@example.com', '123456', 'student');


INSERT INTO courses (course_id, course_name, description, fees, start_date, end_date, video_expire_days) VALUES
(1, 'MERN Stack', 'Full-stack web development', 25000, '2025-01-01', '2025-03-01', 30),
(2, 'C++ DSA', 'Data structures in C++', 20000, '2025-01-05', '2025-03-10', 25),
(3, 'Java Backend', 'Spring Boot + APIs', 28000, '2025-01-10', '2025-03-20', 35),
(4, 'Python Basics', 'Introduction to Python', 15000, '2025-01-12', '2025-02-20', 20),
(5, 'ReactJS', 'Frontend using React', 22000, '2025-01-15', '2025-03-15', 30),
(6, 'NodeJS', 'Node + Express', 24000, '2025-01-20', '2025-03-18', 40);

INSERT INTO students (reg_no, name, email, course_id, mobile_no, profile_pic) VALUES
(101, 'John Doe', 'john@example.com', 1, 9876543210, NULL),
(102, 'Aditi Sharma', 'aditi@example.com', 2, 9876543222, NULL),
(103, 'Rahul Patil', 'rahul@example.com', 1, 9876543233, NULL),
(104, 'Sneha Kulkarni', 'sneha@example.com', 4, 9876543244, NULL),
(105, 'Megha Rane', 'megha@example.com', 3, 9876543255, NULL),
(106, 'Karan Deshmukh', 'karan@example.com', 6, 9876543266, NULL),
(107, 'John Doe', 'john@example.com', 5, 9876543277, NULL);


INSERT INTO videos (video_id, course_id, title, description, youtube_url, added_at) VALUES
(1, 1, 'Intro to MERN', 'Basics of MERN stack', 'https://youtu.be/mern1', '2025-01-01'),
(2, 1, 'MongoDB Basics', 'Database introduction', 'https://youtu.be/mongo1', '2025-01-05'),
(3, 2, 'Pointers in C++', 'Pointer concepts', 'https://youtu.be/cpp1', '2025-01-10'),
(4, 3, 'Spring Boot Setup', 'Install & setup Spring Boot', 'https://youtu.be/java1', '2025-01-15'),
(5, 4, 'Python Variables', 'Basics of variables', 'https://youtu.be/py1', '2025-01-18'),
(6, 5, 'React Props', 'Understanding props', 'https://youtu.be/react1', '2025-01-20'),
(7, 6, 'Express Middleware', 'Middleware explanation', 'https://youtu.be/node1', '2025-01-25');


--display all tables data
select * from users;
select * from students;
select * from courses;
select * from videos;

--assigment 2
--Q1. Write a Sql query that will fetch all upcoming courses.
SELECT *
FROM courses
WHERE course_start_date > CURDATE();


 --Q2. Write a Sql query that will fetch all the registered students along with course name\

 SELECT 
    students.reg_no,
    students.name,
    students.email,
    students.mobile_no,
    courses.course_id,
    courses.course_name
FROM 
    students
JOIN 
    courses 
ON 
    students.course_id = courses.course_id;


--Q3. Write an SQL query to fetch the complete details of a student (based on their email) along with the details
--of the course they are enrolled in.

select *from students s join courses c
on s.course_id=c.course_id
WHERE 
    s.email = 'student@example.com';;

--q4.Write an SQL query to retrieve the course details and the list of non-expired videos for a specific student
--using their email address. A video is considered active (not expired) if its added_at date plus the course’s
--video_expire_days has not yet passed compared to the current date.
--Example: A video added on 2025-01-01 with 30 video_expire_days remains active until 2025-01-31

SELECT
  c.course_id,
  c.course_name,
  c.video_expire_days,
  v.video_id,
  v.title,
  v.description,
  v.youtube_url,
  v.added_at
FROM students s
JOIN courses c ON s.course_id = c.course_id
JOIN videos v   ON v.course_id = c.course_id
WHERE s.email = 'student@example.com'
  AND DATE_ADD(v.added_at, INTERVAL c.video_expire_days DAY) >= CURDATE();
