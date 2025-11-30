"""
Environmental Data API Routes
Provides endpoints for NDVI, Glacier, Urban, and Temperature data
"""

from fastapi import APIRouter, HTTPException, Query, Path
from typing import List, Optional, Union
from datetime import datetime

from app.models.environmental import (
    NDVIData, GlacierData, UrbanData, TemperatureData,
    GLOFData, ForestData, LandslideData, EarthquakeRecoveryData,
    DataIndicator, Region, EnvironmentalSummary, ComparisonResult
)
from app.services.data_simulation import environmental_simulator
from app.config.settings import settings

router = APIRouter()

@router.get("/ndvi/{year}", response_model=NDVIData)
async def get_ndvi_data(
    year: int = Path(..., ge=settings.DATA_YEAR_MIN, le=settings.DATA_YEAR_MAX),
    region: Region = Query(default=Region.NEPAL_HIMALAYAS, description="Geographic region")
):
    """
    Get NDVI (Vegetation Index) data for a specific year and region
    
    - **year**: Year between 2000-2025
    - **region**: Geographic region (nepal_himalayas, kathmandu_valley, annapurna_region, everest_region)
    """
    # Always delegate to simulator which will use real NASA data when configured,
    # and gracefully fallback to simulated data otherwise.
    return await environmental_simulator.simulate_ndvi_data(region, year)

@router.get("/glacier/{year}", response_model=GlacierData)
async def get_glacier_data(
    year: int = Path(..., ge=settings.DATA_YEAR_MIN, le=settings.DATA_YEAR_MAX),
    region: Region = Query(default=Region.NEPAL_HIMALAYAS, description="Geographic region")
):
    """
    Get Glacier coverage and retreat data for a specific year and region
    
    - **year**: Year between 2000-2025
    - **region**: Geographic region (nepal_himalayas, kathmandu_valley, annapurna_region, everest_region)
    """
    return await environmental_simulator.simulate_glacier_data(region, year)

@router.get("/urban/{year}", response_model=UrbanData)
async def get_urban_data(
    year: int = Path(..., ge=settings.DATA_YEAR_MIN, le=settings.DATA_YEAR_MAX),
    region: Region = Query(default=Region.NEPAL_HIMALAYAS, description="Geographic region")
):
    """
    Get Urban expansion data for a specific year and region
    
    - **year**: Year between 2000-2025
    - **region**: Geographic region (nepal_himalayas, kathmandu_valley, annapurna_region, everest_region)
    """
    return await environmental_simulator.simulate_urban_data(region, year)

@router.get("/temperature/{year}", response_model=TemperatureData)
async def get_temperature_data(
    year: int = Path(..., ge=settings.DATA_YEAR_MIN, le=settings.DATA_YEAR_MAX),
    region: Region = Query(default=Region.NEPAL_HIMALAYAS, description="Geographic region")
):
    """
    Get Land Surface Temperature data for a specific year and region
    
    - **year**: Year between 2000-2025
    - **region**: Geographic region (nepal_himalayas, kathmandu_valley, annapurna_region, everest_region)
    """
    return await environmental_simulator.simulate_temperature_data(region, year)

@router.get("/glof/{year}", response_model=GLOFData)
async def get_glof_data(
    year: int = Path(..., ge=settings.DATA_YEAR_MIN, le=settings.DATA_YEAR_MAX),
    region: Region = Query(default=Region.NEPAL_HIMALAYAS, description="Geographic region")
):
    """Get GLOF risk data"""
    return await environmental_simulator.simulate_glof_data(region, year)

@router.get("/forest/{year}", response_model=ForestData)
async def get_forest_data(
    year: int = Path(..., ge=settings.DATA_YEAR_MIN, le=settings.DATA_YEAR_MAX),
    region: Region = Query(default=Region.NEPAL_HIMALAYAS, description="Geographic region")
):
    """Get Forest cover data"""
    return await environmental_simulator.simulate_forest_data(region, year)

