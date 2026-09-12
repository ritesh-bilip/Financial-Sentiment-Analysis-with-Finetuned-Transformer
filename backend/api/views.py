from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import SentimentPrediction
from .serializers import PredictionRequestSerializer, PredictionResponseSerializer, SentimentHistorySerializer
from ml.models import get_prediction
import logging

logger = logging.getLogger(__name__)

class PredictView(APIView):
    def post(self, request):
        serializer = PredictionRequestSerializer(data=request.data)
        if not serializer.is_valid():
            return Response({"error": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        
        headline = serializer.validated_data["headline"]
        try:
            result = get_prediction(headline)
            prediction = SentimentPrediction.objects.create(
                headline=headline,
                sentiment=result["sentiment"],
                confidence_scores=result["confidence_scores"]
            )
            response_serializer = PredictionResponseSerializer(prediction)
            return Response(response_serializer.data, status=status.HTTP_200_OK)
        except Exception as e:
            logger.error(f"Prediction error: {e}")
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class SentimentHistoryView(APIView):
    def get(self, request):
        limit = request.GET.get("limit", 100)
        predictions = SentimentPrediction.objects.all().order_by("-created_at")[:int(limit)]
        serializer = SentimentHistorySerializer(predictions, many=True)
        return Response(serializer.data)

class SentimentStatsView(APIView):
    def get(self, request):
        from django.db.models import Count
        total = SentimentPrediction.objects.count()
        stats = SentimentPrediction.objects.values("sentiment").annotate(count=Count("sentiment"))
        distribution = {item["sentiment"]: item["count"] for item in stats}
        return Response({"total": total, "distribution": distribution})