function productosEnElCarrito(){
    //si hay un carrito, parseo el carrito y determino la cantidad de items que tiene
    return localStorage.carrito ? JSON.parse(localStorage.carrito).length : 0
}

function actualizarContadorCarrito() {
    let cartNumbers = document.querySelectorAll(".cart-number");
    let cantidad = productosEnElCarrito();
    cartNumbers.forEach(cartNumber => {
        cartNumber.innerText = cantidad;
    });
}

window.addEventListener("load", function(){
    let  botonesComprar = document.querySelectorAll(".agregar_carrito")
    actualizarContadorCarrito();
    
    botonesComprar.forEach((boton) =>{
        //escuchar el click
        boton.addEventListener("click" , (e) =>{
            //console.log(e.target.dataset.id);
            /*hay un carrito en local storage*/ 
            if (localStorage.carrito) {
                let carrito = JSON.parse(localStorage.carrito);

                let index = (carrito.findIndex(
                    prod =>prod.id == e.target.dataset.id)
                );
                //si mi producto esta en el carrito le sumo 1
                if (index != -1) {
                    carrito[index].quantity ++
                } else{
                    //sino lo agrego con push
                    carrito.push({id: e.target.dataset.id, quantity: 1})
                }
                localStorage.setItem('carrito', JSON.stringify(carrito));

                
                //sino lo agrego con push
            } else{
                localStorage.setItem(
                    'carrito', 
                    JSON.stringify([{ id: e.target.dataset.id, quantity: 1 }]))
            }
            actualizarContadorCarrito();
        })
    })
});