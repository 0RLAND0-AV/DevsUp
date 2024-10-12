// Funcionalidad de los botones de categorías
document.querySelectorAll('.category-btn').forEach(button => {
    button.addEventListener('click', function () {
        // Obtener la lista de subcategorías relacionada con el botón clicado
        const subcategoryList = this.nextElementSibling;
        
        // Verificar si la lista está visible
        const isVisible = subcategoryList.style.display === 'block';

        // Cerrar todas las subcategorías
        document.querySelectorAll('.subcategory-list').forEach(list => {
            list.style.display = 'none';
        });

        // Remover la clase active de todos los botones para restaurar el color original
        document.querySelectorAll('.category-btn').forEach(btn => {
            btn.classList.remove('active');
        });

        // Si la lista no estaba visible, mostrarla y agregar la clase active al botón
        if (!isVisible) {
            subcategoryList.style.display = 'block';
            this.classList.add('active');
        }
    });
});

// Funcionalidad de los botones de subcategorías
document.querySelectorAll('.subcategory-btn').forEach(button => {
    button.addEventListener('click', function () {
        const subcategory = this;

        // Cambiar el color de fondo al presionar el botón
        subcategory.style.backgroundColor = '#ff4500';

        // Después de 200 ms, restaurar el color original
        setTimeout(() => {
            subcategory.style.backgroundColor = ''; // Restaurar al valor original (CSS o transparente)
        }, 200);
    });
});
