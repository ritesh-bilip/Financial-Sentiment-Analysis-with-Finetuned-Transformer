# FinSentiment

FinSentiment is a full-stack financial news sentiment analysis application. It classifies a headline as **positive**, **neutral**, or **negative** using a FinBERT transformer model.

The project includes:

- A Django REST API for predictions, history, and statistics
- A locally cached FinBERT model for inference
- A Next.js frontend for interacting with the API
- PostgreSQL persistence for predictions
- Redis and Django Channels configuration for real-time features

## Technology Stack

### Backend

- Python 3.11+
- Django 4.2
- Django REST Framework
- PyTorch and Hugging Face Transformers
- PostgreSQL
- Redis and Django Channels

### Frontend

- Next.js 16 with the Pages Router
- React 19
- Tailwind CSS
- Axios
- Chart.js

## Project Structure

```text
.
├── backend/
│   ├── api/                    # API views, serializers, models, and routes
│   ├── backend/                # Django project configuration
│   ├── ml/                     # FinBERT loading and prediction logic
│   ├── manage.py
│   └── requirements.txt
├── frontend/
│   ├── components/             # Reusable UI components
│   ├── lib/api.js              # Backend API client
│   ├── pages/                  # Next.js pages
│   └── package.json
└── readme
```

## Prerequisites

Install the following before starting the project:

- Python 3.11 or newer
- Node.js 18 or newer
- PostgreSQL
- Redis, if using Channels or WebSocket functionality

The backend expects PostgreSQL to be available. SQLite is not configured in the current Django settings.

## Backend Setup

Open a terminal in the repository root and create a virtual environment:

### Windows PowerShell

```powershell
cd backend
python -m venv ..\venv
..\venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

### macOS or Linux

```bash
cd backend
python3 -m venv ../venv
source ../venv/bin/activate
pip install -r requirements.txt
```

Create `backend/.env` with the credentials for your local services:

```env
DB_NAME=sentiment_db
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=127.0.0.1
DB_PORT=5432
REDIS_HOST=127.0.0.1
```

Run the database migrations and start Django:

```bash
python manage.py migrate
python manage.py runserver
```

The backend will be available at `http://127.0.0.1:8000`.

The first model load can take longer than later requests. The application uses `backend/ml/model_cache/` when the local model files are available; otherwise, Transformers attempts to load `ProsusAI/finbert`.

## Frontend Setup

Open a second terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at `http://localhost:3000`.

By default, the frontend calls `http://127.0.0.1:8000`. To use another backend URL, create `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

## API Reference

All API endpoints are served from `http://127.0.0.1:8000`.

### Predict Sentiment

`POST /api/predict`

Request:

```json
{
  "headline": "Apple stock surges after record earnings"
}
```

Example response:

```json
{
  "headline": "Apple stock surges after record earnings",
  "sentiment": "positive",
  "confidence_scores": {
    "negative": 0.0002,
    "neutral": 0.0017,
    "positive": 0.9981
  },
  "created_at": "2026-09-12T10:24:32.413748Z"
}
```

Test it with cURL:

```bash
curl -X POST http://127.0.0.1:8000/api/predict \
  -H "Content-Type: application/json" \
  -d '{"headline":"Apple stock surges after record earnings"}'
```

### Get Prediction History

`GET /api/history?limit=50`

Returns recent predictions. The default limit is 100.

### Get Sentiment Statistics

`GET /api/stats`

Returns the total number of predictions and the count for each sentiment.

Example response:

```json
{
  "total": 3,
  "distribution": {
    "positive": 1,
    "neutral": 1,
    "negative": 1
  }
}
```

## Development Commands

Run these commands from `frontend/`:

```bash
npm run dev       # Start the development server
npm run lint      # Run ESLint
npm run build     # Create a production build
npm run start     # Start the production server
```

Run backend checks from `backend/`:

```bash
python manage.py check
python manage.py test
```

## Security Notes

- Keep `backend/.env` and `frontend/.env.local` out of Git.
- Do not commit database passwords, API keys, or private certificates.
- Replace the development `SECRET_KEY` and disable `DEBUG` before deploying.
- Configure `ALLOWED_HOSTS` and CORS for the domains used in production.

## License

No license has been specified for this project yet.
