# Generated by Django 4.2.1 on 2023-05-30 15:09

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):
    dependencies = [
        ("lineage", "0007_event"),
    ]

    operations = [
        migrations.AlterModelManagers(
            name="edge",
            managers=[],
        ),
        migrations.AlterModelManagers(
            name="node",
            managers=[],
        ),
        migrations.AlterField(
            model_name="edge",
            name="destination",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.PROTECT, related_name="destination_edges", to="lineage.node"
            ),
        ),
        migrations.AlterField(
            model_name="edge",
            name="source",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.PROTECT, related_name="source_edges", to="lineage.node"
            ),
        ),
    ]