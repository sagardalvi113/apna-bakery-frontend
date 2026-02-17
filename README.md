
# Highway Bakery Frontend (React + Vite + JavaScript)

Beautiful, world‑class UI optimized for highway bakeries:
- Glassmorphic cards, soft gradients, modern typography
- Product dialog on card click + Add to Cart
- Order search by ID/phone for travelers
- Admin login & orders dashboard with status workflow

## Setup (Windows-friendly)
```powershell
# In PowerShell
Copy-Item .env.sample .env
```
```cmd
:: In CMD
copy .env.sample .env
```
Edit `.env` if needed:
```
VITE_API_BASE_URL=http://localhost:8080
```

Install & run:
```bash
npm install
npm run dev
```
Open http://localhost:5173

## Build for production
```bash
npm run build
npm run preview # serve build locally to test
```
