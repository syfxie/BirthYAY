# Generated by Django 4.1 on 2023-10-22 03:42

from django.db import migrations, models
import django.db.models.deletion
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('birthYay', '0002_alter_user_followers_gift'),
    ]

    operations = [
        migrations.CreateModel(
            name='Link',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('url', models.URLField()),
                ('gift', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='birthYay.gift')),
            ],
        ),
    ]