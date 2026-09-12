from django.db import models

class SentimentPrediction(models.Model):
    SENTIMENT_CHOICES = [
        ("positive", "Positive"),
        ("negative", "Negative"),
        ("neutral", "Neutral"),
    ]
    
    headline = models.TextField()
    sentiment = models.CharField(max_length=10, choices=SENTIMENT_CHOICES)
    confidence_scores = models.JSONField()  
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.headline[:50]}... - {self.sentiment}"