import os

# 1. Set settings module FIRST — before any Django imports that touch models
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "backend.settings")

# 2. Initialize Django ASGI application next
from django.core.asgi import get_asgi_application
django_asgi_app = get_asgi_application()

# 3. NOW it's safe to import channels + routing (these import models internally)
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from api.routing import websocket_urlpatterns

application = ProtocolTypeRouter({
    "http": django_asgi_app,
    "websocket": AuthMiddlewareStack(
        URLRouter(websocket_urlpatterns)
    ),
})