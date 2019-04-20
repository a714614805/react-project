set names UTF8;
drop database if exists management;
create database management charset=UTF8;
use management;


DROP TABLE IF EXISTS by_users;
CREATE TABLE by_users (
tid int(11) NOT NULL auto_increment,
users_account varchar(64) DEFAULT NULL,
user_phoneNumber varchar(64) DEFAULT NULL,
user_password varchar(255) DEFAULT NULL,
user_nickname varchar(255) DEFAULT NULL,
user_identity varchar(64) DEFAULT NULL,
PRIMARY KEY (tid)
);
INSERT INTO by_users VALUES (1,15776454412,714614805,"a714614805","陶玉强","1");



DROP TABLE IF EXISTS books;
CREATE TABLE books (
    bid int(11) NOT NULL auto_increment,
    book_name varchar(64) DEFAULT NULL,
    book_price decimal(8,2) DEFAULT NULL,
    book_star decimal(5,1) DEFAULT NULL,
    book_left int(16) DEFAULT NULL,
    book_author varchar(64) DEFAULT NULL,
    PRIMARY KEY (bid)
);
INSERT INTO books VALUES (1,"母猪养成大法",100.00,3.9,500,"王一凡");


DROP TABLE IF EXISTS user_lend;
CREATE TABLE user_lend (
    book_id int(11) NOT NULL,
    book_startTime varchar(64) DEFAULT NULL,
    book_lastTime varchar(64) DEFAULT NULL,
    book_endTime varchar(64) DEFAULT NULL,
    PRIMARY KEY (book_id)
);
INSERT INTO user_lend VALUES (1,"2019/04/20","6","2019/04/26");