CREATE DATABASE  IF NOT EXISTS `unionOfAllTasksDB` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `unionOfAllTasksDB`;
-- MySQL dump 10.13  Distrib 8.0.36, for Linux (x86_64)
--
-- Host: localhost    Database: unionOfAllTasksDB
-- ------------------------------------------------------
-- Server version	8.0.36-0ubuntu0.20.04.1

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `attendanceMaster`
--

DROP TABLE IF EXISTS attendanceMaster;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE attendanceMaster (
  aMId int NOT NULL AUTO_INCREMENT,
  stMId int DEFAULT NULL,
  `date` date DEFAULT NULL,
  present varchar(5) DEFAULT NULL,
  PRIMARY KEY (aMId),
  KEY stMId (stMId),
  CONSTRAINT attendanceMaster_ibfk_1 FOREIGN KEY (stMId) REFERENCES studentMaster (stMId)
) ENGINE=InnoDB AUTO_INCREMENT=45001 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `basicDetailsMaster`
--

DROP TABLE IF EXISTS basicDetailsMaster;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE basicDetailsMaster (
  bDMId int NOT NULL AUTO_INCREMENT,
  firstName varchar(255) NOT NULL,
  lastName varchar(255) NOT NULL,
  designation varchar(255) NOT NULL,
  address1 varchar(255) NOT NULL,
  address2 varchar(255) DEFAULT NULL,
  city varchar(255) NOT NULL,
  phoneNumber varchar(15) NOT NULL,
  state varchar(255) NOT NULL,
  gender char(1) NOT NULL,
  relationshipStatus char(1) NOT NULL,
  dob date NOT NULL,
  email varchar(255) DEFAULT 'temp@gmail.com',
  PRIMARY KEY (bDMId),
  CONSTRAINT basicDetailsMaster_chk_1 CHECK ((`gender` in (_utf8mb4'f',_utf8mb4'm'))),
  CONSTRAINT basicDetailsMaster_chk_2 CHECK ((`relationshipStatus` in (_utf8mb4's',_utf8mb4'm',_utf8mb4'd')))
) ENGINE=InnoDB AUTO_INCREMENT=198 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `cityDetails`
--

