# Generated by Django 5.0 on 2024-01-12 14:42

import beverages.models
import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("beverages", "0004_alter_beverage_abv"),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name="beverage",
            name="added_by",
            field=models.ForeignKey(
                default=beverages.models.get_moderator_admin_pk,
                on_delete=django.db.models.deletion.SET_DEFAULT,
                to=settings.AUTH_USER_MODEL,
            ),
        ),
        migrations.AddField(
            model_name="brand",
            name="added_by",
            field=models.ForeignKey(
                default=beverages.models.get_moderator_admin_pk,
                on_delete=django.db.models.deletion.SET_DEFAULT,
                to=settings.AUTH_USER_MODEL,
            ),
        ),
    ]
