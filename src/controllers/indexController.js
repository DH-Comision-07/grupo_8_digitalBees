const productService= require("../model/service/productService")

module.exports ={
	mainProducts: async function(req,res){
        try {
            let producto = await productService.getMain();
            console.log("LLEGA ACA--> ",producto);
            res.render('index', {'listaDeProductos': producto})
        } catch (error) {
            console.log(error);
            res.send("Ha ocurrido un error inesperado").status(500);
        }
    }

}