/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 80011
 Source Host           : localhost:3306
 Source Schema         : milinbook

 Target Server Type    : MySQL
 Target Server Version : 80011
 File Encoding         : 65001

 Date: 15/02/2019 00:29:50
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for tb_bookinfo
-- ----------------------------
DROP TABLE IF EXISTS `tb_bookinfo`;
CREATE TABLE `tb_bookinfo`  (
  `BookId` int(11) NOT NULL AUTO_INCREMENT COMMENT '图书编号',
  `BookTypeId` int(11) NOT NULL COMMENT '图书类型',
  `BookName` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '图书名',
  `BookPress` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '出版社',
  `BookPubDate` datetime(0) NOT NULL COMMENT '出版日期',
  `BookSize` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '开本',
  `BookVersion` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '版次',
  `BookAuthor` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '图书作者',
  `BookTanslor` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '	\r\n图书译者',
  `Bookisbn` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '图书ISBN',
  `BookPrice` decimal(10, 2) UNSIGNED NOT NULL COMMENT '图书定价',
  `BookPages` int(10) UNSIGNED NULL DEFAULT NULL COMMENT '图书页码\r\n\r\n',
  `BookOutline` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '图书简介',
  `BookCatalog` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '图书目录',
  `BookMprice` decimal(10, 2) UNSIGNED NOT NULL COMMENT '市场价',
  `BookPrprice` decimal(10, 2) UNSIGNED NOT NULL COMMENT '会员价\r\n',
  `BookDealmount` int(10) UNSIGNED NOT NULL DEFAULT 0 COMMENT '成交量',
  `BookLookmount` int(11) NOT NULL COMMENT '浏览次数',
  `BookDiscount` decimal(10, 2) UNSIGNED NULL DEFAULT NULL COMMENT '折扣',
  `BookPic` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'publicuploadimgookPicdefault_book_pic.jpg' COMMENT '图书封面图',
  `BookStoremount` int(10) UNSIGNED NOT NULL COMMENT '图书库存量',
  `BookStoretime` datetime(0) NOT NULL ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '入库时间',
  `BookPackstyle` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '封装方式',
  PRIMARY KEY (`BookId`) USING BTREE,
  INDEX `BookTypeId_F`(`BookTypeId`) USING BTREE,
  CONSTRAINT `BookTypeId_F` FOREIGN KEY (`BookTypeId`) REFERENCES `tb_booktypeinfo` (`booktypeid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for tb_booktypeinfo
-- ----------------------------
DROP TABLE IF EXISTS `tb_booktypeinfo`;
CREATE TABLE `tb_booktypeinfo`  (
  `BookTypeId` int(11) NOT NULL AUTO_INCREMENT COMMENT '图书类型编号 自增字段',
  `BookTypeName` varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '	\r\n类别名称',
  PRIMARY KEY (`BookTypeId`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for tb_comment
-- ----------------------------
DROP TABLE IF EXISTS `tb_comment`;
CREATE TABLE `tb_comment`  (
  `CommentId` int(11) NOT NULL AUTO_INCREMENT COMMENT '图书评价编号',
  `BookId` int(11) NOT NULL COMMENT '图书编号',
  `CustomerId` int(11) NOT NULL COMMENT '评论客户编号',
  `Commentdate` datetime(0) NOT NULL COMMENT '评论时间',
  `Commentcontent` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '评论内容',
  `Commentflag` enum('1','0','-1') CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '0' COMMENT '审核标志\r\n1、过审\r\n0、待审\r\n-1、未通过审核',
  PRIMARY KEY (`CommentId`) USING BTREE,
  INDEX `BookId_C_F`(`BookId`) USING BTREE,
  INDEX `CustomerId_C_F`(`CustomerId`) USING BTREE,
  CONSTRAINT `BookId_C_F` FOREIGN KEY (`BookId`) REFERENCES `tb_bookinfo` (`bookid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `CustomerId_C_F` FOREIGN KEY (`CustomerId`) REFERENCES `tb_customerinfo` (`customerid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for tb_customerinfo
-- ----------------------------
DROP TABLE IF EXISTS `tb_customerinfo`;
CREATE TABLE `tb_customerinfo`  (
  `CustomerId` int(11) NOT NULL AUTO_INCREMENT COMMENT '客户编号',
  `CustomerName` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '客户昵称',
  `CustomerPwd` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '客户密码',
  `CustomerTrueName` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '真实姓名',
  `CustomerSex` enum('1','2') CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '1' COMMENT '性别',
  `CustomerTel` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '客户电话',
  `CustomerEmail` varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT 'E-mail',
  `CustomerAddr` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '地址',
  `CustomerRegTime` datetime(0) NOT NULL COMMENT '注册时间',
  `CustomerQues` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '提示问题',
  `CustomerAnswer` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '问题答案',
  `CustomerLogTime` int(11) NOT NULL COMMENT '登陆次数',
  `CustomerLastLogT` datetime(0) NOT NULL COMMENT '最近登陆时间',
  `addressId` int(11) NOT NULL COMMENT '默认的收货地址',
  PRIMARY KEY (`CustomerId`, `CustomerName`, `CustomerEmail`) USING BTREE,
  INDEX `CustomerId`(`CustomerId`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for tb_manager
-- ----------------------------
DROP TABLE IF EXISTS `tb_manager`;
CREATE TABLE `tb_manager`  (
  `AdminId` int(11) NOT NULL AUTO_INCREMENT COMMENT '管理员编号',
  `AdminName` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '管理员昵称',
  `AdminAccount` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '管理员账号 邮箱',
  `AdminPwd` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '密码',
  `AdminFlag` enum('1','2','3') CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '1' COMMENT '权限标志:\r\n1、可以增删查改图书信息\r\n2、包含权限1的功能，并且可以处理订单\r\n3、最高 root ，可以管理其他的管理员账号',
  `AdminStatus` enum('1','0') CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT '1' COMMENT '管理员账号状态\r\n1、正常\r\n2、禁用',
  `AdminAvatar` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'public/upload/img/adminAvatar/default_admin_avatar.png' COMMENT '头像',
  PRIMARY KEY (`AdminId`) USING BTREE,
  UNIQUE INDEX `UN_Name`(`AdminName`) USING BTREE COMMENT '姓名唯一',
  UNIQUE INDEX `UN_Account`(`AdminAccount`) USING BTREE COMMENT '账号唯一'
) ENGINE = InnoDB AUTO_INCREMENT = 22 CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of tb_manager
-- ----------------------------
INSERT INTO `tb_manager` VALUES (1, '赵思思', '1159902844@qq.com', 'de9e26d20f407a432167087ee00337a31efcfd2f5f870177858c95993ab5db0c', '3', '1', 'public/upload/img/adminAvatar/default_admin_avatar.png');
INSERT INTO `tb_manager` VALUES (17, '刘盼', 'liupan@qq.com', 'de9e26d20f407a432167087ee00337a31efcfd2f5f870177858c95993ab5db0c', '2', '1', 'public/upload/img/adminAvatar/633249.jpg');
INSERT INTO `tb_manager` VALUES (18, '汤亮亮', 'tangliangliang@qq.com', 'de9e26d20f407a432167087ee00337a31efcfd2f5f870177858c95993ab5db0c', '1', '1', 'public/upload/img/adminAvatar/796108.jpg');
INSERT INTO `tb_manager` VALUES (19, '王新翔', 'wangxinxiang@qq.com', 'de9e26d20f407a432167087ee00337a31efcfd2f5f870177858c95993ab5db0c', '1', '1', 'public/upload/img/adminAvatar/625916.jpg');
INSERT INTO `tb_manager` VALUES (20, '王爽爽', 'wangshuang@qq.com', 'de9e26d20f407a432167087ee00337a31efcfd2f5f870177858c95993ab5db0c', '2', '1', 'public/upload/img/adminAvatar/信号台.jpg');
INSERT INTO `tb_manager` VALUES (21, '刘胜胜', 'liusheng@qq.com', 'de9e26d20f407a432167087ee00337a31efcfd2f5f870177858c95993ab5db0c', '1', '1', 'public/upload/img/adminAvatar/796108.jpg');
INSERT INTO `tb_manager` VALUES (23, '刘盼盼', 'liupanpan@qq.com', 'de9e26d20f407a432167087ee00337a31efcfd2f5f870177858c95993ab5db0c', '1', '1', 'public/upload/img/adminAvatar/default_admin_avatar.png');

-- ----------------------------
-- Table structure for tb_order
-- ----------------------------
DROP TABLE IF EXISTS `tb_order`;
CREATE TABLE `tb_order`  (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '订单的自动编号',
  `OrderId` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '订单编号',
  `CustomerId` int(11) NOT NULL COMMENT '客户编号',
  `BookId` int(11) NOT NULL COMMENT '图书编号\r\n\r\n',
  `ordermount` int(11) NOT NULL COMMENT '订购数量',
  `Orderdate` datetime(0) NOT NULL ON UPDATE CURRENT_TIMESTAMP(0) COMMENT '下单日期',
  `isPlay` enum('1','0') CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '0' COMMENT '支付状态\r\n1、以支付\r\n2、未支付',
  `paymethod` enum('1','2','3') CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '1' COMMENT '支付方式\r\n1、支付宝\r\n2、微信支付\r\n3、银行卡支付',
  `payTime` datetime(0) NOT NULL COMMENT '支付时间',
  `message` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '留言',
  `receverId` int(11) NOT NULL COMMENT '收货地址id',
  `totalprice` decimal(10, 2) UNSIGNED NOT NULL COMMENT '总卖出价',
  `isShip` enum('1','0') CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '0' COMMENT '是否发货',
  `shipTime` datetime(0) NOT NULL COMMENT '发货时间',
  `isReceipt` enum('1','0') CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '是否收货',
  `receiptDate` datetime(0) NOT NULL COMMENT '收货时间',
  `goodsStatus` enum('1','0','-1') CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '1' COMMENT '商品状态\r\n1、正常\r\n0、禁用\r\n-1、删除',
  PRIMARY KEY (`id`, `OrderId`) USING BTREE,
  INDEX `CustomerId_O_F`(`CustomerId`) USING BTREE,
  INDEX `BookId_O_F`(`BookId`) USING BTREE,
  CONSTRAINT `BookId_O_F` FOREIGN KEY (`BookId`) REFERENCES `tb_bookinfo` (`bookid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `CustomerId_O_F` FOREIGN KEY (`CustomerId`) REFERENCES `tb_customerinfo` (`customerid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for tb_parameter
-- ----------------------------
DROP TABLE IF EXISTS `tb_parameter`;
CREATE TABLE `tb_parameter`  (
  `webname` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '密林的书店' COMMENT '网站名',
  `regtiaoyue` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '注册条款',
  `notice` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '公告',
  `address` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '武汉交通职业学院移动开发二班赵思' COMMENT '地址',
  `postcode` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'magicwingzs@qq.com' COMMENT '邮编',
  `tel` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '17371278540' COMMENT '电话号码',
  `copyright` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '本网站版权归赵思所有' COMMENT '版权',
  `weblogo` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT '网站Logo',
  `website` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT 'localhost:8080' COMMENT '网站地址',
  `worktime` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '6:00-12:00' COMMENT '工作时间',
  `service` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '17371278540' COMMENT '售后服务',
  PRIMARY KEY (`webname`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for tb_shopbook
-- ----------------------------
DROP TABLE IF EXISTS `tb_shopbook`;
CREATE TABLE `tb_shopbook`  (
  `shopCarId` int(11) NOT NULL AUTO_INCREMENT COMMENT '购物车表记录的id',
  `CustomerId` int(11) NOT NULL COMMENT '购物车的客户编号',
  `BookId` int(11) NOT NULL COMMENT '图书编号\r\n\r\n',
  `ordermount` int(11) NOT NULL COMMENT '订购数量',
  `goodsStatus` enum('1','0','-1') CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL DEFAULT '1' COMMENT '商品在购物车中的状态\r\n1、正常显示\r\n2、禁用\r\n3、删除（以支付购买）',
  PRIMARY KEY (`shopCarId`) USING BTREE,
  INDEX `CustomerId_F`(`CustomerId`) USING BTREE,
  INDEX `BookId_F`(`BookId`) USING BTREE,
  CONSTRAINT `BookId_F` FOREIGN KEY (`BookId`) REFERENCES `tb_bookinfo` (`bookid`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `CustomerId_F` FOREIGN KEY (`CustomerId`) REFERENCES `tb_customerinfo` (`customerid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for tb_useraddress
-- ----------------------------
DROP TABLE IF EXISTS `tb_useraddress`;
CREATE TABLE `tb_useraddress`  (
  `addressId` int(11) NOT NULL AUTO_INCREMENT,
  `CustomerId` int(11) NOT NULL COMMENT '客户编号',
  `address` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  PRIMARY KEY (`addressId`) USING BTREE,
  INDEX `CustomerId_A_F`(`CustomerId`) USING BTREE,
  CONSTRAINT `CustomerId_A_F` FOREIGN KEY (`CustomerId`) REFERENCES `tb_customerinfo` (`customerid`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for test
-- ----------------------------
DROP TABLE IF EXISTS `test`;
CREATE TABLE `test`  (
  `id` int(11) NOT NULL,
  `name` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8 COLLATE = utf8_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of test
-- ----------------------------
INSERT INTO `test` VALUES (1, 'zhaosi');
INSERT INTO `test` VALUES (2, 'liupan');
INSERT INTO `test` VALUES (3, 'liusheng');

SET FOREIGN_KEY_CHECKS = 1;
