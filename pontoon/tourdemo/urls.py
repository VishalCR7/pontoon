from django.conf.urls import url

import views

from django.views.generic import RedirectView


urlpatterns = [
    # dummy translation page
    url(r'^tourdemo/home/$',
        views.home,
        name='pontoon.tourdemo.home'),
    url(r'^tourdemo/(?P<locale>[A-Za-z0-9\-\@\.]+)/(?P<slug>[\w-]+)/(?P<part>.+)/$',
        views.translate_demo,
        name='pontoon.tourdemo.translate'),
]

