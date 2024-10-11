// Módulo de validación y manejo de archivos
const validarArchivos = () => {
    const archivoInput = document.getElementById('archivo');
    const fileList = Array.from(archivoInput.files);
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    const maxFileSize = 2 * 1024 * 1024; // 2 MB en bytes
    const validFiles = [];
    const removedFiles = [];

    // Filtrar archivos válidos y acumular los que se eliminarán
    fileList.forEach(file => {
        const isValidType = validTypes.includes(file.type);
        const isValidSize = file.size <= maxFileSize;

        if (!isValidType || !isValidSize) {
            removedFiles.push(file.name);
        } else {
            validFiles.push(file);
        }
    });

    /*
    // Mostrar alertas si hay archivos eliminados
    if (removedFiles.length > 0) {
        alert(`Los siguientes archivos fueron eliminados porque no cumplen las especificaciones: ${removedFiles.join(', ')}`);
    }

    // Actualizar la lista de archivos válidos en el input
    const dataTransfer = new DataTransfer();
    validFiles.forEach(file => dataTransfer.items.add(file));
    archivoInput.files = dataTransfer.files;
    */
    // Mostrar una alerta con los archivos válidos seleccionados
    if (validFiles.length > 0) {
        alert(`Archivos válidos seleccionados: ${validFiles.map(file => file.name).join(', ')}`);
    }

    return validFiles.length > 0; // Retorna true si hay archivos válidos
};





// Módulo de validación del formulario
const validarFormulario = (event) => {
    // Validar que haya al menos un archivo válido seleccionado
    const archivosValidos = validarArchivos();
    if (!archivosValidos) {
        event.preventDefault(); // Cancelar envío si no hay archivos válidos
        alert('Debes seleccionar al menos un archivo válido.');
        return;
    }

    // Validar campos obligatorios
    const provincia = document.getElementById('provincia').value;
    const urlMapa = document.getElementById('urlMapa').value;
    const material = document.getElementById('material').value;
    const precio = document.getElementById('precio').value;
    const terminos = document.getElementById('terminos').checked;

    if (!provincia) {
        alert('Debes seleccionar una provincia.');
        event.preventDefault();
        return;
    }

    if (!urlMapa) {
        alert('Debes ingresar una dirección válida.');
        event.preventDefault();
        return;
    }

    if (!material) {
        alert('Debes seleccionar un tipo de material.');
        event.preventDefault();
        return;
    }

    if (!precio || precio <= 0) {
        alert('Debes ingresar un precio válido mayor a cero.');
        event.preventDefault();
        return;
    }

    if (!terminos) {
        alert('Debes aceptar las condiciones del servicio y la Política de Privacidad.');
        event.preventDefault();
        return;
    }

    // Aquí puedes añadir otras validaciones del formulario si es necesario
};




// Módulo de inicialización de eventos
const inicializarEventos = () => {
    // Asociar la validación de archivos al cambio del input de archivos
    document.getElementById('archivo').addEventListener('change', validarArchivos);

    // Asociar la validación completa del formulario al submit
    document.getElementById('ofertaForm').addEventListener('submit', validarFormulario);

    // Asociar el cambio del departamento para actualizar las provincias
    document.getElementById('departamento').addEventListener('change', function() {
        const provinciaSelect = document.getElementById('provincia');
        provinciaSelect.innerHTML = '<option value="" disabled selected>Seleccionar Provincia</option>';

        const provincias = JSON.parse(this.options[this.selectedIndex].getAttribute('data-provincias'));

        provincias.forEach(function(provincia) {
            const option = document.createElement('option');
            option.value = provincia;
            option.textContent = provincia;
            provinciaSelect.appendChild(option);
        });
    });   
};

// Inicializar eventos cuando el DOM esté cargado
document.addEventListener('DOMContentLoaded', inicializarEventos);



