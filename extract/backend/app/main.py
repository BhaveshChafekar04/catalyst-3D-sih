from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes import router as api_router

app = FastAPI(
    title="Catalyst SIH API",
    description="Backend API for the Catalyst SIH Project.",
    version="1.0.0"
)

# Configure CORS
# We explicitly allow port 3000 and 5173, which are common Vite frontend ports.
# The user's package.json uses port 3000 explicitly.
origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    """
    Root endpoint to verify backend is running.
    """
    return {"message": "Catalyst backend is running safely!"}

@app.get("/health")
def health_check():
    """
    Check that the API process and database are running safely.
    """
    db_status = "unavailable"
    try:
        from .database import get_database_connection
        with get_database_connection() as connection:
            connection.execute("SELECT 1")
            db_status = "ok"
    except Exception:
        # Avoid exposing credentials in the stack trace
        db_status = "error"
        
    return {
        "status": "ok" if db_status == "ok" else "degraded",
        "service": "catalyst-api",
        "version": "1.0.0",
        "database": db_status
    }

# Include the API router
app.include_router(api_router, prefix="/api")
