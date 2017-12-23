CREATE TABLE `cats` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  `weight` int(11) NOT NULL,
  `age` int(11) NOT NULL,
  `createTime` datetime DEFAULT NULL,
  `modifiedTime` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=latin1;
