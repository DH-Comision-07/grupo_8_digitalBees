USE `digitalBees`;

-- consultas index
SELECT * FROM productos WHERE popular = true;
SELECT * FROM categoria;

SELECT * FROM usuarios;


-- consulta pagina productos para clientes

SELECT productos.title, productos.img, productos.description, productos.popular,categoria.id, categoria.name as categoria
FROM categoria
JOIN productos
ON categoria.id = productos.categoria_id;

-- consulta pagina datos para clientes registrados vista admin
SELECT * FROM usuarios;
SELECT * FROM productos;

SELECT usuarios.user_id, usuarios.email, usuarios.first_name, usuarios.last_name,  usuarios.profile_picture, usuarios.address, usuarios.city, usuarios.country, usuarios.phone_number, usuarios.subscription_date, usuarios.last_login, usuarios.account_status, user_role.role
FROM user_role 
JOIN usuarios
ON user_role.id = usuarios.user_role_id;

-- consulta usuarios y productos admin
SELECT * FROM productos;

-- consultas para usuario logueado datos perfil
SELECT usuarios.email, usuarios.first_name, usuarios.last_name, usuarios.profile_picture, usuarios.phone_number
FROM user_role 
JOIN usuarios
ON user_role.id = usuarios.user_role_id
WHERE user_role.id = 1;

-- ver historial productos que escogio
DESCRIBE pedido_factura_venta;
SELECT 
    usuarios.first_name, 
    usuarios.last_name, 
    detalle_factura_venta.quanity as cantidad, 
    categoria.name as categoria,
    productos.title as producto, 
	detalle_factura_venta.cost, 
    detalle_factura_venta.subtotal,
    pedido_factura_venta.total
FROM usuarios
JOIN pedido_factura_venta ON usuarios.user_id = pedido_factura_venta.usuarios_user_id
JOIN detalle_factura_venta ON pedido_factura_venta.id = detalle_factura_venta.pedido_factura_venta_id
JOIN productos ON detalle_factura_venta.productos_id = productos.id
JOIN categoria ON productos.categoria_id = categoria.id;
