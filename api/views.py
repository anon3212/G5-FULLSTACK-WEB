from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view

@api_view(['GET'])
def getData(request):
    person = {'name': 'Project Admin', 'status': 'Connected'}
    return Response(person)
# Create your views here.
