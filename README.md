# Car Tracker — Vue 2 + NestJS + MongoDB

Два фронтовых URL:
- `/` — публичный поиск по VIN + карта Яндекса.
- `/admin` — админка (JWT), CRUD по авто + создание админов.
- `/admin/login` — логин админа.

## Быстрый старт (локально)

### 1) Бэкенд (NestJS)
```bash
cd server
cp .env.example .env
# отредактируйте .env (MONGO_URI, JWT_SECRET, CORS_ORIGIN)
npm i
npm run start:dev
```

### 2) Клиент (Vue 2)
```bash
cd ../client
cp .env.example .env
# укажите VUE_APP_API_BASE_URL и VUE_APP_YANDEX_API_KEY
npm i
npm run serve
```

### 3) Создать первого админа
```bash
cd ../server
npm run seed
```
Скрипт создаст пользователя `admin` со случайным паролем и выведет его в консоль.

## Эндпоинты
- `POST /api/auth/login` → { token }

- `GET  /api/public/car?vin=VIN` (публично)

- `GET  /api/cars` (JWT)

- `POST /api/cars` (JWT)

- `PUT  /api/cars/:id` (JWT)

- `DELETE /api/cars/:id` (JWT)

- `POST /api/admins` (JWT) — создать админа, ответ: { username, password }


## Валидация выпадающих списков
- **Condition**: `in_transit` | `registration`

- **Location**: `warehouse` | `Khorgos` | `Kazakhstan terminal` | `Kazakhstan-Russian Federation customs post` | `Minsk`


На фронте эти поля — `<select>`, на бэке — строгие enum через class-validator и Mongoose.

## Примечания
- VIN хранится в верхнем регистре и уникален.
- Публичная страница содержит только поле VIN, карточку авто и карту.
- Админка находится на отдельном URL `/admin`; логин — `/admin/login`.
