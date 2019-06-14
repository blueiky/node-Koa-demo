-- MySQL dump 10.13  Distrib 5.7.24, for Win64 (x86_64)
--
-- Host: localhost    Database: moviehome
-- ------------------------------------------------------
-- Server version	5.7.24-log

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
-- Table structure for table `admins`
--

DROP TABLE IF EXISTS `admins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `admins` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(32) NOT NULL,
  `password` varchar(32) NOT NULL,
  `limit` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admins`
--

LOCK TABLES `admins` WRITE;
/*!40000 ALTER TABLE `admins` DISABLE KEYS */;
INSERT INTO `admins` VALUES (1,'moyu','71f556d3537460124b0fb5e5bbdfd5c8',1),(2,'hlz','e53d67bf14018e1f6365977ad1720d0f',1),(3,'root','71f556d3537460124b0fb5e5bbdfd5c8',2);
/*!40000 ALTER TABLE `admins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `movielist`
--

DROP TABLE IF EXISTS `movielist`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `movielist` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `mname` varchar(100) NOT NULL,
  `maker` varchar(50) DEFAULT NULL,
  `url` varchar(100) DEFAULT NULL,
  `img` varchar(100) DEFAULT NULL,
  `playtimes` int(11) DEFAULT NULL,
  `isrecommend` int(11) DEFAULT NULL,
  `onlinetime` varchar(32) DEFAULT NULL,
  `brief` text,
  `tid` int(11) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movielist`
--

LOCK TABLES `movielist` WRITE;
/*!40000 ALTER TABLE `movielist` DISABLE KEYS */;
INSERT INTO `movielist` VALUES (1,'夏洛特烦恼','jan','movies/hu.mp4','images/movies/xltfn.png',187,0,'2015-1-13 12:12:00','昔日校花秋雅的婚礼正在隆重举行，学生时代暗恋秋雅的夏洛看着周围事业成功的老同学，心中泛起酸味，借着七分醉意',1),(2,'我是证人','Tom','movies/hu.mp4','images/movies/wszr.png',99,0,'2015-2-12 12:12:00',' 见习女警因自己的失误，亲眼目睹了弟弟的死亡，自己也双目失明。也许是失明刺激了其它感官的活跃 ',5),(3,'第三种爱情','jan','movies/hu.mp4','images/movies/dszaq.png',97,0,'2015-3-14 12:12:00','失婚女律师邹雨在回程的飞机上失声痛哭，引来邻座林启正的注意。回家后发现妹妹邹月因单恋致林集团二公子',2),(4,'小黄人大眼萌','Marry','movies/hu.mp4','images/movies/xhrdym.png',236,0,'2015-4-13 12:12:00','从地球诞生之初，一种奇怪的生物便出现在这颗蓝色的星球上。他们不断进化、蜕变，终于成为我们所熟悉',1),(5,'有种你爱我','jan','movies/hu.mp4','images/movies/yznaw.png',87,0,'2015-5-13 12:12:00','建筑师左小欣渴望拥有一个只有孩子没有男人的“幸福生活”，机缘巧合结识了人气主持人査义。查义对左小欣颇有好感，却未料到“左小欣”只想要个孩子，两人生下非婚子左松松。为科学抚养，在孩子周岁时，左小欣通知了査义，此刻他才明白自己成了。。。',2),(6,'小时代3：剌金时代','jan','movies/hu.mp4','images/movies/xsd3.png',87,0,'2015-6-13 12:12:00','《小时代3.0刺金时代》继续讲述林萧、顾里、南湘、唐宛如四位主角，以及顾准、简溪、顾源、宫洺、周崇光、Neil、卫海……这一群人，他们挥手作别青葱校园，日益融入生活的滚滚洪流之中的迷失、怅惘、怀念却又不能不勇往直前的故事。。。',2),(7,'疯狂外星人','jan','movies/hu.mp4','images/movies/fkwxr.png',87,0,'2015-7-13 12:12:00','可爱的外星人小欧与他的同伴波波星人一直在寻找一个适宜他们居住的地方，在一次次的尝试并且失败之后，他们登陆了地球并且将地球上的人类进行了转移。因为一个意外，小欧成为了波波星人的全体通缉目标。在逃亡中他遇到了热爱冒险的地球女孩。。。',3),(8,'澳门风云2','jan','movies/hu.mp4','images/movies/amfy2.png',87,0,'2015-7-13 12:12:00','闻名赌坛的“魔术手”石一坚在参加好友龙叔的海上生日派对时，突遭来路不明的女杀手伏击，后得知她们受旧敌D.O.A组织派来灭口，而她们的目标不仅是杀死石一坚，更要捉拿携组织一百五十亿美元资金潜逃的会计小马。\n为保护小马及粉碎D.O.A的阴谋。。。',1),(9,'万万没想到','jan','movies/hu.mp4','images/movies/wwmxd.png',87,0,'2015-1-13 12:12:00','屌丝小妖王大锤，他生来便与常人不同，两耳尖尖，又有些小法力，总是自诩本地妖王。但让他万万没想到的是，在遇到唐僧师徒四人组后，他的命运发生了逆转，而对于唐僧师徒四人组来说，遇见王大锤也是无比郁闷的第八十二难。双方因此上演了一出相爱相杀，令人捧腹的奇幻冒险。',1),(10,'消失的爱人','jan','movies/hu.mp4','images/movies/xsdar.png',87,0,'2015-1-13 12:12:00','改编自吉莉安·弗琳的同名小说，由大卫·芬奇执导，本·阿弗莱克 、罗莎曼德·派克、尼尔·帕特里克·哈里斯等主演的悬疑惊悚电影。该片讲述了平凡又恩爱的一对夫妻，突然有一天妻子却消失不见，丈夫通过各种方式疯狂寻找，然而在妻子留下的一本日记中却发现，种种线索都表明是丈夫将妻子杀害。',5),(11,'探灵档案','jan','movies/hu.mp4','images/movies/tlda.png',87,0,'2015-1-13 12:12:00','曾经是“盲点侦探”的房产中介陈博涵，被突然出现的刘欣媛打破了原本平静的生活。原来这个地方流传着一个传说，午夜穿过港湾广场的人可以看到另一个世界。而因为好奇心作祟，刘欣媛和几个闺蜜夜探港湾广场后，居然在家里看到自己死去多年的父亲的身影，于是找到陈博涵寻求帮助',5),(12,'摩卡行动','jan','movies/hu.mp4','images/movies/mkxd.png',87,0,'2015-1-13 12:12:00','年大治由于网络运作天赋异禀，成为平民特工。孤儿院青梅竹马孟小玲嫌贫爱富，跟随富二代杜豪金前往意大利疯狂购物，杜豪金一掷千金想要收购世博老街，却遭当地人民激烈反对。黑帮蓄谋利用小玲套出杜氏财产密码雇佣黑客设局敛财，大治为追回小玲、侦破大案同赴异国。 富豪李正华受国际刑警之托，通过拯救当地球队成',6),(13,'复仇者联盟4','jan','movies/hu.mp4','images/movies/fczlm4.jpg',87,1,'2015-1-13 12:12:00','故事发生在《复仇者联盟3 无限战争》之后，灭霸使用无限手套的力量，造成全宇宙一半的生命随机消失，有的人永远失去了挚爱和家人，复仇者联盟部分成员也因此消失了。在泰坦星上和灭霸结束了战斗的，钢铁侠托尼在返回地球的途中遭遇了缺水和没有粮食的境地，幸得惊奇队长出手相救，回到地球的惊奇队长与其他英雄们，决定前去讨伐灭霸并寻回宝石，却发现年老体弱的退休老农灭霸已经将宝石毁掉了。愤怒的雷神砍下了年老灭霸的头颅，复仇者从此不再勇猛如初。五年过去了，已经消失的斯科特·朗（蚁人）来到了复仇者总部，并告知众人，他们仍然有机会可以逆转灭霸的所作所为。',3),(14,'名侦探皮卡丘','jan','movies/hu.mp4','images/movies/mztpkq.jpg',87,1,'2015-1-13 12:12:00','电影《大侦探皮卡丘》改编自任天堂3DS同名游戏，蒂姆·古德曼为寻找下落不明的父亲来到莱姆市，意外与父亲的前宝可梦搭档大侦探皮卡丘相遇，并惊讶地发现自己是唯一能听懂皮卡丘说话的人类，他们决定组队踏上揭开真相的刺激冒险之路。探案过程中他们邂逅了各式各样的宝可梦，并意外发现了一个足以毁灭整个宝可梦宇宙的惊天阴谋',3);
/*!40000 ALTER TABLE `movielist` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `types`
--

DROP TABLE IF EXISTS `types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `types` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `tname` varchar(50) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `types`
--

LOCK TABLES `types` WRITE;
/*!40000 ALTER TABLE `types` DISABLE KEYS */;
INSERT INTO `types` VALUES (1,'喜剧'),(2,'爱情'),(3,'科幻'),(4,'伦理'),(5,'惊悚'),(6,'动作');
/*!40000 ALTER TABLE `types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'moviehome'
--

--
-- Dumping routines for database 'moviehome'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-06-05 10:40:47
