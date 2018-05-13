-- Drops the Phonow if it exists currently --
DROP DATABASE IF EXISTS Phonow;
-- Creates the "Phonow" database --
CREATE DATABASE Phonow;
Use Phonow;
-- Resturant Info
CREATE Table Resturants(restaurant_id int auto_increment,restaurant_name varchar(50), address varchar(80),
restaurant_address2 varchar(80),resturant_city varchar(80),restaurant_state varchar(50),restaurant_zip varchar(50),
created_by varchar(128),created_on datetime,lastModified_by varchar(128),lastModified_on datetime, deleted boolean,primary key(restaurant_id));

-- Restaurant hours
CREATE Table Restaurant_Hours(fk_restaurant_id int,day_name varchar(10), start_time nvarchar(15) , end_time nvarchar(15),
CONSTRAINT fk_Restaurant_Hours FOREIGN KEY (fk_restaurant_id)
REFERENCES Resturants(restaurant_id)
ON DELETE CASCADE
ON UPDATE CASCADE);

-- User Security Group
CREATE Table User_Sec_Grp(grp_code nvarchar(10),grp_name varchar(128),grp_description varchar(128),primary key(grp_code));

-- User Info
CREATE Table Users(user_id nvarchar(128), user_first_name varchar(128), user_last_name varchar(128),
user_email nvarchar(128),user_phone_mobile nvarchar(128), user_phone_work nvarchar(128),fk_user_sec_grp nvarchar(10),
created_by varchar(128),created_on datetime,lastModified_by varchar(128),lastModified_on datetime,deleted boolean,primary key(user_id),
CONSTRAINT fk_Users_Sec_Grp FOREIGN KEY (fk_user_sec_grp)
REFERENCES User_Sec_Grp(grp_code)
ON DELETE CASCADE
ON UPDATE CASCADE);

-- Menu Categories
CREATE Table Menu_Categrories(category_id int auto_increment,category_name varchar(50),category_description varchar(128),
created_by varchar(128),created_on datetime,lastModified_by varchar(128),lastModified_on datetime,deleted boolean, primary key(category_id));

-- Menu Items
CREATE Table Menu_Items(item_id int auto_increment,fk_restaurant_id int,fk_category_id int,item_name_english varchar(128),item_name_vietnamese nvarchar(128),
 item_description varchar(200),item_price Decimal(10,2),rating int(10),
 created_by varchar(128),created_on datetime,lastModified_by varchar(128),lastModified_on datetime,deleted boolean,primary key(item_id),
 CONSTRAINT fk_Menu_Restaurants FOREIGN KEY (fk_restaurant_id)
REFERENCES Resturants(restaurant_id)
ON DELETE CASCADE
ON UPDATE CASCADE,
 CONSTRAINT fk_Menu_Categories FOREIGN KEY (fk_category_id)
REFERENCES Menu_Categrories(category_id)
ON DELETE CASCADE
ON UPDATE CASCADE
);
 
 -- Contact Info
CREATE Table Contacts(contact_id int auto_increment,contact_name varchar(256),contact_email varchar(128),
contact_phone nvarchar(128),comments varchar(4000),created_on datetime,primary key(contact_id))


