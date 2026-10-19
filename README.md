# Smart Market Uzbekistan

Telegram Mini App loyihasi uchun MVP arxitekturasi va boshlang'ich skeleti.

## Loyihaning maqsadi

- Bozorlar, supermarketlar va mahalliy do'konlarni bitta platformada birlashtirish
- Xaridorlarga tezkor buyurtma berish va yetkazib berish
- Sotuvchilar uchun avtomatlashtirilgan inventar va buyurtma boshqaruvi
- Kuryerlar uchun jonli GPS, ovozli aloqa va buyurtma olish
- Admin uchun komissiya, tarif va faoliyat konfiguratsiyasi

## Tarkib

- `backend/` - FastAPI backend API uchun skeleton
- `frontend/` - React + Vite + Tailwind Telegram Mini App frontend
- `docker-compose.yml` - PostgreSQL va Redis uchun lokal muhit

## Texnik stack

- Frontend: React.js + Vite + Tailwind CSS + Telegram WebApp SDK
- Backend: Python + FastAPI
- Real-time: WebSockets + Redis
- Maps: Yandex Maps API
- Database: PostgreSQL + Redis

## Loyiha modullari

1. Xaridor (customer)
   - Mahsulot qidirish
   - Savatcha
   - To'lov turini tanlash
   - Buyurtma berish
   - Kuryer kuzatuvi

2. Sotuvchi
   - Tovarlar ro'yxati
   - Narx boshqaruvi
   - Buyurtmalarni tasdiqlash
   - Inventar monitoring

3. Kuryer
   - Buyurtma qabul qilish
   - GPS kuzatuv
   - QR to'lov
   - Push-to-talk kommunikatsiya

4. Admin
   - Tariflar va komissiya
   - On/off funksiyalar
   - Monitoring va analitika

## Lokal ishga tushirish

### 1) Backend

```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### 2) Frontend

```bash
cd frontend
npm install
npm run dev -- --host 0.0.0.0
```

### 3) Database & Redis

```bash
docker compose up -d
```

## API demo

- `GET /health` - backend holatini tekshirish
- `GET /api/v1/stores` - do'konlar ro'yxati
- `GET /api/v1/orders` - buyurtmalar ro'yxati
- `GET /api/v1/tracking/driver/1` - kuryer GPS statusi

## Keyingi bosqichlar

- PostgreSQL modelarini to'liq yozish
- WebSocket endpointlar qo'shish
- Telegram auth va WebApp integration
- Payment va QR flow
- Admin panel va analytics dashboards
- Delivery cost calculator logikasi
