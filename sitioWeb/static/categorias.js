document.querySelectorAll('.category-btn').forEach(button => {
    button.addEventListener('click', function() {
        // Cerrar todas las subcategorías abiertas
        document.querySelectorAll('.subcategory-list').forEach(list => {
            list.style.display = 'none';
        });
        
        // Abrir solo la subcategoría de la categoría actual
        const subcategoryList = this.nextElementSibling;
        subcategoryList.style.display = 'block';
    });
});
