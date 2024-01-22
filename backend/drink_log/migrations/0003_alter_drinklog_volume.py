# Generated by Django 5.0 on 2024-01-22 20:19

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('drink_log', '0002_alter_drinklog_options'),
    ]

    operations = [
        migrations.AlterField(
            model_name='drinklog',
            name='volume',
            field=models.FloatField(validators=[django.core.validators.MinValueValidator(1, 'Volume cannot be zero')], verbose_name='Volume (mL)'),
        ),
    ]
