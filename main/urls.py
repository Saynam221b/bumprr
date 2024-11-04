from django.urls import path
from .views import *

urlpatterns = [
    path('', index, name='index'),  # Home page
    path('contact/', contact, name='contact'),  # Ensure trailing slash
    path('reservation/', reservation, name='reservation'),  # Ensure trailing slash
    path('reserve/', make_reservation, name='make_reservation'),

]
