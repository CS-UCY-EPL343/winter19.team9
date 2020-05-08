-- phpMyAdmin SQL Dump
-- version 4.9.0.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: May 08, 2020 at 06:50 PM
-- Server version: 5.5.60-MariaDB
-- PHP Version: 7.1.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ffndb`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`ffndb`@`localhost` PROCEDURE `countClass` (IN `AccountID` INT(11))  NO SQL
SELECT COUNT(DISTINCT C.ClassID) AS countTotal
FROM ACCOUNT A 
JOIN Class C ON A.Coach_ID=C.Coach_ID
WHERE A.AccountID=AccountID$$

CREATE DEFINER=`ffndb`@`localhost` PROCEDURE `countPT` (IN `AccountID` INT(11))  NO SQL
SELECT COUNT(PT.PT_ID) AS countTotal
FROM ACCOUNT A 
JOIN PERSONAL_TRAINING PT ON A.Coach_ID=PT.Coach_ID
WHERE A.AccountID=AccountID$$

CREATE DEFINER=`ffndb`@`localhost` PROCEDURE `getAgeRange` ()  NO SQL
SELECT
    SUM(IF(age < 20,1,0)) as 'Under 20',
    SUM(IF(age BETWEEN 20 and 29,1,0)) as '20 - 29',
    SUM(IF(age BETWEEN 30 and 39,1,0)) as '30 - 39',
    SUM(IF(age BETWEEN 40 and 49,1,0)) as '40 - 49',
    SUM(IF(age >=80, 1, 0)) as 'Over 50'
FROM `USERS`$$

CREATE DEFINER=`ffndb`@`localhost` PROCEDURE `getCoachesDayWork` ()  NO SQL
SELECT `COACH`.`Coach_ID`, `COACH`.`CoachName`, `COACH`.`Surname`, `Day`, SUM(`Num_of_Participant`) AS "Participants" FROM `Class` JOIN `COACH` ON `COACH`.`Coach_ID` = `Class`.`Coach_ID` GROUP BY `Class`.`Coach_ID`, `Day`$$

CREATE DEFINER=`ffndb`@`localhost` PROCEDURE `getCoachesPersonalWork` ()  NO SQL
SELECT `COACH`.`Coach_ID`, `COACH`.`CoachName`, `COACH`.`Surname`, `PERSONAL_TRAINING`.`Day`, COUNT(`User_ID`) AS "Participants" FROM `PERSONAL_TRAINING` JOIN `COACH` ON `COACH`.`Coach_ID` = `PERSONAL_TRAINING`.`Coach_ID` GROUP BY `PERSONAL_TRAINING`.`Coach_ID`, `Day`$$

CREATE DEFINER=`ffndb`@`localhost` PROCEDURE `getMessage` (IN `messageId` INT(11))  NO SQL
SELECT
	`Messages`.`Message_ID`,
    `Messages`.`Title`,
    `Messages`.`Message`,
    `Messages`.`Timestamp`,
    `Messages`.`hasSeen`,
    from_array.level AS From_level,
    to_array.level AS To_level,
    COALESCE(u.Name, c.CoachName, o.Name) AS From_Name,
    COALESCE(u.Surname, c.Surname, o.Surname) AS From_Surname,
    COALESCE(u2.Name, c2.CoachName, o2.Name) AS To_Name,
    COALESCE(u2.Surname, c2.Surname, o2.Surname) AS To_Surname
FROM
    `Messages`
INNER JOIN `ACCOUNT` AS from_array
ON
    `Messages`.`From_ID` = from_array.`AccountID`
INNER JOIN `ACCOUNT` AS to_array
ON
    `Messages`.`To_ID` = to_array.`AccountID`
LEFT JOIN `USERS` AS u
ON
	from_array.User_ID IS NOT NULL AND from_array.User_ID = u.`User_ID`
LEFT JOIN `COACH` AS c
ON
	from_array.Coach_ID IS NOT NULL AND from_array.Coach_ID = c.`Coach_ID`
LEFT JOIN `OWNER` AS o
ON
	from_array.Owner_ID IS NOT NULL AND from_array.Owner_ID = o.Owner_ID
LEFT JOIN `USERS` AS u2
ON
	to_array.User_ID IS NOT NULL AND to_array.User_ID = u2.`User_ID`
LEFT JOIN `COACH` AS c2
ON
	to_array.Coach_ID IS NOT NULL AND to_array.Coach_ID = c2.`Coach_ID`
LEFT JOIN `OWNER` AS o2
ON
	to_array.Owner_ID IS NOT NULL AND to_array.Owner_ID = o2.Owner_ID
WHERE
    `Messages`.`Message_ID` = messageId$$

CREATE DEFINER=`ffndb`@`localhost` PROCEDURE `getMessages` (IN `username` VARCHAR(30))  NO SQL
SELECT *
FROM (
    SELECT
        `Messages`.`Message_ID`,
        `Messages`.`Title`,
        `Messages`.`Message`,
        `Messages`.`Timestamp`,
        `Messages`.`hasSeen`,
        from_array.level AS From_level,
        to_array.level AS To_level,
        COALESCE(u.Name, c.CoachName, o.Name) AS From_Name,
        COALESCE(u.Surname, c.Surname, o.Surname) AS From_Surname,
        COALESCE(u2.Name, c2.CoachName, o2.Name) AS To_Name,
        COALESCE(u2.Surname, c2.Surname, o2.Surname) AS To_Surname
    FROM
        `Messages`
    INNER JOIN `ACCOUNT` AS from_array
    ON
        `Messages`.`From_ID` = from_array.`AccountID`
    INNER JOIN `ACCOUNT` AS to_array
    ON
        `Messages`.`To_ID` = to_array.`AccountID`
    LEFT JOIN `USERS` AS u
    ON
        from_array.User_ID IS NOT NULL AND from_array.User_ID = u.`User_ID`
    LEFT JOIN `COACH` AS c
    ON
        from_array.Coach_ID IS NOT NULL AND from_array.Coach_ID = c.`Coach_ID`
    LEFT JOIN `OWNER` AS o
    ON
        from_array.Owner_ID IS NOT NULL AND from_array.Owner_ID = o.Owner_ID
    LEFT JOIN `USERS` AS u2
    ON
        to_array.User_ID IS NOT NULL AND to_array.User_ID = u2.`User_ID`
    LEFT JOIN `COACH` AS c2
    ON
        to_array.Coach_ID IS NOT NULL AND to_array.Coach_ID = c2.`Coach_ID`
    LEFT JOIN `OWNER` AS o2
    ON
        to_array.Owner_ID IS NOT NULL AND to_array.Owner_ID = o2.Owner_ID
    WHERE
        from_array.`username` = username OR to_array.`username` = username

    UNION DISTINCT

    SELECT
        `Messages`.`Message_ID`,
        `Messages`.`Title`,
        `Messages`.`Message`,
        `Messages`.`Timestamp`,
        `Messages`.`hasSeen`,
        from_array.level AS From_level,
        to_array.type AS To_level,
        COALESCE(u.Name, c.CoachName, o.Name) AS From_Name,
        COALESCE(u.Surname, c.Surname, o.Surname) AS From_Surname,
        COALESCE(to_array.name) AS To_Name,
        COALESCE(to_array.surname) AS To_Surname
    FROM
        `Messages`
    INNER JOIN `ACCOUNT` AS from_array
    ON
        `Messages`.`From_ID` = from_array.`AccountID`
    INNER JOIN `DELETED_ACCOUNT` AS to_array
    ON
        `Messages`.`ToDeletedID` = to_array.`AccountID`
    LEFT JOIN `USERS` AS u
    ON
        from_array.User_ID IS NOT NULL AND from_array.User_ID = u.`User_ID`
    LEFT JOIN `COACH` AS c
    ON
        from_array.Coach_ID IS NOT NULL AND from_array.Coach_ID = c.`Coach_ID`
    LEFT JOIN `OWNER` AS o
    ON
        from_array.Owner_ID IS NOT NULL AND from_array.Owner_ID = o.Owner_ID
    WHERE
        from_array.`username` = username

    UNION DISTINCT

	SELECT
        `Messages`.`Message_ID`,
        `Messages`.`Title`,
        `Messages`.`Message`,
        `Messages`.`Timestamp`,
        `Messages`.`hasSeen`,
        from_array.type AS From_level,
        to_array.level AS To_level,
        COALESCE(from_array.name) AS From_Name,
        COALESCE(from_array.surname) AS From_Surname,
        COALESCE(u2.Name, c2.CoachName, o2.Name) AS To_Name,
        COALESCE(u2.Surname, c2.Surname, o2.Surname) AS To_Surname
    FROM
        `Messages`
    INNER JOIN `DELETED_ACCOUNT` AS from_array
    ON
        `Messages`.`FromDeletedID` = from_array.`AccountID`
    INNER JOIN `ACCOUNT` AS to_array
    ON
        `Messages`.`To_ID` = to_array.`AccountID`
    LEFT JOIN `USERS` AS u2
    ON
        to_array.User_ID IS NOT NULL AND to_array.User_ID = u2.`User_ID`
    LEFT JOIN `COACH` AS c2
    ON
        to_array.Coach_ID IS NOT NULL AND to_array.Coach_ID = c2.`Coach_ID`
    LEFT JOIN `OWNER` AS o2
    ON
        to_array.Owner_ID IS NOT NULL AND to_array.Owner_ID = o2.Owner_ID
    WHERE
        to_array.`username` = username
) AS final
ORDER BY `Message_ID` ASC$$

CREATE DEFINER=`ffndb`@`localhost` PROCEDURE `getUnreadMessagesCount` (IN `username` VARCHAR(30))  NO SQL
SELECT
	COUNT(*) AS TotalMessages
FROM
    `Messages`
INNER JOIN `ACCOUNT` AS from_array
ON
    `Messages`.`From_ID` = from_array.`AccountID`
INNER JOIN `ACCOUNT` AS to_array
ON
    `Messages`.`To_ID` = to_array.`AccountID`
WHERE
    to_array.`username` = username AND `Messages`.`hasSeen` = 0$$

CREATE DEFINER=`ffndb`@`localhost` PROCEDURE `searchAnnoucment` (IN `username` VARCHAR(30))  SELECT AN.TIMESTAMP	, C.Name , C.Surname , AN.Message
FROM ACCOUNT A, ANNOUNCEMENT AN, COACH C
WHERE A.username=username AND AN.User_ID=A.User_ID AND C.Coach_ID=AN.Coach_ID$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `ACCOUNT`
--

CREATE TABLE `ACCOUNT` (
  `AccountID` int(11) NOT NULL,
  `username` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `password` varchar(300) COLLATE utf8mb4_unicode_ci NOT NULL,
  `level` varchar(6) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Owner_ID` int(11) DEFAULT NULL,
  `Coach_ID` int(11) DEFAULT NULL,
  `User_ID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `ACCOUNT`
--

INSERT INTO `ACCOUNT` (`AccountID`, `username`, `password`, `level`, `Owner_ID`, `Coach_ID`, `User_ID`) VALUES
(73, 'headcoach01', '1c8cfe06f21098b11f4dc235ed7a6003b9b704ae07b15a8251706bc3d5a15a58', 'coach', NULL, 3, NULL),
(97, 'its.giff', '1c8cfe06f21098b11f4dc235ed7a6003b9b704ae07b15a8251706bc3d5a15a58', 'admin', 10, NULL, NULL),
(149, 'headcoach02', '1c8cfe06f21098b11f4dc235ed7a6003b9b704ae07b15a8251706bc3d5a15a58', 'coach', NULL, 20, NULL);
--
-- Table structure for table `ANNOUNCEMENT`
--

CREATE TABLE `ANNOUNCEMENT` (
  `ANNOUNCEMENT_ID` int(10) NOT NULL,
  `Title` varchar(25) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Message` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `TIMESTAMP` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `isPrivate` tinyint(1) NOT NULL,
  `isActive` tinyint(1) NOT NULL,
  `User_ID` int(11) DEFAULT NULL,
  `Coach_ID` int(11) DEFAULT NULL,
  `Admin_ID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


--
-- Table structure for table `Class`
--

CREATE TABLE `Class` (
  `ClassID` int(11) NOT NULL,
  `Name` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Day` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Time` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Num_of_Participant` int(11) NOT NULL,
  `MaxNumParticipants` int(3) NOT NULL DEFAULT '22',
  `Coach_ID` int(11) NOT NULL,
  `DayCode` int(11) NOT NULL,
  `TimeCode` int(11) NOT NULL,
  `TimeCodeEnd` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


