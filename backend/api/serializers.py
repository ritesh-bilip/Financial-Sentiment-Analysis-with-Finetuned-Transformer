from rest_framework import serializers
from .models import SentimentPrediction

class PredictionRequestSerializer(serializers.Serializer):
    headline = serializers.CharField(max_length=1000)

class PredictionResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = SentimentPrediction
        fields = ["headline", "sentiment", "confidence_scores", "created_at"]

class SentimentHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = SentimentPrediction
        fields = ["sentiment", "created_at"]