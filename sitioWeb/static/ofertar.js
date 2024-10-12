// Módulo de validación y manejo de archivos
const validarArchivos = () => {
    const archivoInput = document.getElementById('archivo');
    const fileNameDisplay = document.getElementById('file-name');
    const previewContainer = document.getElementById('preview-container');
    
    if (!archivoInput) return false;

    const fileList = Array.from(archivoInput.files);
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    const maxFileSize = 2 * 1024 * 1024; // 2 MB en bytes
    const validFiles = [];
    const removedFiles = [];

    // Limpiar cualquier vista previa anterior
    previewContainer.innerHTML = "";

    // Filtrar archivos válidos y acumular los que se eliminarán
    fileList.forEach(file => {
        const isValidType = validTypes.includes(file.type);
        const isValidSize = file.size <= maxFileSize;

        if (!isValidType || !isValidSize) {
            removedFiles.push(file.name);
        } else {
            validFiles.push(file);

            // Crear una miniatura para cada imagen válida
            const reader = new FileReader();
            reader.onload = function (e) {
                const img = document.createElement('img');
                img.src = e.target.result;
                previewContainer.appendChild(img); // Añadir la miniatura al contenedor
            };
            reader.readAsDataURL(file); // Leer el archivo como DataURL para mostrar la imagen
        }
    });
    
    // Mostrar alerta personalizada si hay archivos eliminados
    if (removedFiles.length > 0) {
        Swal.fire({
            icon: 'error',
            title: 'Archivos eliminados',
            text: `Los siguientes archivos fueron eliminados porque no cumplen las especificaciones: ${removedFiles.join(', ')}`,
            footer: '<label> Archivos validos[.jpg, .jpeg] que no pesen mas de 2mb</>' // Puedes personalizar el footer o quitarlo
        });
    }

    // Mostrar nombres de archivos seleccionados en el elemento <span>
    if (validFiles.length > 0) {
        fileNameDisplay.textContent = `Archivos seleccionados: ${validFiles.map(file => file.name).join(', ')}`;
    } else {
        fileNameDisplay.textContent = "No se ha seleccionado archivo válido";
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
    //Añadir reporte de JS al apretar el boton Cancelar
    document.getElementById('button-cancelar').addEventListener('click', function() {
        Swal.fire({
        title: "¿Estás seguro?",
        text: "¡No podrás revertir esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí",
        cancelButtonText: "Cancelar"
        }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
            title: "¡Bueno pues te jodes prro!",
            text: "Tu Oferta ha sido eliminado.",
            icon: "success"
        }).then(() => {
            // Redireccionar a la página home.html
            window.location.href = '/';
        });   
        }
        });
    });       
    //Añadir reporte de JS al apretar el boton Ofertar
    document.getElementById('button-ofertar').addEventListener('click', function() {
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Tu oferta fue guardada correctamente",
            showConfirmButton: false,
            timer: 1500
        });
    });  


    
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



