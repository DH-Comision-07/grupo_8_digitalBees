document.addEventListener("DOMContentLoaded", function() {
    let form = document.getElementById("loginForm");

    form.addEventListener("submit", function(event) {
        event.preventDefault(); 

        if (validarFormulario()) {
            this.submit(); 
        }
    });

    function validarFormulario() {
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;
        let emailError = document.getElementById("email_error");
        let passwordError = document.getElementById("password_error");
        let emailRules = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        emailError.innerHTML = "";
        passwordError.innerHTML = "";

        if (!email.match(emailRules)) {
            emailError.innerHTML = "Ingrese un correo electrónico válido.";
            return false;
        }

        if (password == "") {
            passwordError.innerHTML = "debe ingresar la contraseña";
            return false;
        }

        return true;
    }
});