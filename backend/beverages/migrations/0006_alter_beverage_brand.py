# Generated by Django 5.0 on 2024-01-23 19:29

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('beverages', '0005_beverage_added_by_brand_added_by'),
    ]

    operations = [
        migrations.AlterField(
            model_name='beverage',
            name='brand',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='beverages.brand'),
            preserve_default=False,
        ),
    ]
