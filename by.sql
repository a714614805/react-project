set names UTF8;
drop database if exists management;
create database management charset=UTF8;
use management;


DROP TABLE IF EXISTS by_users;
CREATE TABLE by_users (
tid int(11) NOT NULL auto_increment,
users_account varchar(64) DEFAULT NULL,
user_password varchar(255) DEFAULT NULL,
user_nickname varchar(255) DEFAULT NULL,
PRIMARY KEY (tid)
);
INSERT INTO by_users VALUES ("acu214097325",714614805,"a714614805","陶玉强");