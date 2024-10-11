from django.db import models

# Create your models here.

# Modelo Usuario
class Usuario(models.Model):
    idUsuario = models.AutoField(primary_key=True,null= False ,blank=False)  # Identificador único del usuario
    nombre = models.CharField(max_length=100,null= True ,blank=True)  # Nombre del usuario
    contraseña = models.CharField(max_length=100,null= True ,blank=True)  # Contraseña del usuario
    correo = models.EmailField(unique=True,null= True ,blank=False)  # Correo único
    foto = models.ImageField(upload_to='fotos/', blank=True, null=True)  # Foto de perfil

    class Meta:
        db_table = "Usuarios"
        verbose_name = "Usuario"
        verbose_name_plural = "Usuarios"

    def __str__(self):
        return self.nombre

# Modelo Categoria
class Categoria(models.Model):
    nombre = models.CharField(max_length=100)  # Nombre de la categoría (Madera, Ladrillo, etc.)

    class Meta:
        db_table = "Categorias"
        verbose_name = "Categoria"
        verbose_name_plural = "Categorias"

    def __str__(self):
        return self.nombre
    
class Departamento(models.Model):
    nombre = models.CharField(max_length=100)  # Nombre del departamento

    class Meta:
        db_table = "Departamentos"
        verbose_name = "Departamento"
        verbose_name_plural = "Departamentos"

    def __str__(self):
        return self.nombre

class Provincia(models.Model):
    nombre = models.CharField(max_length=100)  # Nombre de la provincia
    departamento = models.ForeignKey(Departamento, on_delete=models.CASCADE, related_name='provincias')  # Relación con el departamento

    class Meta:
        db_table = "Provincias"
        verbose_name = "Provincia"
        verbose_name_plural = "Provincias"

    def __str__(self):
        return self.nombre

# Modelo EstadoDelProducto
class EstadoDelProducto(models.Model):
    estado = models.CharField(max_length=100)  # Estado del producto (nuevo, viejo, usado, seminuevo)

    class Meta:
        db_table = "EstadosDelProducto"
        verbose_name = "Estado del Producto"
        verbose_name_plural = "Estados del Producto"

    def __str__(self):
        return self.estado

# Modelo Producto
class Producto(models.Model):
    nombre = models.CharField(max_length=100 ,null= True ,blank=True)  # Nombre del producto
    descripcion = models.TextField(blank=True, null=True)  # Descripción del producto
    precio = models.DecimalField(max_digits=10, decimal_places=2,null= True ,blank=True)  # Precio del producto
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE,null= True ,blank=True)  # Relación con el usuario
    categoria = models.ForeignKey(Categoria, on_delete=models.CASCADE,null= True ,blank=True)  # Relación con la categoría
    provincia = models.ForeignKey(Provincia, on_delete=models.CASCADE, null=True, blank=True)  # Relación con la provincia
    estado = models.ForeignKey(EstadoDelProducto, on_delete=models.CASCADE, null=True, blank=True)  # Relación con el estado del producto


    class Meta:
        db_table = "Productos"
        verbose_name = "Producto"
        verbose_name_plural = "Productos"

    def __str__(self):
        return self.nombre

# Modelo Imagenes
class Imagenes(models.Model):
    ruta = models.ImageField(upload_to='productos/')  # Ruta o archivo de la imagen
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE, related_name='imagenes',null= True ,blank=True)  # Relación con el producto

    class Meta:
        db_table = "ProductImages"
        verbose_name = "Imagen del Producto"
        verbose_name_plural = "Imágenes del Producto"

    def __str__(self):
        return f"Imagen de {self.producto.nombre}"
    
