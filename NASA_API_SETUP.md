# NASA API Setup Guide

This guide explains how to configure the two NASA API keys for real-time data and satellite imagery.

## Required API Keys

EarthPulse requires **two separate NASA API keys**:

1. **NASA Environmental Data API Key** - For environmental/climate data (NDVI, temperature, glacier, urban data)
2. **NASA Satellite Imagery API Key** - For real-time satellite imagery (GIBS)

## Setup Instructions

### Step 1: Get Your NASA API Keys

1. **For Environmental Data:**
   - Visit: https://api.nasa.gov/
   - Sign up for a free API key
   - Or use NASA Earthdata: https://urs.earthdata.nasa.gov/

2. **For Satellite Imagery:**
   - NASA GIBS (Global Imagery Browse Services) is typically publicly accessible
   - Some layers may require authentication
   - Visit: https://earthdata.nasa.gov/eosdis/science-system-description/eosdis-components/gibs

### Step 2: Configure Environment Variables

Create or edit the `.env` file in the `backend/` directory:

```env
# NASA Environmental Data API Key
NASA_API_KEY=your_environmental_data_api_key_here

# NASA Satellite Imagery API Key (for GIBS)
NASA_IMAGERY_API_KEY=your_satellite_imagery_api_key_here

# Optional: If you have a Bearer token instead
# NASA_API_KEY=Bearer your_token_here
```

### Step 3: Restart the Backend

After adding your API keys, restart the FastAPI backend:

```bash
cd backend
python run_dev.py
```

### Step 4: Verify Configuration

Check the API status by visiting:
- http://localhost:8000/api/v1/info
- http://localhost:8000/health

Look for logs indicating:
- ✅ NASA Environmental Data API initialized
- ✅ NASA Satellite Imagery API initialized

## Features Enabled with Real API Keys

### With Environmental Data API Key:
- ✅ Real-time NDVI (vegetation) data from MODIS
- ✅ Real-time temperature data
- ✅ Real-time glacier coverage data
- ✅ Real-time urban expansion data
- ✅ Historical data comparisons

### With Satellite Imagery API Key:
- ✅ Real-time satellite imagery in Stories
- ✅ Satellite overlays on maps
- ✅ High-resolution Earth observation images
- ✅ Multiple layer options (NDVI, True Color, Temperature)

## Fallback Behavior

If API keys are not configured:
- The application will continue to work with **simulated data**
- Satellite imagery will use placeholder images
- All features remain functional, just with simulated data

## Testing Your Setup

1. **Test Environmental Data:**
   ```
   GET http://localhost:8000/api/v1/environmental/ndvi/2020?region=nepal_himalayas
   ```
   Should return real data if API key is configured.

2. **Test Satellite Imagery:**
   ```
   GET http://localhost:8000/api/v1/maps/gibs/snapshot?layer=MODIS_Terra_NDVI_16Day&year=2020
   ```
   Should return a real satellite image.

## Troubleshooting

### API Key Not Working?
- Verify the key is correctly set in `.env` file
- Check for extra spaces or quotes
- Ensure the backend was restarted after adding keys
- Check backend logs for error messages

### No Satellite Images?
- GIBS is often publicly accessible, so images may work without a key
- Some layers require authentication
- Check network connectivity to NASA servers

### Still Using Simulated Data?
- Check backend logs for initialization messages
- Verify API keys are not set to placeholder values
- Ensure `.env` file is in the `backend/` directory

## API Rate Limits

- NASA API has rate limits (typically 1000 requests/hour for free tier)
- The application includes caching to minimize API calls
- Simulated data is used as fallback if rate limits are exceeded

## Support

For issues with:
- **NASA API Keys**: Contact NASA API support
- **Application Setup**: Check the main README.md
- **Code Issues**: Review backend logs in the console

