/**
 * * @param {string} nombreObra
 * @param {number} precioObra
 * @param {string} salaObra
 * @param {string} imgObra
 */
function comprarEntrada(nombreObra, precioObra, salaObra, imgObra) {
    const usuario = sessionStorage.getItem('usuarioLogueado');
    
    if (usuario !== 'true') {
        alert('Por favor, inicia sesión para poder comprar.');
        window.location.href = 'registro.html';
        return;
    }

    if (typeof gtag === 'function') {
        gtag('event', 'begin_checkout', {
            'event_category': 'Ecommerce',
            'event_label': nombreObra,
            'value': precioObra,
            'items': [{
                'item_name': nombreObra,
                'price': precioObra,
                'quantity': 1
            }]
        });
    }
    
    const entrada = {
        nombre: nombreObra,
        precioUnitario: precioObra,
        sala: salaObra,
        imagen: imgObra,
        cantidad: 1
    };

    localStorage.setItem('carritoItem', JSON.stringify(entrada));
    
    window.location.href = 'comprar.html';
}