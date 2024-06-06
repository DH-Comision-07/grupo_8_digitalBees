window.addEventListener("load", function(){

    document.querySelector('.boton_ingresar').addEventListener('click', function(event) {
        event.preventDefault(); // Evitar que el formulario se envíe automáticamente
    
        // Validar campos aquí
        let valid = true; // Variable para almacenar el estado de validación

        // validación de email
        let email = document.getElementById('email').value;
        let emailRule = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        let emailError = document.querySelector('#email_error'); // Elemento de error asociado al campo email
                
        if (email.trim() === '') {
            emailError.innerHTML = 'El campo email es obligatorio';
            valid = false; // Marcar como no válido
        } else if (!emailRule.test(email.trim())) {
            emailError.innerHTML = 'Por favor, ingrese un email válido';
            valid = false; // Marcar como no válido
        } else {
            emailError.innerHTML = ''; // Limpiar mensaje de error si es válido
        }
        
        // validación contraseña
        let password = document.getElementById('password').value;
        let passwordError = document.querySelector('#password_error'); // Elemento de error asociado al campo contraseña

        // Verificar si la contraseña está vacía
        if (password.trim() === '') {
            passwordError.innerHTML = 'El campo contraseña es obligatorio';
            valid = false; // Marcar como no válido
        } else {
            // Reiniciar el mensaje de error
            passwordError.innerHTML = '';
        }
    
        // Si todas las validaciones pasan, puedes enviar el formulario
        if (valid) {
            document.querySelector('form').submit(); // Envía el formulario
        }
    });
});

