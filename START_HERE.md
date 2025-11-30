# 🚀 How to Run EarthPulse on Localhost

## Quick Start

### Option 1: Run Both Servers (Recommended)

**Terminal 1 - Backend:**
```bash
cd backend
python -m uvicorn app.main:app --host localhost --port 8000 --reload
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

The frontend will automatically open at: **http://localhost:3000**

---

### Option 2: Run Frontend Only (if backend is already running)

Just run:
```bash
npm run dev
```

---

## ✅ Verify Everything is Working

1. **Backend should be running on:** http://localhost:8000
   - Test: http://localhost:8000/health
   - API Docs: http://localhost:8000/api/docs

2. **Frontend should be running on:** http://localhost:3000
   - Opens automatically when you run `npm run dev`

3. **Check the browser console** - you should see API calls being made

---

## 🔧 Troubleshooting

### Frontend can't connect to backend?
- Make sure backend is running on port 8000
- Check that `backend/.env` file exists with NASA API keys
- Verify proxy settings in `vite.config.ts`

### Port 3000 already in use?
- Change port in `vite.config.ts`: `port: 3001`
- Or kill the process: `netstat -ano | findstr :3000`

### Port 8000 already in use?
- Change port in `backend/.env`: `PORT=8001`
- Update `vite.config.ts` proxy target accordingly

---

## 📝 Current Configuration

- **Frontend Port:** 3000
- **Backend Port:** 8000
- **NASA API:** ✅ Configured
- **GIBS Imagery:** ✅ Configured

---

## 🎯 What You'll See

When you run `npm run dev`, you should see:
- Vite dev server starting
- Browser opening to http://localhost:3000
- EarthPulse application loading
- Interactive map with Nepal Himalayas
- Environmental dashboard with real NASA data

