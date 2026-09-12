from django.urls import path
from . import views

urlpatterns = [
    path("predict", views.PredictView.as_view(), name="predict"),
    path("history", views.SentimentHistoryView.as_view(), name="history"),
    path("stats", views.SentimentStatsView.as_view(), name="stats"),
]