DROP TABLE IF EXISTS cityDetails;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE cityDetails (
  cityId int NOT NULL AUTO_INCREMENT,
  `name` text,
  stateId int DEFAULT NULL,
  PRIMARY KEY (cityId),
  KEY stateId (stateId),
  CONSTRAINT cityDetails_ibfk_1 FOREIGN KEY (stateId) REFERENCES stateDetails (stateId)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `eduDetailsMaster`
--

DROP TABLE IF EXISTS eduDetailsMaster;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE eduDetailsMaster (
  sEDMId int NOT NULL AUTO_INCREMENT,
  bDMId int DEFAULT NULL,
  eduType varchar(15) DEFAULT NULL,
  boardOrCourseName varchar(15) DEFAULT NULL,
  university varchar(255) DEFAULT NULL,
  passingYear smallint DEFAULT NULL,
  percentage float DEFAULT NULL,
  `name` varchar(45) DEFAULT NULL,
  PRIMARY KEY (sEDMId),
  UNIQUE KEY unIdEdu (bDMId,`name`),
  CONSTRAINT eduDetailsMaster_ibfk_1 FOREIGN KEY (bDMId) REFERENCES basicDetailsMaster (bDMId)
) ENGINE=InnoDB AUTO_INCREMENT=276 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `examMaster`
--

DROP TABLE IF EXISTS examMaster;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE examMaster (
  eTId int NOT NULL AUTO_INCREMENT,
  examName varchar(255) DEFAULT NULL,
  PRIMARY KEY (eTId)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `lang`
--

DROP TABLE IF EXISTS lang;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE lang (
  lKId int NOT NULL AUTO_INCREMENT,
  bDMId int DEFAULT NULL,
  langName varchar(255) DEFAULT NULL,
  readMark int DEFAULT NULL,
  writeMark int DEFAULT NULL,
  speakMark int DEFAULT NULL,
  PRIMARY KEY (lKId),
  KEY bDMId (bDMId),
  CONSTRAINT lang_ibfk_1 FOREIGN KEY (bDMId) REFERENCES basicDetailsMaster (bDMId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `languageKnown`
--

DROP TABLE IF EXISTS languageKnown;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE languageKnown (
  lKId int NOT NULL AUTO_INCREMENT,
  bDMId int DEFAULT NULL,
  langId int DEFAULT NULL,
  langName varchar(255) DEFAULT NULL,
  langLevelId int DEFAULT NULL,
  langLevel varchar(255) DEFAULT NULL,
  PRIMARY KEY (lKId),
  KEY bDMId (bDMId),
  KEY langId (langId),
  CONSTRAINT languageKnown_ibfk_1 FOREIGN KEY (bDMId) REFERENCES basicDetailsMaster (bDMId),
  CONSTRAINT languageKnown_ibfk_2 FOREIGN KEY (langId) REFERENCES option_master (oMId)
) ENGINE=InnoDB AUTO_INCREMENT=856 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `option_master`
--

DROP TABLE IF EXISTS option_master;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE option_master (
  oMId int NOT NULL AUTO_INCREMENT,
  sMId int DEFAULT NULL,
  optionKey varchar(255) NOT NULL,
  optionVal varchar(255) NOT NULL,
  PRIMARY KEY (oMId),
  UNIQUE KEY optionKey (optionKey),
  UNIQUE KEY optionVal (optionVal),
  UNIQUE KEY optionKey_2 (optionKey,optionVal),
  KEY sMId (sMId),
  CONSTRAINT option_master_ibfk_1 FOREIGN KEY (sMId) REFERENCES select_master (sMId)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `preference`
--

DROP TABLE IF EXISTS preference;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE preference (
  prefId int NOT NULL AUTO_INCREMENT,
  bDMId int DEFAULT NULL,
  preferedLocation varchar(255) DEFAULT NULL,
  preferenceOrder int NOT NULL,
  noticePeriod float DEFAULT NULL,
  expectedCTC float NOT NULL,
  currentCTC float NOT NULL,
  department varchar(255) DEFAULT NULL,
  PRIMARY KEY (prefId),
  KEY bDMId (bDMId),
  CONSTRAINT preference_ibfk_1 FOREIGN KEY (bDMId) REFERENCES basicDetailsMaster (bDMId),
  CONSTRAINT preference_chk_1 CHECK ((`preferenceOrder` > 0))
) ENGINE=InnoDB AUTO_INCREMENT=148 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `referenceContact`
--

DROP TABLE IF EXISTS referenceContact;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE referenceContact (
  rCId int NOT NULL AUTO_INCREMENT,
  bDMId int DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  contactNumber varchar(255) DEFAULT NULL,
  relation varchar(255) DEFAULT NULL,
  PRIMARY KEY (rCId),
  KEY bDMId (bDMId),
  CONSTRAINT referenceContact_ibfk_1 FOREIGN KEY (bDMId) REFERENCES basicDetailsMaster (bDMId)
) ENGINE=InnoDB AUTO_INCREMENT=88 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `resultMaster`
--

DROP TABLE IF EXISTS resultMaster;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE resultMaster (
  eMId int NOT NULL AUTO_INCREMENT,
  stMId int NOT NULL,
  suMId int NOT NULL,
  examId int NOT NULL,
  pracTotalMarks int NOT NULL,
  pracOptainedMarks int NOT NULL,
  theoryTotalMarks int NOT NULL,
  theoryOptainedMarks int NOT NULL,
  PRIMARY KEY (eMId),
  KEY suMId (suMId),
  KEY examId (examId),
  CONSTRAINT resultMaster_ibfk_1 FOREIGN KEY (suMId) REFERENCES subjectMaster (suMId),
  CONSTRAINT resultMaster_ibfk_2 FOREIGN KEY (examId) REFERENCES examMaster (eTId)
) ENGINE=InnoDB AUTO_INCREMENT=3601 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `select_master`
--

DROP TABLE IF EXISTS select_master;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE select_master (
  sMId int NOT NULL AUTO_INCREMENT,
  selectName varchar(255) NOT NULL,
  selectKey varchar(255) NOT NULL,
  input_type varchar(45) NOT NULL,
  PRIMARY KEY (sMId),
  UNIQUE KEY selectName (selectName),
  UNIQUE KEY selectKey (selectKey),
  UNIQUE KEY selectName_2 (selectName,selectKey)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `stateDetails`
--

DROP TABLE IF EXISTS stateDetails;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE stateDetails (
  stateId int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (stateId)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `studentMaster`
--

DROP TABLE IF EXISTS studentMaster;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE studentMaster (
  stMId int NOT NULL DEFAULT '0',
  firstname varchar(255) DEFAULT NULL,
  lastname varchar(255) DEFAULT NULL,
  email varchar(255) DEFAULT NULL,
  email2 varchar(255) DEFAULT NULL,
  board varchar(255) DEFAULT NULL,
  birthdate date DEFAULT NULL,
  address text,
  city varchar(255) DEFAULT NULL,
  country varchar(255) DEFAULT NULL,
  country_code varchar(255) DEFAULT NULL,
  created_at timestamp(6) NULL DEFAULT CURRENT_TIMESTAMP(6),
  PRIMARY KEY (stMId)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `subjectMaster`
--

DROP TABLE IF EXISTS subjectMaster;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE subjectMaster (
  suMId int NOT NULL AUTO_INCREMENT,
  subName varchar(255) DEFAULT NULL,
  PRIMARY KEY (suMId)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `technologiesKnown`
--

DROP TABLE IF EXISTS technologiesKnown;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE technologiesKnown (
  tKId int NOT NULL AUTO_INCREMENT,
  bDMId int DEFAULT NULL,
  technologyName varchar(255) DEFAULT NULL,
  technologyLevel varchar(255) DEFAULT NULL,
  PRIMARY KEY (tKId),
  KEY bDMId (bDMId),
  CONSTRAINT technologiesKnown_ibfk_1 FOREIGN KEY (bDMId) REFERENCES basicDetailsMaster (bDMId)
) ENGINE=InnoDB AUTO_INCREMENT=260 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `users_login`
--

DROP TABLE IF EXISTS users_login;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE users_login (
  userId int NOT NULL AUTO_INCREMENT,
  firstName varchar(255) DEFAULT NULL,
  lastName varchar(255) DEFAULT NULL,
  email varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  passwordSalt varchar(255) DEFAULT NULL,
  activationToken varchar(255) DEFAULT NULL,
  tokenGenerationTime timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  activationStatus tinyint(1) DEFAULT NULL,
  PRIMARY KEY (userId)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `workExperienceMaster`
--

DROP TABLE IF EXISTS workExperienceMaster;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE workExperienceMaster (
  wEMId int NOT NULL AUTO_INCREMENT,
  bDMId int DEFAULT NULL,
  companyName varchar(255) DEFAULT NULL,
  designation varchar(255) DEFAULT NULL,
  fromDate date DEFAULT NULL,
  toDate date DEFAULT NULL,
  PRIMARY KEY (wEMId),
  KEY bDMId (bDMId),
  CONSTRAINT workExperienceMaster_ibfk_1 FOREIGN KEY (bDMId) REFERENCES basicDetailsMaster (bDMId)
) ENGINE=InnoDB AUTO_INCREMENT=174 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed
