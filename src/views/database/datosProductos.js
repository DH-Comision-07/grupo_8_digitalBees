let fs = require('fs');

function importarArchivoProductos(){
    //importo el archivo .json y se lee al invocar la funcion
    let datosProductos = fs.readFileSync(__dirname + '/productos.json', 'utf8');
    //convertimos el objeto json a tipo array con parse
    let listadoProductos = JSON.parse(datosProductos);
    return listadoProductos
}

module.exports = importarArchivoProductos;