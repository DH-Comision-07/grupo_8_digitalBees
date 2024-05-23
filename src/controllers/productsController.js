const { validationResult } = require('express-validator');
const productService= require("../model/service/productService");
const categoryService = require("../model/service/categoryService");

module.exports ={
	getAll: async function(req,res){
        try {
            let producto = await productService.getAll();
            await categoryService.getAllCategories();
            res.render('products/listaProductos', {listaDeProductos: producto})
        } catch (error) {
            res.send("Ha ocurrido un error inesperado").status(500);
        }
    },

	mainProducts: async function(req,res){
        try {
			await categoryService.getAllCategories(); 
            let producto = await productService.getMain();
            res.render('products/productCart', {listaDeCarrito: producto})
        } catch (error) {
            res.send("Ha ocurrido un error inesperado").status(500);
        }
    },
	detail: async function(req, res) {
        try {
			await categoryService.getAllCategories(); 
            let producto = await productService.getOneBy(req.params.id); 
            res.render('products/product-detail', {producto: producto});  
        } catch (error) {
			console.log(error);
            res.send("Ha ocurrido un error inesperado al recuperar el producto ").status(500);
        }     
    },
	//get all products admin
	getAllAdmin: async function(req,res){
        try {
            let producto = await productService.getAll();
            let categoria = await categoryService.getAllCategories();
            res.render('users/admin/admin', {listaDeProductos: producto})
        } catch (error) {
            res.send("Ha ocurrido un error inesperado").status(500);
        }
    },
	
	// Create - Form to create

	create: async function(req,res){
        try {
           
            let categorias = await categoryService.getAllCategories(); 
            console.log("CATEGORIAS-->> ",categorias);
            let isChecked = 0; 
			res.render('products/product-create', {categorias: categorias, isChecked: isChecked})
        } catch (error) {
            res.send("Ha ocurrido un error inesperado").status(500);
        }
    },
	store: async function(req,res){
        try {
            const resultValidation = validationResult(req);

            if(resultValidation.errors.length > 0){
                let categorias = await categoryService.getAllCategories();
                
                return res.render('products/product-create', {
					errors: resultValidation.mapped(),
					oldData: req.body,
                    categorias: categorias
                });
            }

			if (req.file) {
				let product ={
					...req.body,
					img : 'img/groups/' + req.file.filename,
                    popular: req.body.popular === 'on' ? 1 : 0 
				}
                await productService.save(product)
			}
            let productos = await productService.getAll(); 
            res.render('users/admin/admin', {listaDeProductos: productos})	
        } catch (error) {
            console.log(error);
            res.send("Ha ocurrido un error inesperado al guardar el producto").status(500);
        }
    },
	// Update - Form to edit
	edit: async function(req, res) {

        try {
            let producto = await productService.getOneBy(req.params.id); 
			let categoria = await categoryService.getAllCategories();
            res.render('products/product-edit', {producto: producto , categorias: categoria });  
        } catch (error) {
            res.send("Ha ocurrido un error inesperado").status(500);
        }     
    },
	update: async function(req, res) {
        try {
			let productos;
			if (req.file) {
				let product ={
					...req.body,
					img : 'img/groups/' + req.file.filename
				}
				await productService.update(product,req.params.id)
            	productos = await productService.getAll(); 
            	res.render('products/product-detail', {listaDeProductos: productos})
			}else{
				productos = await productService.getAll();
			}
            res.render("products/product-detail", {listaDeProductos: productos})	
        } catch (error) {
            console.log(error);
            res.send("Ha ocurrido un error inesperado al guardar el producto").status(500);
        }
    },
	destroy: async function(req,res){
        try {
            await productService.delete(req.params.id);
            res.redirect("/productos/admin")
        } catch (error) {
            console.log(error)
            res.send("No se pudo eliminar!!"); 
        }
    }
}
