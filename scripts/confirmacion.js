document.addEventListener('DOMContentLoaded', function() {
    
    const resumenDivContainer = document.getElementById('resumen-confirmacion');
    if (!resumenDivContainer) {
        console.error("No se encontró el div #resumen-confirmacion.");
        return;
    }
    const resumenDiv = resumenDivContainer.querySelector('.card-body');
    if (!resumenDiv) {
        console.error("No se encontró el .card-body dentro de #resumen-confirmacion.");
        return;
    }

    const compraJSON = localStorage.getItem('compraConfirmada');
    
    if (compraJSON) {
        try {
            const compra = JSON.parse(compraJSON);
                resumenDiv.innerHTML = `
                <h5 class="card-title">Resumen de tu Pedido</h5>
                <p class="card-text">Hola, <strong>${compra.nombreCliente}</strong>. Hemos enviado la confirmación a <strong>${compra.emailCliente}</strong>.</p>
                <ul class="list-group list-group-flush">
                    <li class="list-group-item"><strong>Obra:</strong> ${compra.obra}</li>
                    <li class="list-group-item"><strong>Sala:</strong> ${compra.sala}</li>
                    <li class="list-group-item"><strong>Cantidad:</strong> ${compra.cantidad}</li>
                    <li class="list-group-item"><strong>Total Pagado:</strong> $${compra.totalPagado.toFixed(2)}</li>
                </ul>
                <p class="card-text mt-3">¡Disfruta la función!</p>
            `;
            
            localStorage.removeItem('compraConfirmada');
            localStorage.removeItem('carritoItem');

        } catch (e) {
            console.error("Error al parsear JSON de confirmación:", e);
            resumenDiv.innerHTML = `
                <h5 class="card-title text-danger">Error</h5>
                <p class="card-text">Hubo un error al procesar tu confirmación.</p>
                <a href="cartelera.html" class="btn btn-secondary">Ver Cartelera</a>
            `;
        }

    } else {
        resumenDiv.innerHTML = `
            <h5 class="card-title text-danger">Error</h5>
            <p class="card-text">No hemos encontrado una compra para confirmar.</p>
            <a href="cartelera.html" class="btn btn-secondary">Ver Cartelera</a>
        `;
    }
});