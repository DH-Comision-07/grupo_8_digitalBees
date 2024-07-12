let carrito = [];
function removeItem(index) {
    if (carrito.length > 1) {
      carrito.splice(index, 1);
      products.splice(index, 1);
      localStorage.setItem("carrito", JSON.stringify(carrito));
      document.getElementById(`row${index}`).remove();
    } else {
      localStorage.removeItem("carrito");
      products = [];
      setCarritoVacio();
    }
}
function setCarritoVacio() {
    cartRows.innerHTML = cartRows.innerHTML = `
    <tr>     
        <td colspan="5"><div class="alert alert-warning my-2 text-center">No tienes productos en el carrito</div></td>
    </tr>            
    `;
}

function vaciarCarrito() {
    localStorage.removeItem("carrito")
}

function calcularTotal(products) {
    return products.reduce(
        (acum, product) => (acum += product.cost * product.quantity),
        0
    );
}

function updateSubtotal() {
    const subtotalElement = document.querySelector('.totalSubAmount');
    subtotalElement.textContent = `$ ${calcularTotal(products)}`;
}

//pedidos realizados 
window.addEventListener("load", function(){
let checkoutCart = document.querySelector('#checkoutCart')

checkoutCart.onsubmit = (e) => {
    e.preventDefault();
    const currentDate = new Date();
    const formData = {
        detallePedidos: products,
        date_sale: currentDate,
        total: calcularTotal(products),
    }

    fetch('/api/checkout', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })
        .then(r => r.json())
        .then((res) => {
            if (res.ok) {
                vaciarCarrito()
                location.href =`/productos/pedido/${res.order.id}`
            }
        })
        .catch(error => {
            console.error("Error:", error);
        });
}

})
