# Django Example
# Perfecto para procesar datos JSON y crear sistemas administrativos.

from django.http import JsonResponse
from .models import Station

def station_list(request):
    stations = Station.objects.all().values()
    return JsonResponse(list(stations), safe=False)
