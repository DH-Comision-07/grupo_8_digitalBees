-- DROP DATABASE IF EXISTS `digitalBees`;
-- -----------------------------------------------------
-- Schema digitalBees
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `digitalBees` DEFAULT CHARACTER SET utf8 ;
USE `digitalBees` ;
-- -----------------------------------------------------
-- Table `digitalBees`.`categoria`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `digitalBees`.`categoria` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

INSERT INTO categoria (name) VALUES
("belleza"),
("salud"),
("alimentos");

-- -----------------------------------------------------
-- Table `digitalBees`.`productos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `digitalBees`.`productos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(45) NOT NULL,
  `cost` INT NOT NULL,
  `img` VARCHAR(500) NOT NULL,
  `description` VARCHAR(500) NOT NULL,
  `popular` INT NOT NULL,
  `stock` INT NOT NULL,
  `categoria_id` INT NOT NULL,
  PRIMARY KEY (`id`, `categoria_id`),
  INDEX `fk_productos_categoria1_idx` (`categoria_id` ASC) VISIBLE,
  CONSTRAINT `fk_productos_categoria1`
    FOREIGN KEY (`categoria_id`)
    REFERENCES `digitalBees`.`categoria` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


INSERT INTO productos (title, img, cost, description, popular, stock, categoria_id) VALUES
('Miel 50gr', 'img/imagenesHome/img1-miel.jpg',23000, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis repudiandae, quisquam labore veniam quos fugit maxime molestiae.', 1, 10 , 3 ),
('Jabon miel', 'img/imagenesProductos/belleza/jabon_miel.png',23000, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis repudiandae, quisquam labore veniam quos fugit maxime molestiae.', 1, 10 , 1 ),
('Jalea real', 'img/imagenesProductos/salud/jalea_real.png',13000, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis repudiandae, quisquam labore veniam quos fugit maxime molestiae.', 1, 10 , 2 ),
('Miel 300gr', 'img/miel.jpg', 21000, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis repudiandae, quisquam labore veniam quos fugit maxime molestiae.', 1, 10 , 3 ),
('Gel de Miel', 'img/imagenesProductos/salud/gelMiel.jpg', 40000, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis repudiandae, quisquam labore veniam quos fugit maxime molestiae.',0, 10 , 2 ),
('Polen', 'img/imagenesProductos/salud/polen_frasco.jpg', 50000, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis repudiandae, quisquam labore veniam quos fugit maxime molestiae.', 0, 10 , 2 ),
('Propoleo', 'img/imagenesProductos/salud/propoleo.png', 26000, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis repudiandae, quisquam labore veniam quos fugit maxime molestiae.', 0, 10 , 2 ),
('Miel 1000gr', 'img/imagenesProductos/alimentos/miel_1000gr.jpg', 60000, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis repudiandae, quisquam labore veniam quos fugit maxime molestiae.', 0, 10 , 3 ),
('Miel cristalizada', 'img/imagenesProductos/alimentos/miel_cristalizada.png', 20000, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis repudiandae, quisquam labore veniam quos fugit maxime molestiae.', 0, 10 , 3 ),
('cera pura de abejas', 'img/imagenesProductos/belleza/cera_abeja.png', 13000, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis repudiandae, quisquam labore veniam quos fugit maxime molestiae.', 0, 10 , 1 ),
('crema facial', 'img/imagenesProductos/belleza/crema_corporal_facial.jpg', 70000, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis repudiandae, quisquam labore veniam quos fugit maxime molestiae.', 0, 10 , 1 ),
('Shampoo de Miel', 'img/imagenesProductos/belleza/shampoo_miel_polen.jpg', 65000, 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis repudiandae, quisquam labore veniam quos fugit maxime molestiae.', 0, 10 , 1 );

-- -----------------------------------------------------
-- Table `digitalBees`.`user_role`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `digitalBees`.`user_role` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `role` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;

INSERT INTO user_role (role) VALUES
("client"),
("admin"),
("manager"),
("sales");

-- -----------------------------------------------------
-- Table `digitalBees`.`usuarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `digitalBees`.`usuarios` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(500) NOT NULL,
  `first_name` VARCHAR(45) NOT NULL,
  `last_name` VARCHAR(45) NOT NULL,
  `profile_picture` VARCHAR(500) NOT NULL,
  `address` VARCHAR(45) NOT NULL,
  `city` VARCHAR(45) NOT NULL,
  `country` VARCHAR(45) NOT NULL,
  `phone_number` INT NOT NULL,
  `subscription_date` DATE NULL,
  `last_login` DATE,
  `account_status` INT NOT NULL,
  `user_role_id` INT NOT NULL,
  PRIMARY KEY (`user_id`, `user_role_id`),
  INDEX `fk_usuarios_rol_administrador1_idx` (`user_role_id` ASC) VISIBLE,
  CONSTRAINT `fk_usuarios_rol_administrador1`
    FOREIGN KEY (`user_role_id`)
    REFERENCES `digitalBees`.`user_role` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


INSERT INTO usuarios (email, password, first_name, last_name, address, city, country, phone_number, profile_picture, subscription_date, last_login, account_status, user_role_id) VALUES
('lina@mail.com', '$2a$10$eyNb0FKQ3Umotf4E8G8uTuNLyHhIT3LcJ7T/1Uq1ZKvYsiUXfeHEm', 'Lina', 'Cardozo', 'cra 1', 'Bogotá', 'Colombia', 12345, 'imgUsers-1712851716224.png', '2024-4-11', '2024-4-26', 1, 2 ),
('juan@gmail.com', '$2a$10$XbpqrxPurivb8epPfRii2OuH7R4ZQ/EHA6EgisAmjJNdH79lHZPPO', 'juan', 'perez', 'cra b1', 'Buenos Aires', 'Argentina', 12345, 'imgUsers-1712852081895.png', '2024-4-11', '2024-4-26', 1, 1 ),
('maria@gmail.com', '12345', 'maria', 'lopez', 'cra b1', 'ciudad de Mexico', 'Mexico', 12345, 'imgUsers-1712852081895.png', '2024-4-11', '2024-4-26', 1, 1 );

-- -----------------------------------------------------
-- Table `digitalBees`.`pedido_factura_venta`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `digitalBees`.`pedido` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `date_sale` DATE NOT NULL,
  `total` INT NOT NULL,
  `usuarios_user_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_pedido_factura_venta_usuarios1_idx` (`usuarios_user_id` ASC) VISIBLE,
  CONSTRAINT `fk_pedido_factura_venta_usuarios1`
    FOREIGN KEY (`usuarios_user_id`)
    REFERENCES `digitalBees`.`usuarios` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- valores ejemplo, estos valores vienen de la seleccion del usuario desde el boton comprar

INSERT INTO pedido (date_sale, total, usuarios_user_id) VALUES
-- ('2024-4-11', 360000, 2),
-- ('2024-4-11', 56000, 3);

-- -----------------------------------------------------
-- Table `digitalBees`.`detalle_factura_venta`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `digitalBees`.`detalle_pedido` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `quantity` INT NOT NULL,
  `cost` INT NOT NULL,
  `subtotal` INT NOT NULL,
  `pedido_id` INT NOT NULL,
  `productos_id` INT NOT NULL,
  PRIMARY KEY (`id`, `pedido_id`, `productos_id`),
  INDEX `fk_detalle_pedido_pedido1_idx` (`pedido_id` ASC) VISIBLE,
  INDEX `fk_detalle_pedido_productos1_idx` (`productos_id` ASC) VISIBLE,
  CONSTRAINT `fk_detalle_pedido_pedido1`
    FOREIGN KEY (`pedido_id`)
    REFERENCES `digitalBees`.`pedido` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_detalle_pedido_productos1`
    FOREIGN KEY (`productos_id`)
    REFERENCES `digitalBees`.`productos` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)


-- valores ejemplo, estos valores vienen de la seleccion del usuario desde el boton comprar
-- INSERT INTO detalle_pedido (quantity, cost, subtotal, pedido_id, productos_id) VALUES
-- (1, 10000, 10000, 1, 1),
-- (5, 70000, 350000, 1, 4),
-- (2, 23000, 46000, 2, 1),
-- (1, 10000, 10000, 2, 1);
