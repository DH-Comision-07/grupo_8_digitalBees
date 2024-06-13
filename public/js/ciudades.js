window.onload = function() {
    let countrySelect = document.getElementById('country');
    let cityContainer = document.getElementById('city-container');
    let citySelect = document.getElementById('city');

    // Definir las ciudades para cada país
    let citiesByCountry = {
        Argentina: ['Buenos Aires', 'Córdoba', 'Rosario'],
        Colombia: ['Bogotá', 'Medellín', 'Cali'],
        Mexico: ['Ciudad de México', 'Guadalajara', 'Monterrey']
    };

    // Agregar el evento 'change' al campo de selección del país
    countrySelect.onchange = function() {
        let selectedCountry = countrySelect.value;
        let cities = citiesByCountry[selectedCountry] || [];

        // Limpiar las opciones anteriores de la ciudad
        citySelect.innerHTML = '<option value="">Seleccione una ciudad</option>';

        // Agregar las nuevas opciones de ciudad
        for (let i = 0; i < cities.length; i++) {
            let option = document.createElement('option');
            option.value = cities[i];
            option.textContent = cities[i];
            citySelect.appendChild(option);
        }

        // Mostrar el contenedor del campo de selección de ciudad si se seleccionó un país
        if (selectedCountry) {
            cityContainer.style.display = 'block';
        } else {
            cityContainer.style.display = 'none';
        }
    };
};