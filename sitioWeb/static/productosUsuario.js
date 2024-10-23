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

// Editar producto seleccionado
document.getElementById('editarSeleccionados').addEventListener('click', function() {
    const selectedProducts = document.querySelectorAll('.producto-checkbox:checked');
    
    // Si no se ha seleccionado ningún producto
    if (selectedProducts.length === 0) {
        alert("Por favor selecciona un producto para editar.");
        return;
    }

    // Si se selecciona más de un producto
    if (selectedProducts.length > 1) {
        alert("Solo puedes seleccionar un producto para editar.");
        return;
    }

    // Si hay un solo producto seleccionado, proceder con la edición
    const product = selectedProducts[0];
    const productId = product.getAttribute('data-id');
    console.log("Editando producto con ID:", productId); // Aquí puedes realizar la lógica de edición

    // Redirigir a la página de edición del producto seleccionado
    window.location.href = `/editar/${productId}/`;
});


// Eliminar productos seleccionados con confirmación
document.getElementById('eliminarSeleccionados').addEventListener('click', function() {
    const selectedProducts = document.querySelectorAll('.producto-checkbox:checked');
    if (selectedProducts.length === 0) {
        alert("Por favor selecciona al menos un producto para eliminar.");
        return;
    }

    // Mostrar confirmación antes de eliminar
    const confirmacion = confirm("¿Estás seguro de que quieres eliminar los productos seleccionados?");
    if (confirmacion) {
        selectedProducts.forEach(product => {
            const productId = product.getAttribute('data-id');
            console.log("Eliminando producto con ID:", productId); // Aquí puedes realizar la lógica de eliminación
            // Ejemplo: redirigir a la lógica de eliminación en tu backend
            window.location.href = `/eliminar/${productId}/`;
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
