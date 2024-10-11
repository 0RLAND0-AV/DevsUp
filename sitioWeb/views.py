from django.shortcuts import render, redirect
from django.urls import path
from django.contrib import admin
from .models import Usuario , Producto
from django.http import HttpResponse
from django.contrib.auth import authenticate, login ,logout , authenticate
from django.contrib import messages
from django.core.exceptions import ValidationError

# Create your views here.
def baseView(request):
    '''Esto es la pagina principal'''
        
    user_id = request.session.get('user_id')
    user = None
    if user_id:
        user = Usuario.objects.get(idUsuario=user_id)
    productos = Producto.objects.all()    
    return render(request, "base.html",{'user': user, 'productos': productos})

def login_view(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        
        # Autenticar usuario
        user = Usuario.objects.filter(nombre=username, contraseña=password).first()

        if user:
            # Guardar usuario en la sesión
            request.session['user_id'] = user.idUsuario
            request.session['username'] = user.nombre  # Guardar el nombre del usuario en la sesión
            messages.success(request, '¡Bienvenido, {}! Has iniciado sesión correctamente.'.format(user.nombre))
            return redirect('base')  # Redirige a la página principal
        else:
            messages.error(request, 'Usuario o contraseña incorrectos')
    
    return render(request, 'base.html')

def registroView(request):
    if request.method == 'POST':
        # Obtener los datos del formulario
        nombre = request.POST.get('username')
        correo = request.POST.get('email')
        contraseña = request.POST.get('password')
        confirmar_contraseña = request.POST.get('confirmPassword')

        # Validación básica
        if contraseña != confirmar_contraseña:
            messages.error(request, 'Las contraseñas no coinciden.')
            return redirect('registro')

        if Usuario.objects.filter(correo=correo).exists():
            messages.error(request, 'El correo electrónico ya está registrado.')
            return redirect('registro')

        # Crear y guardar el usuario en la base de datos
        usuario = Usuario(nombre=nombre, correo=correo, contraseña=contraseña)
        try:
            usuario.save()
            messages.success(request, 'Usuario registrado exitosamente.')
            return redirect('base')  # Redirige al login después del registro
        except ValidationError as e:
            messages.error(request, 'Ocurrió un error al guardar el usuario.')
            return redirect('registro')

    return render(request, 'registro.html')

def perfil_view(request):
    user_id = request.session.get('user_id')
    
    if not user_id:
        return redirect('login')  # Redirigir al login si no está autenticado
    
    user = Usuario.objects.get(idUsuario=user_id)

    if request.method == 'POST':
        # Si hay un archivo de imagen en la solicitud
        if 'imagenPerfil' in request.FILES:
            user.foto = request.FILES['imagenPerfil']  # Asigna la nueva imagen
        
        # Actualizar el nombre y el correo electrónico
        user.nombre = request.POST.get('nombre', user.nombre)  # Obtiene el nuevo nombre, o mantiene el antiguo
        user.correo = request.POST.get('correo', user.correo)  # Actualiza el correo electrónico

        nueva_contraseña = request.POST.get('contraseña')
        if nueva_contraseña:  # Si se proporcionó una nueva contraseña
            user.contraseña = nueva_contraseña  # Asigna la nueva contraseña

        user.save()  # Guarda los cambios en la base de datos

    return render(request, 'perfil.html', {'user': user})

def logout_request(request):
    logout(request)
    messages.info(request, "Saliste exitosamente")
    return redirect("base")

def ofertarMView(request):
    user_id = request.session.get('user_id')
    
    if not user_id:
        return redirect('login')  # Redirigir al login si no está autenticado
    
    user = Usuario.objects.get(idUsuario=user_id)

    if request.method == 'POST':
        # Si hay un archivo de imagen en la solicitud
        if 'imagenPerfil' in request.FILES:
            user.foto = request.FILES['imagenPerfil']  # Asigna la nueva imagen
        
        # Actualizar el nombre y el correo electrónico
        user.nombre = request.POST.get('nombre', user.nombre)  # Obtiene el nuevo nombre, o mantiene el antiguo
        user.correo = request.POST.get('correo', user.correo)  # Actualiza el correo electrónico

        nueva_contraseña = request.POST.get('contraseña')
        if nueva_contraseña:  # Si se proporcionó una nueva contraseña
            user.contraseña = nueva_contraseña  # Asigna la nueva contraseña

        user.save()  # Guarda los cambios en la base de datos
    return render(request,'ofertar.html',{'user': user})

def productos_view(request):
    user_id = request.session.get('user_id')
    user = None
    if user_id:
        user = Usuario.objects.get(idUsuario=user_id)
    
    productos = Producto.objects.all()  # Obtener todos los productos de la base de datos

    return render(request, "publicaciones.html", {'user': user, 'productos': productos})
