// Habilitar los campos para editar el producto
document.getElementById('editar-producto').addEventListener('click', function() {
    // Verificar si el botón está siendo clickeado correctamente
    console.log('Edit button clicked!');

    // Habilitar inputs, textareas y selects
    document.querySelectorAll('#producto-formulario input, #producto-formulario textarea, #producto-formulario select').forEach(input => {
        console.log('Habilitando campo:', input.name); // Verificar cada campo que está siendo habilitado
        input.disabled = false;
    });

    // Mostrar el botón de guardar
    document.getElementById('boton-guardar-producto').style.display = 'inline-block'; 
    console.log('Botón Guardar mostrado.');

    // Ocultar el botón de editar
    this.style.display = 'none';
});

// Actualización dinámica de subcategorías según la categoría seleccionada
document.getElementById('categoria-producto').addEventListener('change', function () {
    const categoriaId = this.value;
    console.log('Categoría seleccionada:', categoriaId); // Log para verificar la categoría seleccionada
    fetch(`/subcategorias/${categoriaId}/`)
        .then(response => response.json())
        .then(data => {
            const subcategoriaSelect = document.getElementById('subcategoria-producto');
            subcategoriaSelect.innerHTML = '';
            data.subcategorias.forEach(subcategoria => {
                const option = document.createElement('option');
                option.value = subcategoria.id;
                option.textContent = subcategoria.nombre;
                subcategoriaSelect.appendChild(option);
            });
        });
});

// Actualización dinámica de provincias según el departamento seleccionado
document.getElementById('departamento-producto').addEventListener('change', function () {
    const departamentoId = this.value;
    console.log('Departamento seleccionado:', departamentoId); // Log para verificar el departamento seleccionado
    fetch(`/provincias/${departamentoId}/`)
        .then(response => response.json())
        .then(data => {
            const provinciaSelect = document.getElementById('provincia-producto');
            provinciaSelect.innerHTML = '';
            data.provincias.forEach(provincia => {
                const option = document.createElement('option');
                option.value = provincia.id;
                option.textContent = provincia.nombre;
                provinciaSelect.appendChild(option);
            });
        });
});

document.getElementById('eliminar-producto').addEventListener('click', function() {
    var url = this.getAttribute('data-url'); // Obtiene la URL del atributo data-url

    if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
        console.log('Eliminando producto...');

        window.location.href = url; // Redirige a la URL de eliminación
    }
});