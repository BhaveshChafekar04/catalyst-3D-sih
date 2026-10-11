import logging
from typing import List
from uuid import uuid4

import psycopg
from fastapi import APIRouter, HTTPException

from .database import (
    DatabaseConfigurationError,
    DatabaseConnectionError,
    get_database_connection,
)
from .schemas import ChallengeCreate, ChallengeResponse

router = APIRouter()
logger = logging.getLogger(__name__)

CHALLENGE_COLUMNS = "id, title, description, category, location, status, created_at"

@router.post("/challenges", response_model=ChallengeResponse, status_code=201)
def create_challenge(challenge: ChallengeCreate):
    """
    Save a community challenge to PostgreSQL and return the saved record.
    """
    challenge_id = f"CAT-REF-{uuid4().hex.upper()}"
    try:
        with get_database_connection() as connection:
            saved_challenge = connection.execute(
                f"""
                INSERT INTO public.challenges
                    (id, title, description, category, location, status)
                VALUES (%s, %s, %s, %s, %s, %s)
                RETURNING {CHALLENGE_COLUMNS}
                """,
                (
                    challenge_id,
                    challenge.title,
                    challenge.description,
                    challenge.category,
                    challenge.location,
                    "Submitted",
                ),
            ).fetchone()
    except DatabaseConfigurationError:
        raise HTTPException(
            status_code=503,
            detail="Database is not configured. Set DATABASE_URL in extract/backend/.env.",
        ) from None
    except DatabaseConnectionError as error:
        raise HTTPException(
            status_code=503,
            detail=error.public_detail,
        ) from None
    except psycopg.Error as error:
        logger.error(
            "Challenge insert failed: exception=%s sqlstate=%s",
            type(error).__name__,
            error.sqlstate or "none",
        )
        raise HTTPException(
            status_code=503,
            detail="The challenge could not be saved. Check the database connection and table configuration.",
        ) from None

    if saved_challenge is None:
        raise HTTPException(status_code=500, detail="The database did not return the saved challenge.")
    return saved_challenge

@router.get("/challenges", response_model=List[ChallengeResponse])
def get_challenges():
    """
    Retrieve saved community challenges from PostgreSQL.
    """
    try:
        with get_database_connection() as connection:
            return connection.execute(
                f"""
                SELECT {CHALLENGE_COLUMNS}
                FROM public.challenges
                ORDER BY created_at DESC NULLS LAST, id DESC
                """
            ).fetchall()
    except DatabaseConfigurationError:
        raise HTTPException(
            status_code=503,
            detail="Database is not configured. Set DATABASE_URL in extract/backend/.env.",
        ) from None
    except DatabaseConnectionError as error:
        raise HTTPException(
            status_code=503,
            detail=error.public_detail,
        ) from None
    except psycopg.Error as error:
        logger.error(
            "Challenge list query failed: exception=%s sqlstate=%s",
            type(error).__name__,
            error.sqlstate or "none",
        )
        raise HTTPException(
            status_code=503,
            detail="Challenges could not be retrieved. Check the database connection and table configuration.",
        ) from None

@router.get("/challenges/{challenge_id}", response_model=ChallengeResponse)
def get_challenge(challenge_id: str):
    """
    Retrieve a saved community challenge by ID.
    """
    try:
        with get_database_connection() as connection:
            challenge = connection.execute(
                f"""
                SELECT {CHALLENGE_COLUMNS}
                FROM public.challenges
                WHERE id = %s
                """,
                (challenge_id,),
            ).fetchone()
    except DatabaseConfigurationError:
        raise HTTPException(
            status_code=503,
            detail="Database is not configured. Set DATABASE_URL in extract/backend/.env.",
        ) from None
    except DatabaseConnectionError as error:
        raise HTTPException(
            status_code=503,
            detail=error.public_detail,
        ) from None
    except psycopg.Error as error:
        logger.error(
            "Challenge lookup failed: exception=%s sqlstate=%s",
            type(error).__name__,
            error.sqlstate or "none",
        )
        raise HTTPException(
            status_code=503,
            detail="The challenge could not be retrieved. Check the database connection and table configuration.",
        ) from None

    if challenge is None:
        raise HTTPException(status_code=404, detail="Challenge not found")
    return challenge
