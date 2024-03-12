const express = require("express");
const app = express();
const path = require("path");
const indexRouter=require('./src/routes/index.routes')
const productsRouter=require('./src/routes/products.routes')
const shopingCarRouter=require('./src/routes/shopingCar.routes')
const productDetailRouter=require('./src/routes/products.routes')

//const importarArchivoProductos = require("./src/database/datosProductos");
//const listaDeProductos= importarArchivoProductos()

const port = 3030;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname,'src/views'));
app.use(express.static(path.join(__dirname, 'public')));

//app.get("/", (req, res) => res.render("index", {listaDeProductos}));
app.use('/', indexRouter);
//app.get("/productos", (req, res) => res.render("products/listaProductos", {listaDeProductos}));
app.use('/productos', productsRouter);
//app.get("/carrito", (req, res) => res.render("products/productCart", {listaDeProductos}));
app.use('/carrito', shopingCarRouter);
//app.get("/detalle", (req, res) => res.render("products/product-detail"));
app.use('/detalle', productDetailRouter);


app.get("/login", (req, res) => res.render("users/login"));
app.get("/registro", (req, res) => res.render("users/register"));



app.get("*", (req, res) => res.status(404).send("404 not found. <br> ¡Houston, tenemos un problema!"));

app.listen(port, () => console.log(`Servidor Corriendo en el puerto ${port}`));