@router.get("/landslide/{year}", response_model=LandslideData)
async def get_landslide_data(
    year: int = Path(..., ge=settings.DATA_YEAR_MIN, le=settings.DATA_YEAR_MAX),
    region: Region = Query(default=Region.NEPAL_HIMALAYAS, description="Geographic region")
):
    """Get Landslide susceptibility data"""
    return await environmental_simulator.simulate_landslide_data(region, year)

@router.get("/earthquake/{year}", response_model=EarthquakeRecoveryData)
async def get_earthquake_data(
    year: int = Path(..., ge=settings.DATA_YEAR_MIN, le=settings.DATA_YEAR_MAX),
    region: Region = Query(default=Region.NEPAL_HIMALAYAS, description="Geographic region")
):
    """Get Earthquake recovery data"""
    return await environmental_simulator.simulate_earthquake_data(region, year)

@router.get("/summary", response_model=EnvironmentalSummary)
async def get_environmental_summary(
    year: int = Query(..., ge=settings.DATA_YEAR_MIN, le=settings.DATA_YEAR_MAX),
    region: Region = Query(default=Region.NEPAL_HIMALAYAS, description="Geographic region")
):
    """
    Get comprehensive environmental summary for all indicators in a specific year and region
    """
    import asyncio
    
    tasks = [
        environmental_simulator.simulate_ndvi_data(region, year),
        environmental_simulator.simulate_glacier_data(region, year),
        environmental_simulator.simulate_urban_data(region, year),
        environmental_simulator.simulate_temperature_data(region, year),
        environmental_simulator.simulate_glof_data(region, year),
        environmental_simulator.simulate_forest_data(region, year),
        environmental_simulator.simulate_landslide_data(region, year),
        environmental_simulator.simulate_earthquake_data(region, year)
    ]
    
    results = await asyncio.gather(*tasks)
    
    return EnvironmentalSummary(
        year=year,
        region=region,
        ndvi_data=results[0],
        glacier_data=results[1],
        urban_data=results[2],
        temperature_data=results[3],
        glof_data=results[4],
        forest_data=results[5],
        landslide_data=results[6],
        earthquake_data=results[7]
    )

