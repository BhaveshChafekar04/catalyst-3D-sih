
import psycopg
import os
from dotenv import load_dotenv

load_dotenv()
try:
    with psycopg.connect(os.environ['DATABASE_URL']) as conn:
        print('Connection successful!')
        with conn.cursor() as cur:
            cur.execute('''
            CREATE TABLE IF NOT EXISTS public.challenges (
                id VARCHAR PRIMARY KEY,
                title VARCHAR NOT NULL,
                description TEXT NOT NULL,
                category VARCHAR NOT NULL,
                location VARCHAR NOT NULL,
                status VARCHAR DEFAULT 'Submitted',
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
            ''')
            conn.commit()
            print('Table ensured.')
except Exception as e:
    print('Connection error:', e)

