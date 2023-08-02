from django.shortcuts import render
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
import json

# Create your views here.
@csrf_exempt
def hello_world(request):
    body_unicode = request.body.decode('utf-8')
    body = json.loads(body_unicode)
    id = str(body['id'])
    # print(id)
    if (body['id']):
        data = {
            'myId': id
        }
        #request.POST.get("id") #'Hello World (from the backend)!'
        return JsonResponse(data)
    else:
        data = {
            'myId': '-1'
        }
        #'Hello World (from the backend)!'
        return JsonResponse(data)