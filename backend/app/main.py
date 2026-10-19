import hashlib
import hmac
import os
from urllib.parse import parse_qsl

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware

from app.routes import router

load_dotenv()
BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN", "")


def _validate_init_data(init_data: str) -> dict:
    if not BOT_TOKEN:
        raise HTTPException(status_code=500, detail="TELEGRAM_BOT_TOKEN is not configured")

    parsed = dict(parse_qsl(init_data, keep_blank_values=True))
    if "hash" not in parsed:
        raise HTTPException(status_code=400, detail="Missing Telegram hash")

    received_hash = parsed.pop("hash")
    data_check_string = "\n".join(
        f"{key}={parsed[key]}" for key in sorted(parsed)
    )
    secret_key = hashlib.sha256(BOT_TOKEN.encode()).digest()
    computed_hash = hmac.new(secret_key, data_check_string.encode(), hashlib.sha256).hexdigest()

    if not hmac.compare_digest(computed_hash, received_hash):
        raise HTTPException(status_code=401, detail="Invalid Telegram init data")

    return parsed


app = FastAPI(
    title="Smart Market Uzbekistan API",
    version="0.1.0",
    description="Telegram Mini App backend for local market and delivery ecosystem.",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)


@app.get("/health")
def health_check() -> dict:
    return {"status": "ok", "service": "smartmarket-api"}


@app.get("/telegram/bot/status")
def telegram_bot_status() -> dict:
    return {
        "status": "configured" if BOT_TOKEN else "missing_token",
        "bot_token_present": bool(BOT_TOKEN),
        "bot_username": "smartrinokbot",
    }


@app.post("/telegram/validate")
async def validate_telegram_init_data(request: Request) -> dict:
    payload = await request.json()
    init_data = payload.get("initData", "")
    if not init_data:
        raise HTTPException(status_code=400, detail="initData is required")

    validated = _validate_init_data(init_data)
    return {"valid": True, "user": validated}
