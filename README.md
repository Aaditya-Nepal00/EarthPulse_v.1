# 🌍 EarthPulse

⚠️ Warning: Don’t believe anything here.
I’m just yapping random nonsense.
This README does not make the project look or work the way it actually is — it basically sounds like I pulled a random project out of thin air with zero context. Proceed carefully.

[![Made with React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.110.0-009688?style=for-the-badge&logo=fastapi)](https://fastapi.tiangolo.com/)
[![Powered by NASA](https://img.shields.io/badge/Powered%20by-NASA%20🚀-0B3D91?style=for-the-badge)](https://api.nasa.gov/)
[![Hobby Project](https://img.shields.io/badge/Status-Built%20for%20Fun-FF69B4?style=for-the-badge)](https://github.com)

## 🎯 What's This All About?

EarthPulse is my hobby project where I decided to combine my love for space, data visualization, and the Himalayas into one cosmic web app. It's basically Google Earth's cooler cousin who listens to lo-fi beats and actually knows how to interpret satellite data.

**TL;DR**: A NASA satellite data visualization platform that lets you watch the Nepal Himalayas change over time. It's like watching glaciers retreat, but with more pixels and way cooler animations. 🏔️✨

![EarthPulse Demo](./picture/img.png)

## 🤔 Why Did I Build This?

Good question! I built this because:
- ✅ I wanted to learn how to work with real NASA APIs (and actually succeeded!)
- ✅ Watching numbers go brrr on interactive charts is oddly satisfying
- ✅ I needed an excuse to learn FastAPI and React Query
- ✅ Climate data visualization shouldn't look like it's from the 90s
- ✅ I ran out of Netflix shows to watch

Somewhere along the way, this went from "quick weekend project" to a full-blown application with 8 environmental indicators, a cosmic UI theme, and more NASA API integrations than I initially planned. Whoops. 🙃

## ✨ Features That Actually Work

### 🛰️ Real NASA Satellite Data
- **MODIS**: Because measuring vegetation from space is cool
- **VIIRS**: Tracking city lights (urban expansion goes brrrr)
- **Landsat**: Old reliable for glacier monitoring
- **GIBS**: Real-time satellite imagery (the fancy stuff)

### 📊 Environmental Indicators
1. **NDVI** - How green is green? (spoiler: it's complicated)
2. **Glacier Coverage** - Ice ice baby... getting smaller 🧊
3. **Urban Expansion** - Cities: the real-life SimCity
4. **Temperature** - It's getting hot in here 🌡️
5. **GLOF Risk** - Glacial lake monitoring (yes, it's a thing)
6. **Forest Cover** - Tree hugger metrics
7. **Landslide Risk** - Mountain stability check
8. **Earthquake Recovery** - Post-2015 Nepal earthquake analysis

### 🎨 UI That Doesn't Hurt Your Eyes
- Cosmic/space theme (because why not?)
- Animated stars in the background (purely decorative, adds 0 value, looks cool)
- Dark mode (there's no light mode because I said so)
- Actually responsive (yes, it works on mobile!)
- Smooth animations that'll make you say "ooh"

### 🗺️ Interactive Map Features
- Built with Leaflet (still the GOAT of mapping libraries)
- Time slider from 2000-2025 (time travel, sort of)
- Click on data points to see details
- Compare data between years
- Export everything (because data belongs to the people!)

![More Screenshots](./picture/img2.png)
![Even More](./picture/img3.png)

## 🛠️ Tech Stack (The Nerdy Stuff)

### Frontend (The Pretty Part)
```
React 18.2      - Because hooks are life
TypeScript      - Fewer bugs, more autocomplete
Vite            - Blazingly fast™ development
TailwindCSS     - Utility classes go brrr
Leaflet         - Maps, but make it interactive
Framer Motion   - Animations smoother than butter
Zustand         - State management (Redux who?)
TanStack Query  - API calls with superpowers
```

### Backend (The Brain)
```
FastAPI         - Python, but make it async
Uvicorn         - ASGI server that zooms
Pydantic        - Type validation (TypeScript's Python cousin)
rasterio        - Geospatial data witchcraft
geopandas       - Pandas, but with coordinates
httpx           - async HTTP client (requests 2.0)
NumPy/Pandas    - Number crunching essentials
```

### NASA APIs (The Data Source)
```
NASA CMR        - Common Metadata Repository
NASA GIBS       - Global Imagery Browse Services
MODIS           - Moderate Resolution Imaging Spectroradiometer
VIIRS           - Visible Infrared Imaging Radiometer Suite
Landsat         - The OG Earth observation satellite
```

## 🚀 Running This Beast Locally

### Prerequisites
You'll need:
- Node.js (v16+) - for the frontend magic
- Python (3.8+) - for the backend wizardry
- NASA API keys (optional, works without them too!)
- A decent internet connection
- Willingness to troubleshoot (it's a hobby project, after all)

### The "I Just Want It To Work" Guide

**Step 1: Clone this bad boy**
```bash
git clone https://github.com/Aaditya-Nepal00/EarthPulse_v.1
cd EarthPulse
```

**Step 2: Frontend Setup**
```bash
# Install dependencies (this might take a minute... or five)
npm install

# Start the dev server
npm run dev
```
Your browser should open to `http://localhost:3000` automatically. If it doesn't, your browser is being shy.

**Step 3: Backend Setup**
```bash
# Navigate to backend
cd backend

# Create a virtual environment (optional but recommended)
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run the server
python -m uvicorn app.main:app --host localhost --port 8000 --reload
```

The backend will be chilling at `http://localhost:8000`. Visit `/api/docs` for the Swagger UI because we're fancy like that.

### NASA API Keys (Optional But Cool)

Want real NASA data instead of the simulated stuff?

1. Get your API keys from:
   - NASA API: https://api.nasa.gov/
   - NASA Earthdata: https://urs.earthdata.nasa.gov/

2. Create a `.env` file in the `backend/` folder:
```env
NASA_API_KEY=your_super_secret_key_here
NASA_IMAGERY_API_KEY=your_other_super_secret_key_here
```

3. Restart the backend

4. Watch real satellite data flow in! 🛰️

**Pro tip**: The app works perfectly fine without API keys. It'll use simulated data that's surprisingly realistic. I spent way too much time making the simulation look convincing.

## 📸 More Eye Candy

![Dashboard](./picture/img4.png)
*The environmental dashboard - where numbers become art*

![Comparison Tool](./picture/img5.png)
*Time travel between years (disclaimer: not actual time travel)*

![Storytelling](./picture/img6.png)
*Environmental stories, because data should tell a story*

![Dark Theme Glory](./picture/img7.png)
*The cosmic theme in all its glory*

## 🎮 How to Use

1. **Pick a Year**: Use the time slider at the bottom (2000-2025)
2. **Choose an Indicator**: Click on NDVI, Glacier, Urban, etc.
3. **Explore the Map**: Zoom, pan, click on data points
4. **Compare**: Hit the comparison tool to see changes over time
5. **Read Stories**: Click "Stories" for narrative data visualization
6. **Export**: Download data in PDF, Excel, or GeoJSON format
7. **Profit**: Share with friends and pretend you're a climate scientist

## 🐛 Known Issues (Features, Really)

- Sometimes the map gets a bit temperamental on first load (just refresh, it's shy)
- The cosmic background might cause existential thoughts about our place in the universe
- Time slider animations might be *too* smooth (not sorry)
- You might learn actual facts about the Himalayas (side effect)

## 🤝 Contributing

This is a hobby project, but if you want to contribute:
1. Fork it
2. Break it
3. Fix it
4. Make a PR
5. I'll probably merge it because I trust you

Or just star the repo. Stars make me happy. ⭐

## 📝 License

MIT License - Do whatever you want with it. Build a startup, impress your friends, use it for your thesis. Just don't blame me if the glaciers don't match your expectations.

## 🙏 Acknowledgments

- **NASA** - For making satellite data publicly available (you're the real MVP)
- **The Internet** - For Stack Overflow answers at 3 AM
- **Me** - For actually finishing this project instead of abandoning it like the other 47 projects
- **You** - For reading this README (seriously, you made it this far?)

📞 Contact

Found a bug? Have a suggestion? Want to tell me how you used this for your research?

Issues: Open one on GitHub

Questions: Also GitHub issues (I check them, I promise)

Compliments: Always welcome in GitHub discussions… just kidding, probably won’t even read them

Updates: Yeah… don’t even think about it, I’m probably never opening this again

---

<div align="center">

**Made with 💙 (and a questionable amount of late nights)**

![Footer](./picture/img8.png)

[⭐ Star this repo](https://github.com) • [🐛 Report Bug](https://github.com) • [✨ Request Feature](https://github.com)

</div>
