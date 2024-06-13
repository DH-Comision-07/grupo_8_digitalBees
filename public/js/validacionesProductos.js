window.addEventListener("load", function(){


    document.querySelector('.agregar_producto').addEventListener('click', function(event) {
        event.preventDefault(); // Evitar que el formulario se envíe automáticamente
    
        let valid = true; // Variable para almacenar el estado de validación

        // validación de nombre producto
        let title = document.getElementById('title').value;
        let titleError = document.querySelector('#title_error');
        
        if (title.trim() === '') {
            titleError.innerHTML = 'El campo nombre de producto es obligatorio';
            valid = false; // Marcar como no válido
        } else if (title.trim().length <= 5) {
            titleError.innerHTML = 'El campo debe tener más de 3 caracteres';
            valid = false; // Marcar como no válido
        } else {
            titleError.innerHTML = ''; 
        }
    
        // validación de descripcion
        let description = document.getElementById('description').value;
        let descriptionError = document.querySelector('#description_error'); 
                
        if (description.trim() === '') {
            descriptionError.innerHTML = 'El campo descripcion es obligatorio';
            valid = false; 
        } else if (description.trim().length <= 20) {
            descriptionError.innerHTML = 'El campo debe tener más de 20 caracteres';
            valid = false; 
        } else {
            descriptionError.innerHTML = ''; 
        }
        
        // validación de categoria
        let categoria = document.getElementById('categoria_id').value;
        let categoriaError = document.querySelector('#categoria_id_error'); 
                
        if (categoria.trim() === '') {
            categoriaError.innerHTML = 'El campo categoria es obligatorio';
            valid = false; // Marcar como no válido
            categoriaError.innerHTML = 'Por favor, ingrese un categoria válido';
            valid = false; // Marcar como no válido
        } else {
            categoriaError.innerHTML = ''; // Limpiar mensaje de error si es válido
        }
        
        // validación de precio
        
        let cost = document.getElementById('cost').value;
        let costError = document.querySelector('#cost_error'); 
                
        if (cost === '') {
            costError.innerHTML = 'El campo precio es obligatorio';
            valid = false; 
        } 

         //validacion de imagen
        let img = document.querySelector('input[name="img"]').files[0];
        let imgError = document.querySelector('#img_error');

        if (!img) {
            imgError.innerHTML = 'Por favor selecciona una imagen de perfil';
            valid = false; // Marcar como no válido
        } else if (!isValidImageType(img.type)) {
            imgError.innerHTML = 'Deberá ser un archivo válido (JPG, JPEG, PNG, GIF)';
            valid = false; // Marcar como no válido
        } else {
            imgError.innerHTML = ''; // Limpiar mensaje de error si es válido
        }
    
        // Si todas las validaciones pasan, puedes enviar el formulario
        if (valid) {
            document.querySelector('form').submit(); // Envía el formulario
        }
    });
});