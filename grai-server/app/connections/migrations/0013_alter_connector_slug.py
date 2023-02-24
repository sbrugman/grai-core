# Generated by Django 4.1.7 on 2023-02-17 16:20

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("connections", "0012_run_commit_run_trigger_alter_connector_name_and_more"),
    ]

    operations = [
        migrations.AlterField(
            model_name="connector",
            name="slug",
            field=models.CharField(
                blank=True,
                choices=[
                    ("postgres", "postgres"),
                    ("snowflake", "snowflake"),
                    ("dbt", "dbt"),
                    ("yaml_file", "yaml_file"),
                    ("mssql", "mssql"),
                    ("bigquery", "bigquery"),
                    ("fivetran", "fivetran"),
                    ("mysql", "mysql"),
                ],
                max_length=255,
                null=True,
            ),
        ),
    ]