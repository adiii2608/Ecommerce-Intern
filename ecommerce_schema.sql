-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: ecommerce
-- ------------------------------------------------------
-- Server version	8.0.42

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cart` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `product_id` int NOT NULL,
  `quantity` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `cart_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` int DEFAULT NULL,
  `cart_data` json DEFAULT NULL,
  `total_amount` decimal(10,2) DEFAULT NULL,
  `order_instructions` text,
  `delivery_instructions` text,
  `payment_id` varchar(255) DEFAULT NULL,
  `payment_status` enum('SUCCESS','FAILED') DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `address_line1` varchar(255) DEFAULT NULL,
  `address_line2` varchar(255) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `state` varchar(100) DEFAULT NULL,
  `zip_code` varchar(20) DEFAULT NULL,
  `country` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,11,'[{\"id\": 6, \"image\": \"https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg\", \"price\": 168, \"title\": \"Solid Gold Petite Micropave \", \"rating\": {\"rate\": 3.9, \"count\": 70}, \"category\": \"jewelery\", \"quantity\": 1, \"description\": \"Satisfaction Guaranteed. Return or exchange any order within 30 days.Designed and sold by Hafeez Center in the United States. Satisfaction Guaranteed. Return or exchange any order within 30 days.\"}]',168.00,'ss','ss','pay_Qka3XOwv5okIj9','SUCCESS','2025-06-23 09:01:48','fggrg5g55','','Navi Mumbai','Maharashtra','400706','India'),(2,11,'[{\"id\": 2, \"image\": \"https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg\", \"price\": 22.3, \"title\": \"Mens Casual Premium Slim Fit T-Shirts \", \"rating\": {\"rate\": 4.1, \"count\": 259}, \"category\": \"men\'s clothing\", \"quantity\": 1, \"description\": \"Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.\"}]',22.30,'pack as gift','ring the bell','pay_QkiyzzZQAWIv1S','SUCCESS','2025-06-23 17:45:44','B-1705 Sea Queen Excellency CHS Sector 44A Seawoods Navi Mumbai Maharashtra','','Navi Mumbai','Maharashtra','400706','India'),(3,11,'[{\"id\": 3, \"image\": \"https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg\", \"price\": 55.99, \"title\": \"Mens Cotton Jacket\", \"rating\": {\"rate\": 4.7, \"count\": 500}, \"category\": \"men\'s clothing\", \"quantity\": 2, \"description\": \"great outerwear jackets for Spring/Autumn/Winter, suitable for many occasions, such as working, hiking, camping, mountain/rock climbing, cycling, traveling or other outdoors. Good gift choice for you or your family member. A warm hearted love to Father, husband or son in this thanksgiving or Christmas Day.\"}, {\"id\": 2, \"image\": \"https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg\", \"price\": 22.3, \"title\": \"Mens Casual Premium Slim Fit T-Shirts \", \"rating\": {\"rate\": 4.1, \"count\": 259}, \"category\": \"men\'s clothing\", \"quantity\": 1, \"description\": \"Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.\"}]',134.28,'Pack as a gift ','Leave at Doorstep','pay_Qllul35rySHl3W','SUCCESS','2025-06-26 09:16:46','1501, B block , SEA towers','','Navi Mumbai','Maharashtra','400706','India'),(4,11,'[{\"id\": 2, \"image\": \"https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg\", \"price\": 22.3, \"title\": \"Mens Casual Premium Slim Fit T-Shirts \", \"rating\": {\"rate\": 4.1, \"count\": 259}, \"category\": \"men\'s clothing\", \"quantity\": 1, \"description\": \"Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.\"}]',22.30,'pack as gift','ring the bell','pay_Qm6Yn9enVC69Xz','SUCCESS','2025-06-27 05:28:32','B-1705 Sea Queen Excellency CHS Sector 44A Seawoods Navi Mumbai Maharashtra','','Navi Mumbai','Maharashtra','400706','India');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sessions` (
  `session_id` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  `expires` int unsigned NOT NULL,
  `data` mediumtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  PRIMARY KEY (`session_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('1VHScsaVuCmd_PsylULY3qcPQTI4G-IC',1751015806,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":11,\"username\":\"testing1\"}}'),('Y9yVKOI-jGOFWDC0hZ6hCvQHaUMDY6_R',1751088513,'{\"cookie\":{\"originalMaxAge\":null,\"expires\":null,\"secure\":false,\"httpOnly\":true,\"path\":\"/\"},\"user\":{\"id\":11,\"username\":\"testing1\"}}');
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `full_name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(15) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'admin','1234','','',''),(2,'dsa','$2b$10$S.YKV7je3YlZiZYHaZUfQuz1syHsqUODYooLbHD4Ojd2HX83jiKw2','asda','asdasd','21323132'),(3,'adi','$2b$10$RzPSJEiuewPWT3IfQMM.BO4gwxu3Hp3AE9bVMdG2lfxZwfz5JD0Bm','dada','dada','2131312'),(4,'aditya','$2b$10$lAcnmDZn8nR6zvzS09cHKee/HTn1DaUInxyjt9iw07VriG/y9e5ny','dsadadsad','dasdsadas','1216849'),(7,'testuser','$2b$10$HiuPy0XYvGC9lC7hjlevbOUTFFV/x2TUl5rKR375wNASKuzQA2/ei','dadsa','adsa','43124'),(8,'adityag','$2b$10$vGreM7GkQ8KNQtr3ULqcNeGWTrj93.qmpQ.sLrxSF2VqSQyO/a/7O','aditya','dadada','323232'),(9,'adii','$2b$10$I9ZzWfMDnwGFKWkBcOrbn.FHC2qFgvvks0C8eN2TX1qtCfA1dB4n2','bduabd','dnsia','4545646'),(10,'testing','$2b$10$GyTNAa0K.C5C9CE4Fqn0jOQlJ.FXau6lrflNaZNuY8uZpTxfBNsAy','Adi','dsada@gmail.com','999292'),(11,'testing1','$2b$10$584jBBzby/9IhfbgoXvbPu8yop3mCvp5duSm5o6QdjwpOs.rvzZpy','testing','adi@gmail.com','1234567893');
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

-- Dump completed on 2025-07-30  0:12:41
