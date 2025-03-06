-- MariaDB dump 10.19-11.1.2-MariaDB, for Win64 (AMD64)
--
-- Host: localhost    Database: edifis_pro
-- ------------------------------------------------------
-- Server version	11.1.2-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `competences`
--

DROP TABLE IF EXISTS `competences`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `competences` (
  `competence_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`competence_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `competences`
--

LOCK TABLES `competences` WRITE;
/*!40000 ALTER TABLE `competences` DISABLE KEYS */;
INSERT INTO `competences` VALUES
(1,'Maçonnerie','Travaux de construction et de rénovation en maçonnerie','2025-03-05 16:59:35','2025-03-05 16:59:35'),
(2,'Électricité','Installation et maintenance des systèmes électriques','2025-03-05 16:59:35','2025-03-05 16:59:35'),
(3,'Plomberie','Installation et réparation des systèmes de plomberie','2025-03-05 16:59:35','2025-03-05 16:59:35'),
(4,'Charpenterie','Construction et réparation de structures en bois','2025-03-05 16:59:35','2025-03-05 16:59:35'),
(5,'Peinture en bâtiment','Application de peinture et de revêtements muraux','2025-03-05 16:59:35','2025-03-05 16:59:35'),
(6,'Revêtement de sol','Pose de carrelage, parquet et autres revêtements','2025-03-05 16:59:35','2025-03-05 16:59:35'),
(7,'Isolation thermique et acoustique','Amélioration de l\'isolation des bâtiments','2025-03-05 16:59:35','2025-03-05 16:59:35'),
(8,'Menuiserie','Fabrication et installation d\'éléments en bois','2025-03-05 16:59:35','2025-03-05 16:59:35'),
(9,'Serrurerie','Installation et maintenance des serrures et systèmes de sécurité','2025-03-05 16:59:35','2025-03-05 16:59:35'),
(10,'Climatisation et chauffage','Installation et entretien des systèmes de chauffage et climatisation','2025-03-05 16:59:35','2025-03-05 16:59:35'),
(11,'Gestion de projet','Planification, organisation et suivi des chantiers','2025-03-05 17:03:56','2025-03-05 17:03:56'),
(12,'Coordination des équipes','Gestion et supervision des équipes sur le terrain','2025-03-05 17:03:56','2025-03-05 17:03:56'),
(13,'Lecture de plans','Interprétation et mise en œuvre des plans architecturaux','2025-03-05 17:03:56','2025-03-05 17:03:56'),
(14,'Sécurité sur chantier','Application des normes de sécurité sur les chantiers','2025-03-05 17:03:56','2025-03-05 17:03:56');
/*!40000 ALTER TABLE `competences` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `construction_sites`
--

DROP TABLE IF EXISTS `construction_sites`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `construction_sites` (
  `construction_site_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `state` enum('En cours','Terminé','Annulé','Prévu') NOT NULL,
  `description` text DEFAULT NULL,
  `adresse` varchar(255) DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `end_date` date DEFAULT NULL,
  `open_time` time DEFAULT NULL,
  `end_time` time DEFAULT NULL,
  `date_creation` date DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `image_url` varchar(255) DEFAULT NULL,
  `chef_de_projet_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`construction_site_id`),
  KEY `chef_de_projet_id` (`chef_de_projet_id`),
  CONSTRAINT `construction_sites_ibfk_1` FOREIGN KEY (`chef_de_projet_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `construction_sites`
--

LOCK TABLES `construction_sites` WRITE;
/*!40000 ALTER TABLE `construction_sites` DISABLE KEYS */;
INSERT INTO `construction_sites` VALUES
(1,'t','En cours','trest','test','2025-03-06','2025-03-08','05:11:52','20:11:52',NULL,'2025-03-04 16:11:52','2025-03-06 11:10:28',NULL,9),
(2,'Projet Alpha','En cours','Construction d\'un immeuble résidentiel','10 Rue de Paris, Lyon','2025-04-01','2025-06-30','08:00:00','17:00:00',NULL,'2025-03-05 15:33:59','2025-03-05 15:33:59',NULL,15),
(3,'Projet Beta','En cours','Rénovation d\'un hôtel 4 étoiles','5 Avenue des Champs, Marseille','2025-05-10','2025-08-15','07:30:00','18:30:00',NULL,'2025-03-05 15:33:59','2025-03-05 15:33:59',NULL,9),
(4,'Projet Gamma','En cours','Construction d\'un centre commercial','12 Boulevard Haussmann, Paris','2025-06-15','2025-12-20','06:00:00','20:00:00',NULL,'2025-03-05 15:33:59','2025-03-05 15:33:59',NULL,9),
(5,'Projet Delta','En cours','Aménagement d\'un parc urbain','25 Rue Nationale, Toulouse','2025-07-01','2025-09-30','08:00:00','19:00:00',NULL,'2025-03-05 15:33:59','2025-03-05 15:33:59',NULL,9),
(6,'Projet Epsilon','En cours','Réhabilitation d\'une zone industrielle','18 Chemin de la Gare, Bordeaux','2025-08-01','2025-11-30','07:00:00','17:30:00',NULL,'2025-03-05 15:33:59','2025-03-05 15:33:59',NULL,9),
(7,'projet beta','En cours','Rénovation d\'un hôtel 4 étoiles','5 Avenue des Champs, Marseille','2025-05-10','2025-08-15','07:30:00','18:30:00','2025-03-05','2025-03-05 14:53:09','2025-03-05 14:53:09','construction-1741186389375.png',9),
(8,'projet beta 2','En cours','Rénovation d\'un hôtel 4 étoiles','5 Avenue des Champs, Marseille','2025-05-10','2025-08-15','07:30:00','18:30:00','2025-03-05','2025-03-05 15:33:05','2025-03-05 15:33:05',NULL,9),
(9,'projet postman','En cours','Rénovation d\'un hôtel 4 étoiles','5 Avenue des Champs, Marseille','2025-05-10','2025-08-15','07:30:00','18:30:00','2025-03-05','2025-03-05 15:34:36','2025-03-05 15:34:36',NULL,9),
(10,'projet zebio','En cours','Rénovation d\'un hôtel 4 étoiles','5 Avenue des Champs, Marseille','2025-05-10','2025-08-15','07:30:00','18:30:00','2025-03-06','2025-03-06 15:58:58','2025-03-06 15:58:58',NULL,9),
(11,'projet zebio','En cours','Rénovation d\'un hôtel 4 étoiles','5 Avenue des Champs, Marseille','2025-05-10','2025-08-15','07:30:00','18:30:00','2025-03-06','2025-03-06 15:59:30','2025-03-06 15:59:30','construction-1741276770924.png',9),
(12,'sdfg','En cours','sdfg','fesgrfgfh','2025-03-12','2025-04-05',NULL,NULL,'2025-03-06','2025-03-06 17:04:06','2025-03-06 17:04:06','construction-1741280646457.jpg',9);
/*!40000 ALTER TABLE `construction_sites` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `roles` (
  `role_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` enum('Admin','Worker','Manager') NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tasks`
--

DROP TABLE IF EXISTS `tasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tasks` (
  `task_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `status` enum('En cours','Terminé','Annulé','Prévu') NOT NULL,
  `creation_date` datetime DEFAULT NULL,
  `start_date` datetime DEFAULT NULL,
  `end_date` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `construction_site_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`task_id`),
  KEY `construction_site_id` (`construction_site_id`),
  CONSTRAINT `tasks_ibfk_1` FOREIGN KEY (`construction_site_id`) REFERENCES `construction_sites` (`construction_site_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tasks`
--

LOCK TABLES `tasks` WRITE;
/*!40000 ALTER TABLE `tasks` DISABLE KEYS */;
INSERT INTO `tasks` VALUES
(18,'test','test','Annulé','2025-03-06 12:45:28','2025-03-05 12:00:00','2025-03-07 12:00:00','2025-03-06 12:45:28','2025-03-06 16:47:03',1),
(19,'chef de projet ','gere ce projet stp 2343','Annulé','2025-03-06 12:47:04','2025-03-14 22:11:00','2025-03-21 20:09:00','2025-03-06 12:47:04','2025-03-06 17:05:59',5),
(20,'tu bosse','eeee','En cours','2025-03-06 14:14:44','2025-03-31 22:00:00','2025-06-29 22:00:00','2025-03-06 14:14:44','2025-03-06 14:14:44',2),
(21,'fait la salle de bain ','test','En cours','2025-03-06 14:24:54','2025-05-09 22:00:00','2025-08-14 22:00:00','2025-03-06 14:24:54','2025-03-06 14:24:54',3),
(22,'faite la salle a manger ','A DEUX ','En cours','2025-03-06 14:44:07','2025-03-06 08:00:00','2025-03-06 18:00:00','2025-03-06 14:44:07','2025-03-06 14:44:07',1),
(23,'testFr&','Test1','En cours','2025-03-06 17:28:36','2025-03-06 17:59:00','2025-03-06 20:00:00','2025-03-06 17:28:36','2025-03-06 17:28:36',1),
(24,'fra24','sfdg','Prévu','2025-03-06 17:29:29','2025-03-06 21:00:00','2025-03-06 22:00:00','2025-03-06 17:29:29','2025-03-06 17:29:29',1),
(25,'zdfgbn','dsfgbn','Prévu','2025-03-06 17:34:26','2025-03-05 23:00:00','2025-03-07 23:00:00','2025-03-06 17:34:26','2025-03-06 17:34:26',1);
/*!40000 ALTER TABLE `tasks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `timesheets`
--

DROP TABLE IF EXISTS `timesheets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `timesheets` (
  `timesheet_id` int(11) NOT NULL AUTO_INCREMENT,
  `start_date` datetime NOT NULL,
  `end_date` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `construction_site_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`timesheet_id`),
  KEY `user_id` (`user_id`),
  KEY `construction_site_id` (`construction_site_id`),
  CONSTRAINT `timesheets_ibfk_79` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `timesheets_ibfk_80` FOREIGN KEY (`construction_site_id`) REFERENCES `construction_sites` (`construction_site_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `timesheets`
--

LOCK TABLES `timesheets` WRITE;
/*!40000 ALTER TABLE `timesheets` DISABLE KEYS */;
INSERT INTO `timesheets` VALUES
(1,'2025-03-06 15:51:45','2025-03-06 15:51:50','2025-03-06 15:51:45','2025-03-06 15:51:50',16,NULL),
(2,'2025-03-06 16:00:01','2025-03-06 16:00:07','2025-03-06 16:00:01','2025-03-06 16:00:07',16,NULL),
(3,'2025-03-06 16:00:14','2025-03-06 16:00:16','2025-03-06 16:00:14','2025-03-06 16:00:16',16,NULL),
(4,'2025-03-06 16:02:31','2025-03-06 16:02:32','2025-03-06 16:02:31','2025-03-06 16:02:32',16,NULL),
(5,'2025-03-06 16:03:33','2025-03-06 16:03:35','2025-03-06 16:03:33','2025-03-06 16:03:35',16,NULL),
(6,'2025-03-06 16:04:26','2025-03-06 16:04:27','2025-03-06 16:04:26','2025-03-06 16:04:27',16,NULL),
(7,'2025-03-06 16:31:24','2025-03-06 16:31:25','2025-03-06 16:31:24','2025-03-06 16:31:25',2,NULL),
(8,'2025-03-06 16:31:25','2025-03-06 16:31:43','2025-03-06 16:31:25','2025-03-06 16:31:43',2,NULL),
(9,'2025-03-06 17:05:06','2025-03-06 17:05:08','2025-03-06 17:05:06','2025-03-06 17:05:08',2,NULL),
(10,'2025-03-06 17:05:10','2025-03-06 17:05:10','2025-03-06 17:05:10','2025-03-06 17:05:10',2,NULL),
(11,'2025-03-06 17:05:11','2025-03-06 17:05:11','2025-03-06 17:05:11','2025-03-06 17:05:11',2,NULL),
(12,'2025-03-06 17:13:55','2025-03-06 17:13:57','2025-03-06 17:13:55','2025-03-06 17:13:57',2,NULL),
(13,'2025-03-06 17:14:01','2025-03-06 17:14:01','2025-03-06 17:14:01','2025-03-06 17:14:01',2,NULL),
(14,'2025-03-06 17:15:28','2025-03-06 17:15:28','2025-03-06 17:15:28','2025-03-06 17:15:28',2,NULL),
(15,'2025-03-06 17:16:28','2025-03-06 18:02:36','2025-03-06 17:16:28','2025-03-06 18:02:36',2,NULL),
(16,'2025-03-06 17:40:31',NULL,'2025-03-06 17:40:31','2025-03-06 17:40:31',2,NULL),
(17,'2025-03-06 18:02:34',NULL,'2025-03-06 18:02:34','2025-03-06 18:02:34',2,NULL);
/*!40000 ALTER TABLE `timesheets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_competences`
--

DROP TABLE IF EXISTS `user_competences`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_competences` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `user_id` int(11) NOT NULL,
  `competence_id` int(11) NOT NULL,
  PRIMARY KEY (`user_id`,`competence_id`),
  KEY `competence_id` (`competence_id`),
  CONSTRAINT `user_competences_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_competences_ibfk_2` FOREIGN KEY (`competence_id`) REFERENCES `competences` (`competence_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_competences`
--

LOCK TABLES `user_competences` WRITE;
/*!40000 ALTER TABLE `user_competences` DISABLE KEYS */;
INSERT INTO `user_competences` VALUES
('2025-03-05 17:08:13','2025-03-05 17:08:13',5,3),
('2025-03-05 17:08:13','2025-03-05 17:08:13',5,4),
('2025-03-05 17:08:13','2025-03-05 17:08:13',8,5),
('2025-03-05 17:08:13','2025-03-05 17:08:13',8,6),
('2025-03-05 17:08:04','2025-03-05 17:08:04',9,11),
('2025-03-05 17:08:04','2025-03-05 17:08:04',9,12),
('2025-03-05 17:08:04','2025-03-05 17:08:04',9,13),
('2025-03-05 17:08:04','2025-03-05 17:08:04',9,14),
('2025-03-05 17:08:04','2025-03-05 17:08:04',11,11),
('2025-03-05 17:08:04','2025-03-05 17:08:04',11,12),
('2025-03-05 17:08:04','2025-03-05 17:08:04',11,13),
('2025-03-05 17:08:04','2025-03-05 17:08:04',11,14),
('2025-03-05 17:08:04','2025-03-05 17:08:04',14,11),
('2025-03-05 17:08:04','2025-03-05 17:08:04',14,12),
('2025-03-05 17:08:04','2025-03-05 17:08:04',14,13),
('2025-03-05 17:08:04','2025-03-05 17:08:04',14,14),
('2025-03-05 17:08:04','2025-03-05 17:08:04',15,11),
('2025-03-05 17:08:04','2025-03-05 17:08:04',15,12),
('2025-03-05 17:08:04','2025-03-05 17:08:04',15,13),
('2025-03-05 17:08:04','2025-03-05 17:08:04',15,14),
('2025-03-05 17:08:13','2025-03-05 17:08:13',16,8),
('2025-03-05 17:08:13','2025-03-05 17:08:13',16,9),
('2025-03-05 17:08:13','2025-03-05 17:08:13',17,3),
('2025-03-05 17:08:13','2025-03-05 17:08:13',17,6),
('2025-03-05 17:08:13','2025-03-05 17:08:13',18,2),
('2025-03-05 17:08:13','2025-03-05 17:08:13',18,10),
('2025-03-05 17:08:13','2025-03-05 17:08:13',19,5),
('2025-03-05 17:08:13','2025-03-05 17:08:13',19,7);
/*!40000 ALTER TABLE `user_competences` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_tasks`
--

DROP TABLE IF EXISTS `user_tasks`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_tasks` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `user_id` int(11) NOT NULL,
  `task_id` int(11) NOT NULL,
  PRIMARY KEY (`user_id`,`task_id`),
  KEY `task_id` (`task_id`),
  CONSTRAINT `user_tasks_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_tasks_ibfk_2` FOREIGN KEY (`task_id`) REFERENCES `tasks` (`task_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_tasks`
--

LOCK TABLES `user_tasks` WRITE;
/*!40000 ALTER TABLE `user_tasks` DISABLE KEYS */;
INSERT INTO `user_tasks` VALUES
('2025-03-06 17:34:26','2025-03-06 17:34:26',8,25),
('2025-03-06 12:47:04','2025-03-06 12:47:04',9,19),
('2025-03-06 17:29:29','2025-03-06 17:29:29',9,24),
('2025-03-06 17:29:29','2025-03-06 17:29:29',11,24),
('2025-03-06 12:45:28','2025-03-06 12:45:28',14,18),
('2025-03-06 14:14:44','2025-03-06 14:14:44',14,20),
('2025-03-06 14:24:54','2025-03-06 14:24:54',16,21),
('2025-03-06 14:44:07','2025-03-06 14:44:07',16,22),
('2025-03-06 17:28:36','2025-03-06 17:28:36',17,23),
('2025-03-06 14:44:07','2025-03-06 14:44:07',18,22);
/*!40000 ALTER TABLE `user_tasks` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `user_id` int(11) NOT NULL AUTO_INCREMENT,
  `firstname` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `numberphone` varchar(20) NOT NULL,
  `profile_picture` varchar(255) DEFAULT NULL,
  `role` enum('Admin','Worker','Manager') NOT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `numberphone` (`numberphone`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `numberphone_2` (`numberphone`),
  UNIQUE KEY `numberphone_3` (`numberphone`),
  UNIQUE KEY `numberphone_4` (`numberphone`),
  UNIQUE KEY `numberphone_5` (`numberphone`),
  UNIQUE KEY `numberphone_6` (`numberphone`),
  UNIQUE KEY `numberphone_29` (`numberphone`),
  UNIQUE KEY `numberphone_30` (`numberphone`),
  UNIQUE KEY `numberphone_31` (`numberphone`),
  UNIQUE KEY `email_32` (`email`),
  UNIQUE KEY `email_2` (`email`),
  UNIQUE KEY `numberphone_7` (`numberphone`),
  UNIQUE KEY `email_3` (`email`),
  UNIQUE KEY `numberphone_8` (`numberphone`),
  UNIQUE KEY `email_4` (`email`),
  UNIQUE KEY `numberphone_9` (`numberphone`),
  UNIQUE KEY `email_5` (`email`),
  UNIQUE KEY `numberphone_10` (`numberphone`),
  UNIQUE KEY `email_6` (`email`),
  UNIQUE KEY `numberphone_11` (`numberphone`),
  UNIQUE KEY `email_7` (`email`),
  UNIQUE KEY `numberphone_12` (`numberphone`),
  UNIQUE KEY `email_8` (`email`),
  UNIQUE KEY `numberphone_13` (`numberphone`),
  UNIQUE KEY `email_9` (`email`),
  UNIQUE KEY `numberphone_14` (`numberphone`),
  UNIQUE KEY `email_10` (`email`),
  UNIQUE KEY `numberphone_15` (`numberphone`),
  UNIQUE KEY `email_11` (`email`),
  UNIQUE KEY `numberphone_16` (`numberphone`),
  UNIQUE KEY `email_12` (`email`),
  UNIQUE KEY `numberphone_17` (`numberphone`),
  UNIQUE KEY `email_13` (`email`),
  UNIQUE KEY `numberphone_18` (`numberphone`),
  UNIQUE KEY `email_14` (`email`),
  UNIQUE KEY `numberphone_19` (`numberphone`),
  UNIQUE KEY `email_15` (`email`),
  UNIQUE KEY `numberphone_20` (`numberphone`),
  UNIQUE KEY `email_16` (`email`),
  UNIQUE KEY `numberphone_21` (`numberphone`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES
(2,'Hassan','Zboo','hassan.boucherit@gmail.com','$2b$10$usOGXsmwdZrOm8sf/WSxBOhuzmFP7nJYvAuftIAxuaQYuauEpnElC',NULL,'0000-00-00 00:00:00','2025-03-06 17:09:10','0766457390','profile-1741280950376.jpg','Admin'),
(3,'Maxence','PICAULT','Maxence@example.com','$2b$10$3gc9mmptQXxlb96kCjGyEeBgdmkAwJBkc8/RQjd4IiCgvskJavr6C','2025-03-03 23:02:27','2025-03-03 23:02:27','2025-03-03 23:02:27','0766457338',NULL,'Admin'),
(5,'Anaïs','UZAN','anais.uzan@example.com','$2b$10$nbYpwe27XEZhr102k6ENouHksg6DksorcQlGXmLqfI.8IjMG5ZWKG','2025-03-04 16:37:39','2025-03-04 16:37:39','2025-03-04 16:37:39','0766457302',NULL,'Admin'),
(7,'Franklin','VERSAYO','Franklin.VERSAYO@example.com','$2b$10$2rPg/Gdq9bZ0PjaFXfWkz.5ShFxcp4TzegsyF0kps33UVx7L69ENO','2025-03-04 16:38:20','2025-03-04 16:38:20','2025-03-04 16:38:20','0766457307',NULL,'Admin'),
(8,'Sophie','MARTIN','sophie.martin@example.com','$2b$10$nqMI.VdCy6nixolcrX6Bd.KN4AZoKRr9qxylhF3JYN16z2DVuIb4e','2025-03-04 16:38:31','2025-03-04 16:38:31','2025-03-04 16:38:31','0766457303',NULL,'Worker'),
(9,'Thomas','LEFEVRE','thomas.lefevre@example.com','$2b$10$34057sIuJrvk3X3rsStEYeFicfdimORfa3HZNtHu.CjGaZmWRddzG','2025-03-04 16:38:37','2025-03-04 16:38:37','2025-03-06 14:39:27','0766457304','profile-1741271967050.jpeg','Manager'),
(11,'Lucas','BERNARD','lucas.bernard@example.com','$2b$10$CM1ciVDfo5AoE9aP/X27peFKtklxP.SkIOySS8PGtfeIpyDkCDDRC','2025-03-04 16:38:46','2025-03-04 16:38:46','2025-03-04 16:38:46','0766457306',NULL,'Manager'),
(14,'Emma','GIRAUD','emma.giraud@example.com','$2b$10$f8yXsTJcI63KLYmZeneGweet9a85isRIZAzdxrcVtoewnxHCuSxVG','2025-03-04 16:39:03','2025-03-04 16:39:03','2025-03-06 12:42:04','0766457378','profile-1741264924766.jpeg','Worker'),
(15,'Antoine','ROUSS','antoine.rousseau@example.com','$2b$10$HkNwK06Np3SM2oG9Lb9OWuOgb6EYVLvg/hnnuITPynT60djsx1XIC','2025-03-04 16:39:10','2025-03-04 16:39:10','2025-03-06 08:39:54','076','profile-1741250394611.jpeg','Manager'),
(16,'Julie','DUMONT','julie.dumont@example.com','$2b$10$G2Ft6dqY1DIUggRnjYEvf.4SJv0gAA5byt2RaGs5pn/gWpBDDJ4X.','2025-03-04 16:39:16','2025-03-04 16:39:16','2025-03-06 14:41:25','0766457309','profile-1741272085166.jpg','Worker'),
(17,'Camille','LOUIS','camille.louis@example.com','$2b$10$nZAI4YGjniCrOR74mhf9Nunsso1X0gTiSc9oJMmQptQDVh32/.hSW','2025-03-04 16:39:20','2025-03-04 16:39:20','2025-03-04 16:39:20','0766457311',NULL,'Manager'),
(18,'Nico','GAR','nicolas.garnier@example.com','$2b$10$UCwMXCjvtkXREQPDuiSjJu554s7LC3nsfHgn4famAq/Bbjqay6nGa','2025-03-04 16:39:24','2025-03-04 16:39:24','2025-03-06 02:54:46','0766457312','profile-1741229410184.PNG','Worker'),
(19,'Mélanie','GUERIN','melanie.guerin@example.com','$2b$10$QXBI4juijFehar65TV1hAeaO.Vww7v6FQj7QFtXJx4Xzk7tTIKVo.','2025-03-04 16:39:29','2025-03-04 16:39:29','2025-03-04 16:39:29','0766457313',NULL,'Manager');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-03-06 19:26:44
