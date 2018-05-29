# -*- coding: utf-8 -*-
from __future__ import division

from django.shortcuts import render
from django.http import HttpResponse

from django.shortcuts import get_object_or_404, render, redirect

from pontoon.base import forms
from pontoon.base import utils
from pontoon.base.models import (
    Entity,
    Locale,
    Project,
    ProjectLocale,
    Resource,
    TranslationMemoryEntry,
    TranslatedResource,
    Translation,
    UserProfile,
)

from pontoon.tags.utils.tags import TagsTool

# Create your views here.

def home(request):
    """Home view."""

    return HttpResponse("Hello, world. You're at the tour's index.")


def translate_demo(request, locale, slug, part):
    """Translate view."""
    locale = get_object_or_404(Locale, code=locale)

    projects = (
        Project.objects.available()
        .prefetch_related('subpage_set')
        .order_by('name')
    )

    if slug.lower() == 'all-projects':
        project = Project(name='All Projects', slug=slug.lower())

    else:
        project = get_object_or_404(Project.objects.available(), slug=slug)
        if locale not in project.locales.all():
            raise Http404
    return render(request, 'tourdemo/demo.html', {
        'download_form': forms.DownloadFileForm(),
        'upload_form': forms.UploadFileForm(),
        'locale': locale,
        'locale_projects': locale.available_projects_list(),
        'locales': Locale.objects.available(),
        'part': part,
        'project': project,
        'projects': projects,
        'tags': (
            TagsTool(projects=[project], priority=True)
            if project.tags_enabled
            else None)
    })