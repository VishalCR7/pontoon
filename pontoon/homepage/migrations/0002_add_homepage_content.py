# -*- coding: utf-8 -*-
# Generated by Django 1.11.18 on 2019-02-18 18:13
from __future__ import unicode_literals

import os

from django.db import migrations


def get_homepage_content():
    module_dir = os.path.dirname(__file__)
    file_path = os.path.join(module_dir, '../templates/homepage_content.html')
    data_file = open(file_path , 'r')
    data = data_file.read()
    return data


def create_homepage_entry(apps, schema_editor):
    Homepage = apps.get_model('homepage', 'Homepage')
    homepage = Homepage.objects.create(text=get_homepage_content())


def remove_homepage_entry(apps, schema_editor):
    Homepage = apps.get_model('homepage', 'Homepage')

    try:
        homepage = Homepage.objects.last()
    except Homepage.DoesNotExist:
        return

    homepage.delete()


class Migration(migrations.Migration):

    dependencies = [
        ('homepage', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(create_homepage_entry, remove_homepage_entry),
    ]
