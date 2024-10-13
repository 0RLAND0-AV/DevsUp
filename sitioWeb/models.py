from django.db import models
from django.utils import timezone
# Create your models here.

# Modelo Usuario
class Usuario(models.Model):
    idUsuario = models.AutoField(primary_key=True,null= False ,blank=False)  # Identificador único del usuario
    nombre = models.CharField(max_length=100,null= False ,blank=False)  # Nombre del usuario
    contraseña = models.CharField(max_length=100,null= False ,blank=False,default='00000000')  # Contraseña del usuario
    correo = models.EmailField(unique=True,null= False ,blank=False,)  # Correo único
    celular = models.CharField(max_length=15, null=True, blank=True)  # Campo nuevo para celular
    foto = models.ImageField(upload_to='fotos/', blank=True, null=True)  # Foto de perfil
    fecha_creacion = models.DateTimeField(auto_now_add=True)  # Fecha y hora de creación
    estadoUsuario = models.BooleanField(default=True)  # Estado del usuario (habilitado o no)

    class Meta:
        db_table = "Usuarios"
        verbose_name = "Usuario"
        verbose_name_plural = "Usuarios"

    def __str__(self):
        return self.nombre

# Modelo Categoria
class Categoria(models.Model):
    nombre = models.CharField(max_length=100, null=False, blank=False)

    class Meta:
        db_table = "Categorias"
        verbose_name = "Categoria"
        verbose_name_plural = "Categorias"

    def __str__(self):
        return self.nombre

# Modelo Producto
class Producto(models.Model):
    nombre = models.CharField(max_length=100 ,null= False ,blank=False)  # Nombre del producto
    departamento = models.CharField(max_length=100)
    provincia = models.CharField(max_length=100)
    direccion = models.CharField(max_length=200)
    subcategoria = models.CharField(max_length=100)
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    descripcion = models.TextField()
    estado = models.CharField(max_length=50, blank=True, null=True)
    usuarioid = models.ForeignKey(Usuario, on_delete=models.CASCADE,null= True ,blank=True)  # Relación con el usuario
    fecha_creacion = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "Productos"
        verbose_name = "Producto"
        verbose_name_plural = "Productos"

    def __str__(self):
        return self.nombre


from django.db import models


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
    
    
