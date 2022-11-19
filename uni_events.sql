CREATE TABLE Location (
	location_id INT ,
	location_name VARCHAR(50) NOT NULL,
	street_address VARCHAR(45) NOT NULL,
	city VARCHAR(20) NOT NULL,
	state VARCHAR(20) NOT NULL,
	zip_code VARCHAR(5) NOT NULL,
	longitude INT NOT NULL,
	latitude INT NOT NULL,
	PRIMARY KEY (location_id)
);

CREATE TABLE University (
	university_id INT ,
	uni_name VARCHAR(50) NOT NULL,
	location_id INT ,
	contact_phone VARCHAR(11) UNIQUE,
	contact_email VARCHAR(75) UNIQUE,
	PRIMARY KEY (university_id),
	FOREIGN KEY (location_id) REFERENCES Location (location_id) ON DELETE SET NULL
);


CREATE TABLE User (
	user_id INT UNIQUE,
	username VARCHAR(45) UNIQUE,
	user_pw VARCHAR(45) NOT NULL,
	first_name VARCHAR(45) NOT NULL,
	last_name VARCHAR(45) NOT NULL,
	phone_num VARCHAR(11) NOT NULL,
	email VARCHAR(75) UNIQUE,
	user_type VARCHAR(45) NOT NULL,
	university_id INT ,
	PRIMARY KEY (user_id),
	FOREIGN KEY (university_id) REFERENCES University (university_id) ON DELETE CASCADE
);



CREATE TABLE RSO (
	rso_id INT ,
	rso_name VARCHAR(50) NOT NULL,
	university_id INT NOT NULL,
	num_students INT NOT NULL,
	rso_description VARCHAR(400) NOT NULL,
	admin_id INT ,
	location_id INT ,
	PRIMARY KEY (rso_id),
	FOREIGN KEY (location_id) REFERENCES Location (location_id) ON DELETE SET NULL,
	FOREIGN KEY (admin_id) REFERENCES User (user_id) ON DELETE SET NULL
);

CREATE TABLE RSO_member (
	rso_memberid INT ,
	user_id INT ,
	rso_id INT ,
	PRIMARY KEY (rso_memberid),
	FOREIGN KEY (user_id) REFERENCES User (user_id) ON DELETE SET NULL,
	FOREIGN KEY (rso_id) REFERENCES RSO (rso_id) ON DELETE CASCADE
);

CREATE TABLE Event (
	event_id INT ,
	event_name VARCHAR(45) NOT NULL,
	event_date DATE NOT NULL,
	rso_id INT,
	description VARCHAR(400) NOT NULL,
	contact_email VARCHAR(75) NOT NULL,
	contact_phone VARCHAR(11) NOT NULL,
	rating DECIMAL(3,2) NOT NULL,
	category VARCHAR(15) NOT NULL,
	event_type VARCHAR(15) NOT NULL,
	location_id INT,
	PRIMARY KEY (event_id),
	FOREIGN KEY (location_id) REFERENCES Location (location_id) ON DELETE SET NULL,
	FOREIGN KEY (location_id) REFERENCES Location (location_id) ON DELETE CASCADE
);

CREATE TABLE Review (
	review_id INT ,
	user_id INT NOT NULL,
	event_id INT NOT NULL,
	comment VARCHAR(200) NOT NULL,
	rating DECIMAL(3,2) NOT NULL,
	time_stamp TIMESTAMP NOT NULL,
	PRIMARY KEY (review_id),
	FOREIGN KEY (user_id) REFERENCES User (user_id) ON DELETE CASCADE,
	FOREIGN KEY (event_id) REFERENCES Event (event_id) ON DELETE CASCADE
);











