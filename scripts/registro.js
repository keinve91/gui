function iniciarSesion(email) {
    if (typeof gtag === 'function') {
        gtag('config', 'G-KQ2E5FLEEF', {
            'user_id': email
        });

        gtag('event', 'login', { 
          'method': 'Email' 
        });
    }
    sessionStorage.setItem('usuarioLogueado', 'true');
    sessionStorage.setItem('usuarioEmail', email);
    
    window.location.href = 'index.html';
}

document.addEventListener('DOMContentLoaded', function() {
    const registroForm = document.getElementById('registro-form');

    if (registroForm) {
        registroForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const email = document.getElementById('email-form03-2g').value;
            const password = document.getElementById('password-form03-2g').value;

            if (!email || !password) {
                alert('Por favor, completa ambos campos.');
                return;
            }
            let usuariosDB = JSON.parse(localStorage.getItem('usuariosDB')) || [];

            const usuarioExistente = usuariosDB.find(user => user.email === email);

            if (usuarioExistente) {
                if (usuarioExistente.pass === password) {
                    alert('¡Bienvenido de nuevo! Iniciando sesión...');
                    iniciarSesion(email);
                } else {
                    alert('Contraseña incorrecta. Por favor, inténtalo de nuevo.');
                }

            } else {
                
                alert('Usuario no encontrado. Creando nueva cuenta...');
                
                const nuevoUsuario = {
                    email: email,
                    pass: password
                };

                usuariosDB.push(nuevoUsuario);

                localStorage.setItem('usuariosDB', JSON.stringify(usuariosDB));
                alert('¡Registro exitoso! Serás redirigido al inicio.');
                iniciarSesion(email);
            }
        });
    }
});