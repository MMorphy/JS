CREATE DATABASE  IF NOT EXISTS `jsbaza` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `jsbaza`;
-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: jsbaza
-- ------------------------------------------------------
-- Server version	5.7.21-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `category`
--

DROP TABLE IF EXISTS `category`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `category` (
  `categoryId` int(11) NOT NULL AUTO_INCREMENT,
  `categoryName` varchar(45) NOT NULL,
  PRIMARY KEY (`categoryId`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=cp1251;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category`
--

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` VALUES (6,'Food'),(7,'Furniture'),(8,'Cutlery'),(9,'Electronics'),(10,'Materials'),(11,'Drinks');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `item`
--

DROP TABLE IF EXISTS `item`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `item` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `price` decimal(7,2) NOT NULL DEFAULT '0.00',
  `available` int(11) DEFAULT '0',
  `category_id` int(11) NOT NULL,
  PRIMARY KEY (`id`,`category_id`),
  KEY `category_id_idx` (`category_id`),
  CONSTRAINT `category_id` FOREIGN KEY (`category_id`) REFERENCES `category` (`categoryId`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=cp1251;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `item`
--

LOCK TABLES `item` WRITE;
/*!40000 ALTER TABLE `item` DISABLE KEYS */;
INSERT INTO `item` VALUES (16,'Cevapi',25.00,10,6),(17,'Lignje',30.00,32,6),(18,'Kruh',6.00,15,6),(19,'Grickalice',13.00,57,6),(20,'Stolac',120.00,12,7),(21,'Stol',360.00,5,7),(22,'Kauc',540.00,7,7),(23,'Vitrina',470.00,2,7),(24,'Cola',16.00,150,11),(25,'Sprite',16.00,200,11),(26,'Voda',9.00,400,11),(27,'Pivo',13.00,147,11),(28,'Vilice',12.00,149,8),(29,'Nozevi',11.00,149,8),(30,'Zlice',11.00,149,8),(31,'Drvo',5.00,784,10),(32,'Zeljezo',9.00,671,10),(33,'Stiropor',3.10,1425,10),(34,'Cip',47.00,124,9),(35,'Tranzistor',3.80,438,9),(36,'Kondenzator',7.10,82,9);
/*!40000 ALTER TABLE `item` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `orderTS` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `address` varchar(45) NOT NULL,
  `deliveryTime` datetime NOT NULL,
  `finished` tinyint(4) DEFAULT '0',
  `user_username` varchar(32) NOT NULL,
  `item_id` int(11) NOT NULL,
  `itemAmount` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`,`user_username`,`item_id`),
  KEY `user_username_idx` (`user_username`),
  KEY `item_id_idx` (`item_id`),
  CONSTRAINT `item_id` FOREIGN KEY (`item_id`) REFERENCES `item` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `user_username` FOREIGN KEY (`user_username`) REFERENCES `user` (`username`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=cp1251;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `username` varchar(32) NOT NULL,
  `password` varchar(128) NOT NULL,
  `last_touch` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `admin` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=cp1251;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('12345','$2b$10$Y5zDb7WXPOgs2LR.cI6Ju.J70mMJ2tFOeiej/TcBQR3cYtBi.7SWe','2019-07-03 12:59:52',0),('admin','$2b$10$DgXJpzvZpenZzuXLRpwpJuljefdCbNCViGFjBY9zB59WYFBk27upa','2019-07-02 09:54:53',1),('master','$2b$10$93vKO3q/WUSphd3zNJIt6OgX5vwr8kdgE991qrw0Zkgc3p1T/1HG2','2019-07-02 11:00:48',1),('operator','$2b$10$vBQV5cjM63.OJUCY7zPCROzfPeLYZWJ.OR4nVj/LyUIx2Xbnon/J6','2019-07-04 14:21:28',0),('private','$2b$10$bMEGcxClNUzRlyhRBvSkRuTmkMyUopXyrjcia7o5TzSlMwy79EoaS','2019-07-04 14:22:16',0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-07-04 17:37:05
