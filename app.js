const express = require("express");

const app = express();

const path = require("path");

const port = 3030

app.use(express.static("public"));

app.get("/", (req, res) => res.sendFile(path.resolve("./views/index.html")));
app.get("/login", (req, res) => res.sendFile(path.resolve("./views/login.html")));
app.get("/carrito", (req, res) => res.sendFile(path.resolve("./views/productCart.html")));
app.get("/productos", (req, res) => res.sendFile(path.resolve("./views/productDetail.html")));
app.get("/registro", (req, res) => res.sendFile(path.resolve("./views/register.html")));

app.get("*", (req, res) => res.status(404).send("404 not found. <br> ¡Houston, tenemos un problema!"));

app.listen(port, () => console.log(`Servidor Corriendo en el puerto ${port}`));