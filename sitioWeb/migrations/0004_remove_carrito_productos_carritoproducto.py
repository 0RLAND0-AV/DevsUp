# Generated by Django 5.1.1 on 2024-10-11 13:16

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sitioWeb', '0003_producto_estado_producto_producto_fecha_creacion_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='carrito',
            name='productos',
        ),
        migrations.CreateModel(
            name='CarritoProducto',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('carrito', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='productos', to='sitioWeb.carrito')),
                ('producto', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='sitioWeb.producto')),
            ],
            options={
                'verbose_name': 'Producto en Carrito',
                'verbose_name_plural': 'Productos en Carrito',
                'db_table': 'Carrito_Productos',
            },
        ),
    ]