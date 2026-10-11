import os
import logging
from pathlib import Path

import psycopg
from dotenv import load_dotenv
from psycopg.conninfo import conninfo_to_dict
from psycopg.rows import dict_row

BACKEND_DIR = Path(__file__).resolve().parents[1]
ENV_FILE = BACKEND_DIR / ".env"
load_dotenv(dotenv_path=ENV_FILE, override=True)

logger = logging.getLogger(__name__)


class DatabaseConfigurationError(RuntimeError):
    pass


class DatabaseConnectionError(RuntimeError):
    def __init__(self, category: str) -> None:
        self.category = category
        super().__init__(category)

    @property
    def public_detail(self) -> str:
        details = {
            "authentication": (
                "Database authentication failed. Verify the Supabase pooler username "
                "and database password in extract/backend/.env."
            ),
            "pooler_identity": (
                "Supabase rejected the pooler identity. Verify the project reference "
                "in the pooler username in extract/backend/.env."
            ),
            "invalid_connection_string": (
                "The database connection string is invalid. Verify DATABASE_URL and "
                "URL-encode special characters in the password."
            ),
            "dns": (
                "The database hostname could not be resolved. Verify DATABASE_URL "
                "and the network connection."
            ),
            "timeout": (
                "The database connection timed out. Check network access and the "
                "Supabase pooler endpoint."
            ),
            "network": (
                "The database network connection failed. Check network access and "
                "the Supabase endpoint."
            ),
            "tls": (
                "A secure database connection could not be established. Verify the "
                "Supabase SSL connection settings."
            ),
            "unavailable": (
                "The database is unavailable. Check the Supabase connection settings."
            ),
        }
        return details.get(self.category, details["unavailable"])


def _classify_connection_error(error: psycopg.Error) -> str:
    message = str(error).lower()
    sqlstate = error.sqlstate

    if (
        sqlstate == "28P01"
        or "password authentication failed" in message
        or "authentication failed" in message
        or "invalid password" in message
    ):
        return "authentication"
    if "tenant or user not found" in message or "user not found" in message:
        return "pooler_identity"
    if (
        isinstance(error, psycopg.ProgrammingError)
        or "invalid connection option" in message
        or "invalid connection string" in message
        or "invalid dsn" in message
    ):
        return "invalid_connection_string"
    if "could not translate host" in message or "getaddrinfo" in message:
        return "dns"
    if "timeout" in message or "timed out" in message:
        return "timeout"
    if "ssl" in message or "certificate" in message:
        return "tls"
    if (
        "connection refused" in message
        or "network is unreachable" in message
        or "no route to host" in message
    ):
        return "network"
    return "unavailable"


def get_database_connection() -> psycopg.Connection:
    # Reload on each call so a stale shell/process value cannot override this backend's config.
    load_dotenv(dotenv_path=ENV_FILE, override=True)
    database_url = os.getenv("DATABASE_URL", "").strip()
    lowered_url = database_url.lower()
    if not database_url or any(
        marker in lowered_url
        for marker in (
            "[your-password]",
            "<your-password>",
            "your_password",
            "replace_me",
            "placeholder",
            "changeme",
        )
    ):
        raise DatabaseConfigurationError

    try:
        connection_options = conninfo_to_dict(database_url)
    except (psycopg.Error, TypeError, ValueError) as error:
        logger.warning(
            "PostgreSQL connection configuration is invalid: exception=%s",
            type(error).__name__,
        )
        raise DatabaseConnectionError("invalid_connection_string") from None

    if not all(connection_options.get(key) for key in ("host", "user", "password", "dbname")):
        raise DatabaseConfigurationError

    connection_options.setdefault("sslmode", "require")
    try:
        return psycopg.connect(
            **connection_options,
            connect_timeout=10,
            row_factory=dict_row,
            application_name="catalyst-sih-api",
        )
    except psycopg.Error as error:
        category = _classify_connection_error(error)
        logger.warning(
            "PostgreSQL connection failed: category=%s exception=%s sqlstate=%s",
            category,
            type(error).__name__,
            error.sqlstate or "none",
        )
        raise DatabaseConnectionError(category) from None


def test_database_connection() -> None:
    with get_database_connection() as connection:
        connection.execute("SELECT 1")


if __name__ == "__main__":
    try:
        test_database_connection()
    except DatabaseConfigurationError:
        print("Database connection test failed: DATABASE_URL is missing or incomplete in backend/.env.")
        raise SystemExit(1)
    except DatabaseConnectionError as error:
        print(f"Database connection test failed: category={error.category}. {error.public_detail}")
        raise SystemExit(1)
    except psycopg.Error as error:
        logger.warning(
            "Database connection test query failed: exception=%s sqlstate=%s",
            type(error).__name__,
            error.sqlstate or "none",
        )
        print("Database connection test failed: the connection opened, but its test query failed.")
        raise SystemExit(1)
    print("Database connection test succeeded.")
