document.addEventListener('DOMContentLoaded', function() {
    const usuario = sessionStorage.getItem('usuarioLogueado');
    const email = sessionStorage.getItem('usuarioEmail');
    const navButtonContainer = document.querySelector('.navbar-buttons');
    if (!navButtonContainer) return; 

    if (usuario === 'true' && email) {
        if (typeof gtag === 'function') {
            gtag('config', 'G-KQ2E5FLEEF', {
                'user_id': email
            });
        }

        navButtonContainer.innerHTML = `
            <a class="btn btn-primary display-4" href="#" id="logout-btn">CERRAR SESIÓN</a>
        `;
        
        const logoutBtn = document.getElementById('logout-btn');
        if (logoutBtn) {
             logoutBtn.addEventListener('click', function(e) {
                 e.preventDefault();
                 if (typeof gtag === 'function') {
                     gtag('event', 'logout');
                 }
                 sessionStorage.removeItem('usuarioLogueado');
                 sessionStorage.removeItem('usuarioEmail');
                 alert('Sesión cerrada.');
                 window.location.href = 'index.html';
             });
        }
    } else {
        navButtonContainer.innerHTML = '<a class="btn btn-primary display-4" href="registro.html">Iniciar Sesion</a>';
    }
});