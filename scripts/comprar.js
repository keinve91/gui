let precioUnitario = 0;
let itemSeleccionado = null;
let cantidadSeleccionada = 1;

document.addEventListener('DOMContentLoaded', function() {
    
    const itemJSON = localStorage.getItem('carritoItem');
    const carritoDiv = document.getElementById('resumen-carrito');
    const emailInput = document.getElementById('email-checkout');
    
    const userEmail = sessionStorage.getItem('usuarioEmail');
    if(emailInput && userEmail) {
        emailInput.value = userEmail;
    }

    if (itemJSON && carritoDiv) {
        itemSeleccionado = JSON.parse(itemJSON);
        precioUnitario = itemSeleccionado.precioUnitario;
        
        carritoDiv.innerHTML = `
            <img src="${itemSeleccionado.imagen}" class="img-fluid rounded mb-3" alt="${itemSeleccionado.nombre}">
            <h5 class="card-title">${itemSeleccionado.nombre}</h5>
            <p class="card-text mb-1">Sala: ${itemSeleccionado.sala}</p>
            <p class="card-text mb-2">Precio: $${precioUnitario.toFixed(2)}</p>
            <div class="form-group mb-3">
                <label for="cantidad" class="form-label">Cantidad:</label>
                <input type="number" class="form-control" id="cantidad" value="1" min="1" max="10">
            </div>
            <hr>
            <h6 class="card-subtitle mb-2 text-muted">Total</h6>
            <h4 id="precio-total">$${precioUnitario.toFixed(2)}</h4>
        `;
        document.getElementById('cantidad').addEventListener('input', actualizarTotal);

    } else if (carritoDiv) {
        carritoDiv.innerHTML = '<p>Tu carrito está vacío.</p><a href="cartelera.html" class="btn btn-sm btn-secondary">Volver a la cartelera</a>';
         if (document.getElementById('checkout-form')) {
             document.getElementById('checkout-form').style.display = 'none';
         }
    }

    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', function(event) {
            event.preventDefault(); 
            
            if(!itemSeleccionado) {
                alert("Error: No hay ningún item en el carrito.");
                return;
            }
            const nombre = document.querySelector('input[name="nombre"]').value;
            const email = document.querySelector('input[name="email"]').value;
            const total = precioUnitario * cantidadSeleccionada;
                if (typeof gtag === 'function') {
                gtag('event', 'purchase', {
                    'transaction_id': 'T' + Date.now(), 
                    'value': total,                     
                    'currency': 'ARS',                  
                    'items': [{
                        'item_id': itemSeleccionado.nombre.replace(/\s+/g, '_').toLowerCase(),
                        'item_name': itemSeleccionado.nombre,
                        'price': precioUnitario,
                        'quantity': cantidadSeleccionada
                    }]
                });
            }
            const compraConfirmada = {
                nombreCliente: nombre,
                emailCliente: email,
                obra: itemSeleccionado.nombre,
                sala: itemSeleccionado.sala,
                cantidad: cantidadSeleccionada,
                totalPagado: total
            };
            localStorage.setItem('compraConfirmada', JSON.stringify(compraConfirmada));
            
            localStorage.removeItem('carritoItem');
            
            window.location.href = 'confirmacion.html';
        });
    }

});

function actualizarTotal() {
    const cantidadInput = document.getElementById('cantidad');
    if (!cantidadInput) return;

    cantidadSeleccionada = parseInt(cantidadInput.value) || 1;
    if(cantidadSeleccionada < 1) {
        cantidadSeleccionada = 1;
        cantidadInput.value = 1;
    }
    
    const total = precioUnitario * cantidadSeleccionada;
    
    const precioTotalEl = document.getElementById('precio-total');
    if(precioTotalEl) {
        precioTotalEl.textContent = `$${total.toFixed(2)}`;
    }
}