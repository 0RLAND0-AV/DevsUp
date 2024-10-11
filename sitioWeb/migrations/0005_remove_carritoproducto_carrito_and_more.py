# Generated by Django 5.1.1 on 2024-10-11 13:36

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('sitioWeb', '0004_remove_carrito_productos_carritoproducto'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='carritoproducto',
            name='carrito',
        ),
        migrations.AddField(
            model_name='carritoproducto',
            name='usuario',
            field=models.ForeignKey(default=None, on_delete=django.db.models.deletion.CASCADE, related_name='productos_en_carrito', to='sitioWeb.usuario'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='carritoproducto',
            name='producto',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='usuarios_en_carrito', to='sitioWeb.producto'),
        ),
        migrations.DeleteModel(
            name='Carrito',
        ),
    ]