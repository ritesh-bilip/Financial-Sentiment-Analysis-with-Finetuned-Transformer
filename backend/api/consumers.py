import json
import asyncio
from channels.generic.websocket import AsyncWebsocketConsumer
from .models import SentimentPrediction
from ml.models import get_prediction

class SentimentConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        await self.accept()
    
    async def disconnect(self, close_code):
        pass
    
    async def receive(self, text_data):
        try:
            data = json.loads(text_data)
            headline = data.get("headline", "")
            if not headline:
                await self.send(json.dumps({"error": "missing headline"}))
                return
            
            result = await asyncio.to_thread(get_prediction, headline)
            prediction = await asyncio.to_thread(
                SentimentPrediction.objects.create,
                headline=headline,
                sentiment=result["sentiment"],
                confidence_scores=result["confidence_scores"]
            )
            
            await self.send(json.dumps({
                "headline": headline,
                "sentiment": result["sentiment"],
                "confidence_scores": result["confidence_scores"],
                "created_at": str(prediction.created_at)
            }))
        except Exception as e:
            await self.send(json.dumps({"error": str(e)}))