--
-- Table structure for table `COACH`
--

CREATE TABLE `COACH` (
  `Coach_ID` int(11) NOT NULL,
  `CoachName` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Surname` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Bdate` date NOT NULL,
  `Gender` tinyint(4) NOT NULL,
  `Email` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `COACH`
--

INSERT INTO `COACH` (`Coach_ID`, `CoachName`, `Surname`, `Bdate`, `Gender`, `Email`) VALUES
(3, 'Marinos', 'Papakiriakou', '1987-04-04', 1, 'headcoach01@test.com'),
(20, 'Andreas', 'Ketwnis', '1979-04-07', 1, 'ketwnis@gmail.com'),

-- --------------------------------------------------------

--
-- Table structure for table `DELETED_ACCOUNT`
--

CREATE TABLE `DELETED_ACCOUNT` (
  `AccountID` int(11) NOT NULL,
  `name` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `surname` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `type` varchar(6) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `DELETED_ACCOUNT`
--


--
-- Table structure for table `ENROL`
--

CREATE TABLE `ENROL` (
  `ENROLMENT_ID` int(11) NOT NULL,
  `CLASS_ID` int(11) NOT NULL,
  `User_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Triggers `ENROL`
--
DELIMITER $$
CREATE TRIGGER `UPDATE_NUM_PART_UNROLL` AFTER DELETE ON `ENROL` FOR EACH ROW UPDATE Class C SET C.Num_of_Participant=C.Num_of_Participant-1
WHERE C.ClassID = OLD.CLASS_ID
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `Update_Class_Number_Of_Participants` AFTER INSERT ON `ENROL` FOR EACH ROW UPDATE Class C SET C.Num_of_Participant=C.Num_of_Participant+1
WHERE C.ClassID=(SELECT CLASS_ID
                 FROM ENROL E
                 ORDER BY E.ENROLMENT_ID DESC
                 LIMIT 1
                )
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `EnrollArchive`
--

CREATE TABLE `EnrollArchive` (
  `ID` int(11) NOT NULL,
  `CLASS_ID` int(11) NOT NULL,
  `ENROLL_ID` int(11) NOT NULL,
  `USER_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `INVOICE`
--

CREATE TABLE `INVOICE` (
  `I_ID` int(11) NOT NULL,
  `DateOfInvoice` date NOT NULL,
  `M_ID` int(11) NOT NULL,
  `P_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `MEMBERSHIP`
--

CREATE TABLE `MEMBERSHIP` (
  `M_ID` int(11) NOT NULL,
  `EndDay` date NOT NULL,
  `StartDay` date NOT NULL,
  `sevenDaysLeft` bit(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;



--
-- Table structure for table `Messages`
--

CREATE TABLE `Messages` (
  `Message_ID` int(11) NOT NULL,
  `Title` varchar(35) COLLATE utf8_unicode_ci NOT NULL,
  `Message` varchar(500) COLLATE utf8_unicode_ci NOT NULL,
  `Timestamp` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `From_ID` int(11) DEFAULT NULL,
  `To_ID` int(11) DEFAULT NULL,
  `hasSeen` tinyint(1) NOT NULL DEFAULT '0',
  `FromDeletedID` int(11) DEFAULT NULL,
  `ToDeletedID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;



--
-- Table structure for table `OWNER`
--

CREATE TABLE `OWNER` (
  `Owner_ID` int(11) NOT NULL,
  `Name` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Surname` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Bdate` date NOT NULL,
  `Gender` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Email` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `OWNER`
--

INSERT INTO `OWNER` (`Owner_ID`, `Name`, `Surname`, `Bdate`, `Gender`, `Email`) VALUES
(10, 'Giorgios', 'Frantzeskos', '1983-11-11', '1', 'gfrantzeskos@gmail.com');

--
-- Table structure for table `PACKAGES`
--

CREATE TABLE `PACKAGES` (
  `P_ID` int(11) NOT NULL,
  `Price` int(11) NOT NULL,
  `Description` varchar(100) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `PageVisit`
--

CREATE TABLE `PageVisit` (
  `HOME_PAGE` int(15) DEFAULT '0',
  `CLASSES` int(15) DEFAULT '0',
  `ABOUT_US` int(15) DEFAULT '0',
  `PROFILE_USER` int(15) DEFAULT '0',
  `PROFILE_COACH` int(15) DEFAULT '0',
  `PROFILE_ADMIN` int(15) DEFAULT '0',
  `ADMIN_DASHBOARD` int(15) DEFAULT '0',
  `LOGGED_IN` int(15) DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;


--
-- Table structure for table `PERSONAL_TRAINING`
--

CREATE TABLE `PERSONAL_TRAINING` (
  `PT_ID` int(11) NOT NULL,
  `Day` int(12) NOT NULL,
  `Time` int(12) NOT NULL,
  `Coach_ID` int(11) NOT NULL,
  `User_ID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `PIC`
--

CREATE TABLE `PIC` (
  `img_id` int(11) NOT NULL,
  `image` longblob NOT NULL,
  `User_ID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


--
-- Table structure for table `USERS`
--

CREATE TABLE `USERS` (
  `User_ID` int(11) NOT NULL,
  `Name` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Surname` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Bdate` date NOT NULL,
  `Gender` tinyint(4) NOT NULL,
  `Email` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Medical_History` varchar(400) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `Age` int(11) NOT NULL,
  `Verify` bit(1) NOT NULL,
  `Token` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
  `Membership_ID` int(11) DEFAULT NULL,
  `Phone_Number` varchar(30) COLLATE utf8mb4_unicode_ci NOT NULL,
  `activeExpires` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;


--
-- Indexes for table `ACCOUNT`
--
ALTER TABLE `ACCOUNT`
  ADD PRIMARY KEY (`AccountID`),
  ADD UNIQUE KEY `username` (`username`),
  ADD KEY `Coach_ID` (`Coach_ID`),
  ADD KEY `User_ID` (`User_ID`),
  ADD KEY `Owner_ID` (`Owner_ID`);

--
-- Indexes for table `ANNOUNCEMENT`
--
ALTER TABLE `ANNOUNCEMENT`
  ADD PRIMARY KEY (`ANNOUNCEMENT_ID`),
  ADD KEY `User_ID` (`User_ID`),
  ADD KEY `Coach_ID` (`Coach_ID`),
  ADD KEY `ANNOUNCEMENT_ibfk_3` (`Admin_ID`);

--
-- Indexes for table `Class`
--
ALTER TABLE `Class`
  ADD PRIMARY KEY (`ClassID`),
  ADD KEY `CLASS_FOREIGN1` (`Coach_ID`);

--
-- Indexes for table `COACH`
--
ALTER TABLE `COACH`
  ADD PRIMARY KEY (`Coach_ID`);

--
-- Indexes for table `DELETED_ACCOUNT`
--
ALTER TABLE `DELETED_ACCOUNT`
  ADD PRIMARY KEY (`AccountID`);

--
-- Indexes for table `ENROL`
--
ALTER TABLE `ENROL`
  ADD PRIMARY KEY (`ENROLMENT_ID`),
  ADD KEY `CLASS_ID_FOREIGN` (`CLASS_ID`),
  ADD KEY `USER_ID_FOREIGN` (`User_ID`);

--
-- Indexes for table `EnrollArchive`
--
ALTER TABLE `EnrollArchive`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `INVOICE`
--
ALTER TABLE `INVOICE`
  ADD PRIMARY KEY (`I_ID`),
  ADD KEY `M_ID` (`M_ID`),
  ADD KEY `P_ID` (`P_ID`);

--
-- Indexes for table `MEMBERSHIP`
--
ALTER TABLE `MEMBERSHIP`
  ADD PRIMARY KEY (`M_ID`);

--
-- Indexes for table `Messages`
--
ALTER TABLE `Messages`
  ADD PRIMARY KEY (`Message_ID`),
  ADD KEY `From_ID` (`From_ID`),
  ADD KEY `To_ID` (`To_ID`),
  ADD KEY `FromDeletedID` (`FromDeletedID`),
  ADD KEY `ToDeletedID` (`ToDeletedID`);

--
-- Indexes for table `OWNER`
--
ALTER TABLE `OWNER`
  ADD PRIMARY KEY (`Owner_ID`);

--
-- Indexes for table `PACKAGES`
--
ALTER TABLE `PACKAGES`
  ADD PRIMARY KEY (`P_ID`);

--
-- Indexes for table `PERSONAL_TRAINING`
--
ALTER TABLE `PERSONAL_TRAINING`
  ADD PRIMARY KEY (`PT_ID`),
  ADD KEY `Coach_ID` (`Coach_ID`),
  ADD KEY `User_ID` (`User_ID`);

--
-- Indexes for table `PIC`
--
ALTER TABLE `PIC`
  ADD PRIMARY KEY (`img_id`),
  ADD KEY `User_ID` (`User_ID`);

--
-- Indexes for table `USERS`
--
ALTER TABLE `USERS`
  ADD PRIMARY KEY (`User_ID`),
  ADD UNIQUE KEY `Token` (`Token`),
  ADD KEY `Membership_ID` (`Membership_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `ACCOUNT`
--
ALTER TABLE `ACCOUNT`
  MODIFY `AccountID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=216;

--
-- AUTO_INCREMENT for table `ANNOUNCEMENT`
--
ALTER TABLE `ANNOUNCEMENT`
  MODIFY `ANNOUNCEMENT_ID` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=256;

--
-- AUTO_INCREMENT for table `Class`
--
ALTER TABLE `Class`
  MODIFY `ClassID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `COACH`
--
ALTER TABLE `COACH`
  MODIFY `Coach_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=37;

--
-- AUTO_INCREMENT for table `ENROL`
--
ALTER TABLE `ENROL`
  MODIFY `ENROLMENT_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=194;

--
-- AUTO_INCREMENT for table `EnrollArchive`
--
ALTER TABLE `EnrollArchive`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `INVOICE`
--
ALTER TABLE `INVOICE`
  MODIFY `I_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `MEMBERSHIP`
--
ALTER TABLE `MEMBERSHIP`
  MODIFY `M_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `Messages`
--
ALTER TABLE `Messages`
  MODIFY `Message_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=158;

--
-- AUTO_INCREMENT for table `OWNER`
--
ALTER TABLE `OWNER`
  MODIFY `Owner_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=55;

--
-- AUTO_INCREMENT for table `PACKAGES`
--
ALTER TABLE `PACKAGES`
  MODIFY `P_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `PERSONAL_TRAINING`
--
ALTER TABLE `PERSONAL_TRAINING`
  MODIFY `PT_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=575;

--
-- AUTO_INCREMENT for table `PIC`
--
ALTER TABLE `PIC`
  MODIFY `img_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `USERS`
--
ALTER TABLE `USERS`
  MODIFY `User_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=157;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `ACCOUNT`
--
ALTER TABLE `ACCOUNT`
  ADD CONSTRAINT `ACCOUNT_ibfk_1` FOREIGN KEY (`Coach_ID`) REFERENCES `COACH` (`Coach_ID`),
  ADD CONSTRAINT `ACCOUNT_ibfk_2` FOREIGN KEY (`User_ID`) REFERENCES `USERS` (`User_ID`),
  ADD CONSTRAINT `ACCOUNT_ibfk_3` FOREIGN KEY (`Owner_ID`) REFERENCES `OWNER` (`Owner_ID`);

--
-- Constraints for table `ANNOUNCEMENT`
--
ALTER TABLE `ANNOUNCEMENT`
  ADD CONSTRAINT `ANNOUNCEMENT_ibfk_1` FOREIGN KEY (`User_ID`) REFERENCES `USERS` (`User_ID`),
  ADD CONSTRAINT `ANNOUNCEMENT_ibfk_2` FOREIGN KEY (`Coach_ID`) REFERENCES `COACH` (`Coach_ID`),
  ADD CONSTRAINT `ANNOUNCEMENT_ibfk_3` FOREIGN KEY (`Admin_ID`) REFERENCES `OWNER` (`Owner_ID`);

--
-- Constraints for table `Class`
--
ALTER TABLE `Class`
  ADD CONSTRAINT `CLASS_FOREIGN1` FOREIGN KEY (`Coach_ID`) REFERENCES `COACH` (`Coach_ID`);

--
-- Constraints for table `ENROL`
--
ALTER TABLE `ENROL`
  ADD CONSTRAINT `USER_ID_FOREIGN` FOREIGN KEY (`User_ID`) REFERENCES `USERS` (`User_ID`),
  ADD CONSTRAINT `CLASS_ID_FOREIGN` FOREIGN KEY (`CLASS_ID`) REFERENCES `Class` (`ClassID`);

--
-- Constraints for table `INVOICE`
--
ALTER TABLE `INVOICE`
  ADD CONSTRAINT `INVOICE_ibfk_1` FOREIGN KEY (`M_ID`) REFERENCES `MEMBERSHIP` (`M_ID`),
  ADD CONSTRAINT `INVOICE_ibfk_2` FOREIGN KEY (`P_ID`) REFERENCES `PACKAGES` (`P_ID`);

--
-- Constraints for table `Messages`
--
ALTER TABLE `Messages`
  ADD CONSTRAINT `Messages_ibfk_4` FOREIGN KEY (`ToDeletedID`) REFERENCES `DELETED_ACCOUNT` (`AccountID`),
  ADD CONSTRAINT `Messages_ibfk_1` FOREIGN KEY (`From_ID`) REFERENCES `ACCOUNT` (`AccountID`),
  ADD CONSTRAINT `Messages_ibfk_2` FOREIGN KEY (`To_ID`) REFERENCES `ACCOUNT` (`AccountID`),
  ADD CONSTRAINT `Messages_ibfk_3` FOREIGN KEY (`FromDeletedID`) REFERENCES `DELETED_ACCOUNT` (`AccountID`);

--
-- Constraints for table `PERSONAL_TRAINING`
--
ALTER TABLE `PERSONAL_TRAINING`
  ADD CONSTRAINT `PERSONAL_TRAINING_ibfk_1` FOREIGN KEY (`Coach_ID`) REFERENCES `COACH` (`Coach_ID`),
  ADD CONSTRAINT `PERSONAL_TRAINING_ibfk_2` FOREIGN KEY (`User_ID`) REFERENCES `USERS` (`User_ID`);

--
-- Constraints for table `PIC`
--
ALTER TABLE `PIC`
  ADD CONSTRAINT `PIC_ibfk_1` FOREIGN KEY (`User_ID`) REFERENCES `USERS` (`User_ID`);

--
-- Constraints for table `USERS`
--
ALTER TABLE `USERS`
  ADD CONSTRAINT `USERS_ibfk_1` FOREIGN KEY (`Membership_ID`) REFERENCES `MEMBERSHIP` (`M_ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
