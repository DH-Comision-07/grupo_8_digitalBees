const express = require("express");
const app = express();
const path = require("path");
const indexRouter=require('./src/routes/index.routes')
const productsRouter=require('./src/routes/products.routes')
const shopingCarRouter=require('./src/routes/shopingCar.routes')
const productDetailRouter=require('./src/routes/products.routes')


const port = 3030;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname,'src/views'));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/productos', productsRouter);
app.use('/carrito', shopingCarRouter);
app.use('/detalle', productDetailRouter);


app.get("/login", (req, res) => res.render("users/login"));
app.get("/registro", (req, res) => res.render("users/register"));



app.get("*", (req, res) => res.status(404).send("404 not found. <br> ¡Houston, tenemos un problema!"));

app.listen(port, () => console.log(`Servidor Corriendo en el puerto ${port}`));