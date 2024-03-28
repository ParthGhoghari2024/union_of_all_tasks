create database unionOfAllTaskDB;
use unionOfAllTaskDB;

CREATE TABLE studentMaster LIKE school_db_26_2_24.studentMaster;
insert into studentMaster select * from school_db_26_2_24.studentMaster;
select * from studentMaster;
select * from basicDetailsMaster order by bDMId desc;

CREATE TABLE users_login LIKE users_20_3_24.users_login;
insert into users_login select * from users_20_3_24.users_login;
select * from users_login;



CREATE TABLE workExperienceMaster LIKE job_app_db_29_01.workExperienceMaster ;
insert into workExperienceMaster select * from job_app_db_29_01.workExperienceMaster ;
select * from workExperienceMaster ;



CREATE TABLE attendanceMaster LIKE school_db_26_2_24.attendanceMaster ;
insert into attendanceMaster select * from school_db_26_2_24.attendanceMaster ;
select * from attendanceMaster ;

CREATE TABLE examMaster LIKE school_db_26_2_24.examMaster ;
insert into examMaster select * from school_db_26_2_24.examMaster ;
select * from examMaster ;

CREATE TABLE resultMaster LIKE school_db_26_2_24.resultMaster  ;
insert into resultMaster  select * from school_db_26_2_24.resultMaster  ;
select * from resultMaster  ;


CREATE TABLE resultMaster2 LIKE school_db_26_2_24.resultMaster2  ;
insert into resultMaster2  select * from school_db_26_2_24.resultMaster2  ;
select * from resultMaster2  ;


CREATE TABLE studentMaster LIKE school_db_26_2_24.studentMaster ;
insert into studentMaster   select * from school_db_26_2_24.studentMaster ;
select * from studentMaster  order by stMId desc ;

CREATE TABLE studentMaster2 LIKE school_db_26_2_24.studentMaster2 ;
insert into studentMaster2   select * from school_db_26_2_24.studentMaster2 ;
select * from studentMaster2   ;
select count(*) from studentMaster ;
CREATE TABLE subjectMaster LIKE school_db_26_2_24.subjectMaster ;
insert into subjectMaster select * from school_db_26_2_24.subjectMaster ;
select * from subjectMaster ;



