INSERT INTO Specialization(name, description) VALUES('Ophthalmologist', 'Eye doctor');
INSERT INTO Specialization(name, description) VALUES('Dentist', 'Teeth doctor');
INSERT INTO Specialization(name, description) VALUES('ENT Specialist', 'Ear, nose, and throat doctor');
INSERT INTO Specialization(name, description) VALUES('Dermatologist', 'Skin doctor');
INSERT INTO Specialization(name, description) VALUES('Cardiologist', 'Heart doctor');
INSERT INTO Specialization(name, description) VALUES('Neurologist', 'Nervous system doctor');
INSERT INTO Specialization(name, description) VALUES('Psychiatrist', 'Mental health doctor');



INSERT INTO Address(street, city, state, country, postal_code) VALUES('No 123, Kandy Road', 'Colombo', 'Western Province', 'Sri Lanka', '00100');
INSERT INTO Address(street, city, state, country, postal_code) VALUES('No 45, Galle Road', 'Galle', 'Southern Province', 'Sri Lanka', '80000');
INSERT INTO Address(street, city, state, country, postal_code) VALUES('No 67, Main Street', 'Kandy', 'Central Province', 'Sri Lanka', '20000');
INSERT INTO Address(street, city, state, country, postal_code) VALUES('No 89, High Level Road', 'Nugegoda', 'Western Province', 'Sri Lanka', '10250');
INSERT INTO Address(street, city, state, country, postal_code) VALUES('No 51, Temple Road', 'Jaffna', 'Northern Province', 'Sri Lanka', '40000');
INSERT INTO Address(street, city, state, country, postal_code) VALUES('No 70, Lake Road', 'Anuradhapura', 'North Central Province', 'Sri Lanka', '50000');




INSERT INTO Doctor(first_name, last_name, phone, email, id_card, department, birth_date, description, address_id) VALUES ('Nimal', 'Perera', '+94112233445', 'n.perera@gmail.com', 'NML123456', 'General Medicine', STR_TO_DATE('25-04-1976','%d-%m-%Y'), '', 1);
INSERT INTO Doctor(first_name, last_name, phone, email, id_card, department, birth_date, description, address_id) VALUES ('Sunita', 'Mahawatte', '+94771234567', 's.mahawatte@yahoo.com', 'SNT789012', 'Dental', STR_TO_DATE('05-07-1988','%d-%m-%Y'), '', 2);
INSERT INTO Doctor(first_name, last_name, phone, email, id_card, department, birth_date, description, address_id) VALUES ('Kasun', 'Fernando', '+94556677889', 'k.fernando@interia.pl', 'KSN345678', 'Cardiology', STR_TO_DATE('29-11-1969','%d-%m-%Y'), '', 3);
INSERT INTO Doctor(first_name, last_name, phone, email, id_card, department, birth_date, description, address_id) VALUES ('Priyantha', 'Silva', '811223344', 'p.silva@health.lk', 'PRY901234', 'Research', STR_TO_DATE('13-06-1974','%d-%m-%Y'), '', 4);
INSERT INTO Doctor(first_name, last_name, phone, email, id_card, department, birth_date, description, address_id) VALUES ('Rukshan', 'Bandara', '+94887766550', 'r.bandara@gmail.com', 'RKS567890', 'General Medicine', STR_TO_DATE('11-08-1959','%d-%m-%Y'), '', 5);
INSERT INTO Doctor(first_name, last_name, phone, email, id_card, department, birth_date, description, address_id) VALUES ('Lakmini', 'Dias', '512345678', 'l.dias@health.lk', 'LKM678901', 'Research', STR_TO_DATE('17-01-1978','%d-%m-%Y'), '', 6);




INSERT INTO Address(street, city, state, country, postal_code) VALUES('No 14/34, Lotus Road', 'Matara', 'Southern Province', 'Sri Lanka', '81000');
INSERT INTO User(birth_date, email, first_name, id_card, last_name, password, phone, username, address_id) VALUES (STR_TO_DATE('14-01-2005','%d-%m-%Y'), 'kamal.perera@gmail.com', 'Kamal', 'KML234567', 'Perera', '$2a$10$examplehash', '+94770001122', 'KamalP', 7);
