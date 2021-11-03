CREATE TABLE `permissions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=latin1

INSERT INTO admin.permissions (id,name) VALUES
	 (1,'view_users'),
	 (2,'edit_users'),
	 (3,'view_roles'),
	 (4,'edit_roles'),
	 (5,'view_products'),
	 (6,'edit_products'),
	 (7,'view_orders'),
	 (8,'edit_orders');