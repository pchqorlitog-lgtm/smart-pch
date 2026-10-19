from fastapi import APIRouter

router = APIRouter(prefix="/api/v1")


@router.get("/stores")
def list_stores() -> list[dict]:
    return [
        {
            "id": 1,
            "name": "Yangibozor Bozori",
            "category": "dehqon_bozori",
            "location": "Tashkent",
        },
        {
            "id": 2,
            "name": "Mahalla Market",
            "category": "mahalla_dukoni",
            "location": "Yakkasaroy",
        },
        {
            "id": 3,
            "name": "City Mart",
            "category": "supermarket",
            "location": "Chilonzor",
        },
    ]


@router.get("/orders")
def list_orders() -> list[dict]:
    return [
        {
            "id": "SM-1001",
            "status": "confirmed",
            "total": 250000,
            "customer": "Aziz",
            "courier": "Dilshod",
        },
        {
            "id": "SM-1002",
            "status": "in_transit",
            "total": 180000,
            "customer": "Nodira",
            "courier": "Temur",
        },
    ]


@router.get("/tracking/driver/{driver_id}")
def tracking_driver(driver_id: int) -> dict:
    return {
        "driver_id": driver_id,
        "status": "on_route",
        "latitude": 41.2995,
        "longitude": 69.2401,
        "last_updated": "2026-10-19T10:45:00Z",
    }
