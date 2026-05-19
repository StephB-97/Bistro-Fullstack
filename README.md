# Whiskey's Bistro — Full-Stack (React + Express + MongoDB)

A full-stack restaurant web application extending the original React frontend with a Node.js/Express backend and MongoDB database. Features real-time menu management from the database, persistent order processing, and a RESTful API.

## Tech Stack

| Layer     | Technology                         |
|-----------|------------------------------------|
| Frontend  | React 18, Vite, Tailwind CSS 3     |
| Backend   | Node.js, Express 4                 |
| Database  | MongoDB Atlas (Mongoose ODM)       |
| Dev Tools | Concurrently, Nodemon, PostCSS     |

## Project Structure

```
whiskeys-bistro-fullstack/
├── index.html              # Vite entry
├── package.json            # Unified dependencies & scripts
├── vite.config.js          # Vite config with /api proxy
├── tailwind.config.js
├── postcss.config.js
├── .env.example            # Environment variable template
├── .gitignore
├── public/
│   └── Img/                # ⬅ Copy your images here
├── server/
│   ├── index.js            # Express entry point
│   ├── seed.js             # Database seeder (13 menu items)
│   ├── config/
│   │   └── db.js           # Mongoose connection helper
│   ├── models/
│   │   ├── MenuItem.js     # Menu item schema
│   │   └── Order.js        # Order schema
│   └── routes/
│       ├── menuRoutes.js   # GET/POST/PUT/DELETE /api/menu
│       └── orderRoutes.js  # GET/POST/PUT/DELETE /api/orders
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── api/
    │   └── index.js        # Frontend API helpers
    ├── context/
    │   └── CartContext.jsx  # Cart state + checkout logic
    ├── data/
    │   ├── menuItems.js    # Category list (items now from DB)
    │   └── gallerySlides.js
    ├── hooks/
    │   └── useActiveSection.js
    └── components/
        ├── Navbar.jsx
        ├── Hero.jsx
        ├── Menu.jsx         # Fetches items from API
        ├── Gallery.jsx
        ├── About.jsx
        ├── Contact.jsx
        ├── Cart.jsx         # Real checkout → POST /api/orders
        ├── Footer.jsx
        └── BackToTop.jsx
```

## Setup Instructions



### 2. Create `.env` File

```bash
cp .env.example .env
```

Edit `.env` and replace the placeholder with your MongoDB Atlas connection string:

```
MONGODB_URI=mongodb+srv://yourUser:yourPass@cluster0.xxxxx.mongodb.net/whiskeys-bistro?retryWrites=true&w=majority
PORT=5000
CLIENT_URL=http://localhost:5173
```

### 3. Install Dependencies

```bash
npm install
```

### 4. Seed the Database

```bash
npm run seed
```

This inserts all 13 menu items into your MongoDB `menuitems` collection.

### 5. Run in Development Mode

```bash
npm run dev:full
```

This starts both servers concurrently:
- **Vite dev server** → `http://localhost:5173` (frontend with HMR)
- **Express API server** → `http://localhost:5000` (backend with Nodemon)

Vite proxies all `/api/*` requests to Express automatically.

## API Endpoints

### Menu Items

| Method | Endpoint         | Description            |
|--------|------------------|------------------------|
| GET    | `/api/menu`      | List all menu items    |
| GET    | `/api/menu/:id`  | Get one menu item      |
| POST   | `/api/menu`      | Create a menu item     |
| PUT    | `/api/menu/:id`  | Update a menu item     |
| DELETE | `/api/menu/:id`  | Delete a menu item     |

### Orders

| Method | Endpoint           | Description          |
|--------|--------------------|----------------------|
| GET    | `/api/orders`      | List all orders      |
| GET    | `/api/orders/:id`  | Get one order        |
| POST   | `/api/orders`      | Place a new order    |
| PUT    | `/api/orders/:id`  | Update order status  |
| DELETE | `/api/orders/:id`  | Delete an order      |

## What Changed from HW3

1. **Menu data comes from MongoDB** instead of a hardcoded JS file. The `Menu` component fetches items on mount via `GET /api/menu`.
2. **Cart checkout is real** — clicking "Place Order" sends a `POST /api/orders` request, persisting the order in the database. Success/error feedback is shown in the cart UI.
3. **Full CRUD API** — menu items and orders can be created, read, updated, and deleted through RESTful endpoints.
4. **Monorepo structure** — single `package.json` manages both frontend and backend. One `npm install`, one repo.

## Production Build & Deployment

### Build

```bash
npm run build    # Vite builds to dist/
npm start        # Express serves dist/ + API on PORT
```



