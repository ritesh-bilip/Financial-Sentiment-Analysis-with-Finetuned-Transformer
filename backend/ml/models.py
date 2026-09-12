import os
import torch
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import logging

logger = logging.getLogger(__name__)

class FinBERTModel:
    _instance = None
    _model = None
    _tokenizer = None
    
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(FinBERTModel, cls).__new__(cls)
            cls._instance._load_model()
        return cls._instance
    
    def _load_model(self):
        model_path = os.path.join(os.path.dirname(__file__), "model_cache")
        if not os.path.exists(model_path):
            logger.warning("Model cache not found, falling back to base model")
            model_path = "ProsusAI/finbert"
        try:
            self._tokenizer = AutoTokenizer.from_pretrained(model_path)
            self._model = AutoModelForSequenceClassification.from_pretrained(model_path)
            self._model.eval()
            logger.info("FinBERT model loaded successfully")
        except Exception as e:
            logger.error(f"Model loading failed: {e}")
            raise
    
    def predict(self, headline: str) -> dict:
        inputs = self._tokenizer(
            headline,
            return_tensors="pt",
            truncation=True,
            max_length=128,
            padding=True
        )
        with torch.no_grad():
            outputs = self._model(**inputs)
            logits = outputs.logits
            probs = torch.softmax(logits, dim=1).squeeze().tolist()
            pred_class = torch.argmax(logits, dim=1).item()
        
        # Our mapping: 0=negative, 1=neutral, 2=positive
        labels = ["negative", "neutral", "positive"]
        sentiment = labels[pred_class]
        return {
            "sentiment": sentiment,
            "confidence_scores": {
                "negative": probs[0],
                "neutral": probs[1],
                "positive": probs[2]
            }
        }

model_instance = FinBERTModel()

def get_prediction(headline: str) -> dict:
    return model_instance.predict(headline)