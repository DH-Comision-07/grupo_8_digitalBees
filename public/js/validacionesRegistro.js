window.addEventListener("load", function(){


    document.querySelector('.boton_registrar').addEventListener('click', function(event) {
        event.preventDefault(); // Evitar que el formulario se envíe automáticamente
    
        // Validar campos aquí
        let valid = true; // Variable para almacenar el estado de validación

        // validación de nombre
        let firstName = document.getElementById('first_name').value;
        let firstNameError = document.querySelector('#first_name_error'); // Elemento de error asociado al campo nombre
        
        if (firstName.trim() === '') {
            firstNameError.innerHTML = 'El campo nombre es obligatorio';
            valid = false; // Marcar como no válido
        } else if (firstName.trim().length <= 3) {
            firstNameError.innerHTML = 'El campo debe tener más de 3 caracteres';
            valid = false; // Marcar como no válido
        } else {
            firstNameError.innerHTML = ''; // Limpiar mensaje de error si es válido
        }
    
        // validación de apellido
        let lastName = document.getElementById('last_name').value;
        let lastNameError = document.querySelector('#last_name_error'); // Elemento de error asociado al campo apellido
                
        if (lastName.trim() === '') {
            lastNameError.innerHTML = 'El campo apellido es obligatorio';
            valid = false; // Marcar como no válido
        } else if (lastName.trim().length <= 3) {
            lastNameError.innerHTML = 'El campo debe tener más de 3 caracteres';
            valid = false; // Marcar como no válido
        } else {
            lastNameError.innerHTML = ''; // Limpiar mensaje de error si es válido
        }
        
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
        
        // validación de pais
        
        let country = document.getElementById('country').value;
        let countryError = document.querySelector('#country_error'); 
                
        if (country === '') {
            countryError.innerHTML = 'El campo pais es obligatorio';
            valid = false; 
        } 

         // validación de ciudad
         let city = document.getElementById('city').value;
         let cityError = document.querySelector('#city_error'); 
 
         if (city === '') {
             cityError.innerHTML = 'El campo ciudad es obligatorio';
             valid = false; 
         } else {
             cityError.innerHTML = ''; 
         }
         
         //validación dirección
         let address = document.getElementById('address').value;
         let addressError = document.querySelector('#address_error'); 
                 
         if (address.trim() === '') {
             addressError.innerHTML = 'El campo dirección es obligatorio';
             valid = false; 
         } else if (address.trim().length <= 5) {
             addressError.innerHTML = 'El campo dirección debe tener más de 5 caracteres';
             valid = false; 
         } else {
             addressError.innerHTML = ''; 
         }
     
         //validación de teléfono 
         let phoneNumber = document.getElementById('phone_number').value;
         let phoneRule = /^[0-9]{6,}$/; // Solo números y al menos 6 dígitos
         let phoneError = document.querySelector('#phone_number_error');
 
         if (phoneNumber.trim() === '') {
             phoneError.innerHTML = 'El campo teléfono es obligatorio';
             valid = false; 
         } else if (!phoneRule.test(phoneNumber.trim())) {
             phoneError.innerHTML = 'Por favor, ingrese un teléfono válido';
             valid = false; 
         } else {
             phoneError.innerHTML = ''; 
         }
 
        // validación contraseña
        let password = document.getElementById('password').value;
        let passwordError = document.querySelector('#password_error'); // Elemento de error asociado al campo contraseña

        // Verificar si la contraseña está vacía
        if (password.trim() === '') {
            passwordError.innerHTML = 'El campo contraseña es obligatorio';
            valid = false; 
        } else if (password.length < 8) {
            passwordError.innerHTML = 'La contraseña debe tener al menos 8 caracteres';
            valid = false; 
        } else {
       
            passwordError.innerHTML = '';

            // Verificar si la contraseña incluye al menos una letra mayúscula
            let uppercaseRule = /[A-Z]/;
            if (!uppercaseRule.test(password)) {
                passwordError.innerHTML += 'La contraseña debe incluir al menos una letra mayúscula.<br>';
                valid = false; 
            }
            // Verificar si la contraseña incluye al menos una letra minúscula
            let lowercaseRule = /[a-z]/;
            if (!lowercaseRule.test(password)) {
                passwordError.innerHTML += 'La contraseña debe incluir al menos una letra minúscula.<br>';
                valid = false;
            }
            // Verificar si la contraseña incluye al menos un número
            let numberRule = /[0-9]/;
            if (!numberRule.test(password)) {
                passwordError.innerHTML += 'La contraseña debe incluir al menos un número.<br>';
                valid = false; 
            }
            // Verificar si la contraseña incluye al menos un símbolo especial
            let specialCharRule = /[!@#$%^&*(),.?":{}|<>]/;
            if (!specialCharRule.test(password)) {
                passwordError.innerHTML += 'La contraseña debe incluir al menos un símbolo especial.<br>';
                valid = false; 
            }
        }
    
        // Si todas las validaciones pasan, puedes enviar el formulario
        if (valid) {
            document.querySelector('form').submit(); // Envía el formulario
        }
    });
});

