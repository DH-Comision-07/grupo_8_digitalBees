const express = require("express");

const app = express();

const path = require("path");

const importarArchivoProductos = require("./views/datosProductos");
const listaDeProductos= importarArchivoProductos()

const port = 3030;

app.set("view engine", "ejs");
app.set("views", __dirname + "/views" );
app.use(express.static(path.join(__dirname + '/public')));

//app.get("/", (req, res) => res.sendFile(path.resolve("./views/index.html")));
app.get("/", (req, res) => res.render("index", {listaDeProductos}));

app.get("/login", (req, res) => res.sendFile(path.resolve("./views/login.html")));
app.get("/carrito", (req, res) => res.render("productCart", {
    products : [
        {
            title: 'Miel',
            cost: '$230.000',
            img: 'img/imagenesHome/img1-miel.jpg'
        },
        {
            title: 'Jabon miel',
            cost: '$75.000',
            img: 'img/imagenesProductos/belleza/jabon_miel.png'
        },
        {
            title: 'Jalea real',
            cost: '$168.000',
            img: 'img/imagenesProductos/salud/jalea_real.png'
        },
        {
            title: 'Miel',
            cost: '$190.000',
            img: 'img/miel.jpg'
        }
    ],
    productsCart : [
        {
            title: 'Miel',
            cost: '$230.000',
            img: 'img/imagenesHome/img1-miel.jpg'
        },
        {
            title: 'Jabon miel',
            cost: '$75.000',
            img: 'img/imagenesProductos/belleza/jabon_miel.png'
        },
        {
            title: 'Jalea real',
            cost: '$168.000',
            img: 'img/imagenesProductos/salud/jalea_real.png'
        },
        {
            title: 'Miel',
            cost: '$190.000',
            img: 'img/miel.jpg'
        }
    ]
}));
app.get("/productos", (req, res) => res.sendFile(path.resolve("./views/productDetail.html")));
app.get("/producto", (req, res) => res.sendFile(path.resolve("./views/product.html")));
app.get("/registro", (req, res) => res.sendFile(path.resolve("./views/register.html")));
app.get("/detalle", (req, res) => res.sendFile(path.resolve("./views/product-detail.html")));

app.get("*", (req, res) => res.status(404).send("404 not found. <br> ¡Houston, tenemos un problema!"));

app.listen(port, () => console.log(`Servidor Corriendo en el puerto ${port}`));