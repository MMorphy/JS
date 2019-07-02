-- MySQL dump 10.13  Distrib 8.0.16, for Win64 (x86_64)
--
-- Host: localhost    Database: jsbaza
-- ------------------------------------------------------
-- Server version	8.0.16

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `user` (
  `username` varchar(32) NOT NULL,
  `password` varchar(128) NOT NULL,
  `create_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `admin` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=cp1251;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('11111','$2b$10$TAbJBiZ6d4aKskKxaDH8j.7zURSCkevUQNDRCMONp/twuv8CyaQWe','2019-07-02 13:04:36',0),('12345','$2b$10$rM3efog/Sc996cAgS8CNGObs0aPkRPEfsAK3u4RZHm76n96a82Rhi','2019-07-02 13:02:57',0),('22222','$2b$10$sbcbbYlOzIjo6wol6f6AeOn3MeumlcRjoneGADbdRJZBSxnBM6Oxq','2019-07-02 13:05:10',0),('admin','$2b$10$B9u6KElHhWnl8qxgK72s3uMGwRbtRXPmQ9qWsBJ4bOIo80JjIUU0u','2019-07-02 09:54:53',1),('master','$2b$10$Sf1H.kfm9x1mB9895P6IKepajMKKENNVUij/46UkCyA5H37ctAaz2','2019-07-02 11:00:48',1),('mirko2','$2b$10$DxFpowy5ssBdQ3C9p9sBGueCBAJA/TKPSF8OXu3qzuHjyIDpnIYky','2019-07-02 09:44:31',0),('oper','$2b$10$8YPuSyLFFkmbcbqDYmfP6.bfrANQFFnLOu048O24n12bEtnMBw.fm','2019-07-02 09:55:02',0),('private','$2b$10$jEWgPOTnh16ik18quXl6pOFHXsMS0dpiBIkuzkUMv4ViUT0aq.f3C','2019-07-02 11:00:16',0),('proba','$2b$10$O6peQf5Kj7pWtfFISTAxFet/qJTQfXvdX712.3qUXV/7L0YFP81wK','2019-07-02 13:05:40',0);
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

-- Dump completed on 2019-07-02 16:15:16