@router.get("/compare/temporal", response_model=List[ComparisonResult])
async def get_temporal_comparison(
    indicator: DataIndicator = Query(..., description="Environmental indicator to compare"),
    region: Region = Query(default=Region.NEPAL_HIMALAYAS, description="Geographic region"),
    start_year: int = Query(default=2000, ge=settings.DATA_YEAR_MIN, le=settings.DATA_YEAR_MAX),
    end_year: int = Query(default=2025, ge=settings.DATA_YEAR_MIN, le=settings.DATA_YEAR_MAX),
    include_intermediate: bool = Query(default=False, description="Include data for years between start and end")
):
    """Compare environmental data across different years"""
    if start_year >= end_year:
        raise HTTPException(status_code=400, detail="start_year must be less than end_year")
    
    years_to_analyze = [start_year, end_year]
    if include_intermediate:
        intermediate_years = list(range(start_year + 5, end_year, 5))
        years_to_analyze = sorted([start_year] + intermediate_years + [end_year])
    
    import asyncio
    
    async def get_indicator_data(year: int):
        if indicator == DataIndicator.NDVI:
            return await environmental_simulator.simulate_ndvi_data(region, year)
        elif indicator == DataIndicator.GLACIER:
            return await environmental_simulator.simulate_glacier_data(region, year)
        elif indicator == DataIndicator.URBAN:
            return await environmental_simulator.simulate_urban_data(region, year)
        elif indicator == DataIndicator.TEMPERATURE:
            return await environmental_simulator.simulate_temperature_data(region, year)
        elif indicator == DataIndicator.GLOF:
            return await environmental_simulator.simulate_glof_data(region, year)
        elif indicator == DataIndicator.FOREST:
            return await environmental_simulator.simulate_forest_data(region, year)
        elif indicator == DataIndicator.LANDSLIDE:
            return await environmental_simulator.simulate_landslide_data(region, year)
        elif indicator == DataIndicator.EARTHQUAKE:
            return await environmental_simulator.simulate_earthquake_data(region, year)
    
    data_tasks = [get_indicator_data(y) for y in years_to_analyze]
    data_results = await asyncio.gather(*data_tasks)
    
    baseline_data = data_results[0]
    comparison_data = data_results[-1]
    
    baseline_value = 0
    comparison_value = 0
    
    if indicator == DataIndicator.NDVI:
        baseline_value = baseline_data.average_ndvi
        comparison_value = comparison_data.average_ndvi
    elif indicator == DataIndicator.GLACIER:
        baseline_value = baseline_data.glacier_area_km2
        comparison_value = comparison_data.glacier_area_km2
    elif indicator == DataIndicator.URBAN:
        baseline_value = baseline_data.urban_area_km2
        comparison_value = comparison_data.urban_area_km2
    elif indicator == DataIndicator.TEMPERATURE:
        baseline_value = baseline_data.average_temperature_c
        comparison_value = comparison_data.average_temperature_c
    elif indicator == DataIndicator.GLOF:
        baseline_value = baseline_data.lake_area_km2
        comparison_value = comparison_data.lake_area_km2
    elif indicator == DataIndicator.FOREST:
        baseline_value = baseline_data.forest_cover_km2
        comparison_value = comparison_data.forest_cover_km2
    elif indicator == DataIndicator.LANDSLIDE:
        baseline_value = baseline_data.susceptibility_index
        comparison_value = comparison_data.susceptibility_index
    elif indicator == DataIndicator.EARTHQUAKE:
        baseline_value = baseline_data.recovery_percentage
        comparison_value = comparison_data.recovery_percentage
    
    change_amount = comparison_value - baseline_value
    change_percentage = (change_amount / baseline_value * 100) if baseline_value != 0 else 0
    
    trend_summary = environmental_simulator.get_trend_summary(indicator, region, start_year, end_year)
    
    result = ComparisonResult(
        comparison_type="temporal",
        region=region,
        indicator=indicator,
        baseline_year=start_year,
        comparison_year=end_year,
        baseline_value=round(baseline_value, 3),
        comparison_value=round(comparison_value, 3),
        change_amount=round(change_amount, 3),
        change_percentage=round(change_percentage, 2),
        trend_summary=trend_summary,
        impact_assessment=f"The {indicator.value} indicator shows significant change over {end_year - start_year} years"
    )
    
    return [result]

@router.get("/indicators")
async def get_supported_indicators():
    """Get list of supported environmental indicators"""
    return {
        "indicators": [
            {
                "id": "ndvi",
                "name": "Normalized Difference Vegetation Index",
                "description": "Plant health and vegetation density",
                "unit": "NDVI",
                "source": "MODIS/Landsat",
                "range": "0.0 to 1.0"
            },
            {
                "id": "glacier",
                "name": "Glacier Coverage",
                "description": "Glacier extent and ice coverage",
                "unit": "km²",
                "source": "Sentinel/Landsat",
                "range": "Variable"
            },
            {
                "id": "urban",
                "name": "Urban Expansion",
                "description": "Built-up area and urban development",
                "unit": "km²",
                "source": "Landsat/Nightlight",
                "range": "Variable"
            },
            {
                "id": "temperature",
                "name": "Land Surface Temperature",
                "description": "Surface temperature monitoring",
                "unit": "°C",
                "source": "MODIS",
                "range": "Variable"
            },
            {
                "id": "glof",
                "name": "GLOF Risk",
                "description": "Glacial Lake Outburst Flood risk",
                "unit": "Risk Level",
                "source": "Sentinel",
                "range": "Low to Critical"
            },
            {
                "id": "forest",
                "name": "Forest Cover",
                "description": "Forest coverage and health",
                "unit": "km²",
                "source": "Landsat",
                "range": "Variable"
            },
            {
                "id": "landslide",
                "name": "Landslide Susceptibility",
                "description": "Landslide risk zones",
                "unit": "Index (0-1)",
                "source": "Other",
                "range": "0.0 to 1.0"
            },
            {
                "id": "earthquake",
                "name": "Earthquake Recovery",
                "description": "Post-earthquake vegetation recovery",
                "unit": "%",
                "source": "MODIS",
                "range": "0 to 100"
            }
        ],
        "regions": [
            {
                "id": "nepal_himalayas",
                "name": "Nepal Himalayas",
                "description": "Entire Nepal Himalayan region"
            },
            {
                "id": "kathmandu_valley",
                "name": "Kathmandu Valley",
                "description": "Urban valley region"
            },
            {
                "id": "annapurna_region",
                "name": "Annapurna Region",
                "description": "Mountain region with glaciers"
            },
            {
                "id": "everest_region",
                "name": "Everest Region",
                "description": "High altitude extreme environment"
            }
        ]
    }

