const express = require("express");
const app = express();
const path = require("path");
const methodOverride =  require('method-override');
const indexRouter=require('./src/routes/index.routes')

const port = 3030;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname,'src/views'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(methodOverride('_method')); 

app.use('/', indexRouter);

app.get("/login", (req, res) => res.render("users/login"));
app.get("/registro", (req, res) => res.render("users/register"));
app.get("/admin", (req, res) => res.render("users/admin/admin"));

app.get("*", (req, res) => res.status(404).send("404 not found. <br> ¡Houston, tenemos un problema!"));

app.listen(port, () => console.log(`Servidor Corriendo en el puerto ${port}`));