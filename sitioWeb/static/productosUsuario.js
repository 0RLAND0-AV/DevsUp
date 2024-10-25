// Filtro por estado (todos, activos, inactivos)
document.getElementById('filtro').addEventListener('change', function() {
    const filtro = this.value;
    const productCards = document.querySelectorAll('.product-card');

    productCards.forEach(card => {
        const estado = card.querySelector('.Estado').innerText.toLowerCase(); // El estado del producto, por ejemplo, "activo" o "inactivo"
        if (filtro === 'todos' || estado === filtro) {
            card.style.display = 'block'; // Mostrar producto
        } else {
            card.style.display = 'none'; // Ocultar producto
        }
    });
});

// Filtro por fechas (ascendente, descendente, por mes/año)
document.getElementById('filtro-fechas').addEventListener('change', function() {
    const filtroFechas = this.value;
    const productCards = Array.from(document.querySelectorAll('.product-card'));

    // Convertir fechas a objetos Date y ordenar
    productCards.sort((a, b) => {
        const fechaA = new Date(a.querySelector('.fecha').innerText); // Asumiendo que hay un elemento con clase .fecha con la fecha del producto
        const fechaB = new Date(b.querySelector('.fecha').innerText);

        if (filtroFechas === 'ascendente') {
            return fechaA - fechaB; // Ordenar de más antiguo a más reciente
        } else if (filtroFechas === 'descendente') {
            return fechaB - fechaA; // Ordenar de más reciente a más antiguo
        }
        return 0; // No realizar ningún cambio si no es ascendente o descendente
    });

    // Reorganizar los productos en el DOM según el nuevo orden
    const productGrid = document.getElementById('product-grid');
    productCards.forEach(card => {
        productGrid.appendChild(card);
    });

    // Si el filtro es por mes o por año
    if (filtroFechas === 'mes' || filtroFechas === 'año') {
        const currentDate = new Date();
        productCards.forEach(card => {
            const fechaProducto = new Date(card.querySelector('.fecha').innerText);

            if (filtroFechas === 'mes') {
                if (fechaProducto.getMonth() === currentDate.getMonth() && fechaProducto.getFullYear() === currentDate.getFullYear()) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            } else if (filtroFechas === 'año') {
                if (fechaProducto.getFullYear() === currentDate.getFullYear()) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            }
        });
    }
});


// Seleccionar/Deseleccionar todos los productos
document.getElementById('seleccionar-todo').addEventListener('click', function() {
    const allCheckboxes = document.querySelectorAll('.producto-checkbox');
    const isChecked = this.checked;
    allCheckboxes.forEach(checkbox => {
        checkbox.checked = isChecked;
    });
});


document.getElementById('eliminarSeleccionados').addEventListener('click', function () {
    const checkboxes = document.querySelectorAll('.checkbox-productoo:checked');
    const ids = Array.from(checkboxes).map(checkbox => checkbox.getAttribute('data-id'));

    if (ids.length === 0) {
        alert('Por favor, selecciona al menos un producto para eliminar.');
        return;
    }

    if (confirm('¿Estás seguro de que deseas eliminar los productos seleccionados?')) {
        // Agregar los IDs seleccionados al input oculto del formulario
        document.getElementById('product-ids-input').value = JSON.stringify(ids);

        // Enviar el formulario
        document.getElementById('form-eliminar-productos').submit();
    }
});

function toggleCheckboxes(source) {
    const checkboxes = document.querySelectorAll('.checkbox-productoo');
    checkboxes.forEach(checkbox => {
        checkbox.checked = source.checked;
    });
}