@router.get("/trends/{indicator}", response_model=List[dict])
async def get_indicator_trends(
    indicator: DataIndicator = Path(..., description="Environmental indicator"),
    region: Region = Query(default=Region.NEPAL_HIMALAYAS, description="Geographic region"),
    year_range: str = Query(default="2000-2025", description="Year range in format 'start-end'")
):
    """Get historical trends for an environmental indicator"""
    try:
        start_year, end_year = map(int, year_range.split("-"))
        if start_year < settings.DATA_YEAR_MIN or end_year > settings.DATA_YEAR_MAX:
            raise ValueError("Year range out of bounds")
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid year range format. Use 'YYYY-YYYY'")
    
    years = list(range(start_year, end_year + 1, 5))
    if years[-1] != end_year:
        years.append(end_year)
    
    import asyncio
    
    async def get_trend_data(year: int):
        if indicator == DataIndicator.NDVI:
            data = await environmental_simulator.simulate_ndvi_data(region, year)
            return {"year": year, "value": data.average_ndvi, "unit": "NDVI", "trend": data.trend}
        elif indicator == DataIndicator.GLACIER:
            data = await environmental_simulator.simulate_glacier_data(region, year)
            return {"year": year, "value": data.glacier_area_km2, "unit": "km²", "trend": data.trend}
        elif indicator == DataIndicator.URBAN:
            data = await environmental_simulator.simulate_urban_data(region, year)
            return {"year": year, "value": data.urban_area_km2, "unit": "km²", "trend": data.trend}
        elif indicator == DataIndicator.TEMPERATURE:
            data = await environmental_simulator.simulate_temperature_data(region, year)
            return {"year": year, "value": data.average_temperature_c, "unit": "°C", "trend": data.trend}
        elif indicator == DataIndicator.GLOF:
            data = await environmental_simulator.simulate_glof_data(region, year)
            return {"year": year, "value": data.lake_area_km2, "unit": "km²", "trend": data.risk_level}
        elif indicator == DataIndicator.FOREST:
            data = await environmental_simulator.simulate_forest_data(region, year)
            return {"year": year, "value": data.forest_cover_km2, "unit": "km²", "trend": "stable"}
        elif indicator == DataIndicator.LANDSLIDE:
            data = await environmental_simulator.simulate_landslide_data(region, year)
            return {"year": year, "value": data.susceptibility_index, "unit": "Index", "trend": "variable"}
        elif indicator == DataIndicator.EARTHQUAKE:
            data = await environmental_simulator.simulate_earthquake_data(region, year)
            return {"year": year, "value": data.recovery_percentage, "unit": "%", "trend": "recovering"}
    
    trend_data = await asyncio.gather(*[get_trend_data(y) for y in years])
    
    return sorted(trend_data, key=lambda x: x["year"])
