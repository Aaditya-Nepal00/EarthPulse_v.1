"""
Realistic Environmental Data Simulation Service
Generates credible mock data that follows real-world environmental trends
"""

import random
import math
import asyncio
import logging
from datetime import datetime
from typing import Dict, List, Optional, Tuple
import numpy as np

from app.models.environmental import (
    NDVIData, GlacierData, UrbanData, TemperatureData,
    GLOFData, ForestData, LandslideData, EarthquakeRecoveryData,
    EnvironmentalDataPoint, Region, DataIndicator, DataSource
)
from app.models.geographic import get_region_info, get_region_boundary, get_region_center
from app.config.settings import settings

logger = logging.getLogger(__name__)

class EnvironmentalDataSimulator:
    """Simulates realistic environmental data based on actual climate trends"""
    
    # Real-world data trends for Nepal Himalayas (2000-2025)
    REAL_TRENDS = {
        "ndvi": {
            "base_value": 0.65,
            "trend": 0.002,
            "variation": 0.05,
            "seasonal_pattern": True
        },
        "glacier": {
            "initial_area": 1800.0,
            "retreat_rate": 25.0,
            "variation_fraction": 0.15,
            "acceleration_factor": 1.02
        },
        "urban": {
            "initial_area": 120.0,
            "growth_rate": 8.5,
            "variation_fraction": 0.20,
            "population_growth": 0.025
        },
        "temperature": {
            "base_temp": 17.5,
            "warming_rate": 0.08,
            "variation": 1.5,
            "urban_heat_island": 1.2
        }
    }
    
    def __init__(self):
        self.region_adjustments = self._calculate_region_adjustments()
    
    def _calculate_region_adjustments(self) -> Dict[str, Dict[str, float]]:
        """Calculate region-specific adjustments based on geographic characteristics"""
        return {
            "kathmandu_valley": {
                "ndvi": 0.8,
                "glacier": 0.0,
                "urban": 2.5,
                "temperature": 1.2
            },
            "nepal_himalayas": {
                "ndvi": 1.0,
                "glacier": 1.0,
                "urban": 1.0,
                "temperature": 1.0
            },
            "annapurna_region": {
                "ndvi": 1.1,
                "glacier": 1.2,
                "urban": 0.8,
                "temperature": 0.9
            },
            "everest_region": {
                "ndvi": 0.9,
                "glacier": 1.5,
                "urban": 0.5,
                "temperature": 0.8
            }
        }

    async def simulate_ndvi_data(self, region: Region, year: int) -> NDVIData:
        """Simulate realistic NDVI data"""
        try:
            await self._simulate_api_delay()
            
            # If configured to use real data (and keys present), try that first
            # But for now, we default to simulation as per settings
            
            return self._simulate_ndvi_data_fallback(region, year)
            
        except Exception as e:
            logger.error(f"NDVI Simulation failed: {e}")
            return NDVIData(
                year=year,
                region=region,
                average_ndvi=0.6,
                min_ndvi=0.2,
                max_ndvi=0.9,
                vegetation_coverage_percent=60.0,
                data_points=[],
                source=DataSource.MODIS,
                trend="stable"
            )

    async def simulate_glacier_data(self, region: Region, year: int) -> GlacierData:
        """Simulate realistic glacier retreat"""
        try:
            await self._simulate_api_delay()
            
            trend_config = self.REAL_TRENDS["glacier"]
            region_factor = self.region_adjustments.get(region.value, {}).get("glacier", 1.0)
            
            years_from_2000 = year - 2000
            
            # Calculate area with accelerated retreat
            retreat_factor = 1.0 + (years_from_2000 * 0.01)
            total_retreat = trend_config["retreat_rate"] * years_from_2000 * retreat_factor
            
            current_area = max(0, trend_config["initial_area"] - total_retreat)
            current_area *= region_factor
            
            # Add variation
            variation = current_area * trend_config["variation_fraction"]
            current_area += random.uniform(-variation, variation)
            
            # Generate points if possible
            data_points = []
            try:
                region_info = get_region_info(region.value)
                if region_info:
                    boundary = get_region_boundary(region.value)
                    data_points = self._generate_spatial_data_points(
                        boundary, "glacier", 1.0, 0.2, year
                    )
            except Exception:
                data_points = []
            
            return GlacierData(
                year=year,
                region=region,
                glacier_area_km2=round(current_area, 1),
                ice_thickness_m=round(max(0, 150 - (years_from_2000 * 2)), 1),
                retreat_rate_m_per_year=round(trend_config["retreat_rate"] * retreat_factor, 1),
                data_points=data_points,
                source=DataSource.SENTINEL,
                trend="decreasing"
            )
        except Exception as e:
            logger.error(f"Glacier Simulation failed: {e}")
            return GlacierData(
                year=year,
                region=region,
                glacier_area_km2=1500.0,
                ice_thickness_m=100.0,
                retreat_rate_m_per_year=15.0,
                data_points=[],
                source=DataSource.SENTINEL,
                trend="decreasing"
            )

    async def simulate_urban_data(self, region: Region, year: int) -> UrbanData:
        """Simulate urban expansion"""
        try:
            await self._simulate_api_delay()
            
            trend_config = self.REAL_TRENDS["urban"]
            region_factor = self.region_adjustments.get(region.value, {}).get("urban", 1.0)
            
            years_from_2000 = year - 2000
            
            # Exponential growth model
            growth_factor = (1 + trend_config["population_growth"]) ** years_from_2000
            base_area = trend_config["initial_area"] * growth_factor
            base_area *= region_factor
            
            variation = base_area * trend_config["variation_fraction"]
            current_area = base_area + random.uniform(-variation, variation)
            
            built_up_pct = min(100, (current_area / 5000) * 100) # Approximate total area
            
            data_points = []
            try:
                region_info = get_region_info(region.value)
                if region_info:
                    boundary = get_region_boundary(region.value)
                    data_points = self._generate_spatial_data_points(
                        boundary, "urban", 1.0, 0.2, year
                    )
            except Exception:
                data_points = []

            return UrbanData(
                year=year,
                region=region,
                urban_area_km2=round(current_area, 1),
                built_up_percentage=round(built_up_pct, 1),
                population_estimate=int(current_area * 1500),
                nightlight_intensity=round(min(10, 2 + (years_from_2000 * 0.2)), 1),
                data_points=data_points,
                source=DataSource.LANDSAT,
                trend="expanding"
            )
        except Exception as e:
            logger.error(f"Urban Simulation failed: {e}")
            return UrbanData(
                year=year,
                region=region,
                urban_area_km2=200.0,
                built_up_percentage=5.0,
                population_estimate=500000,
                nightlight_intensity=5.0,
                data_points=[],
                source=DataSource.LANDSAT,
                trend="expanding"
            )

    async def simulate_temperature_data(self, region: Region, year: int) -> TemperatureData:
        """Simulate temperature warming"""
        try:
            await self._simulate_api_delay()
            
            trend_config = self.REAL_TRENDS["temperature"]
            region_factor = self.region_adjustments.get(region.value, {}).get("temperature", 1.0)
            
            years_from_2000 = year - 2000
            base_temp = trend_config["base_temp"] + (trend_config["warming_rate"] * years_from_2000)
            base_temp *= region_factor
            
            variation = random.uniform(-trend_config["variation"], trend_config["variation"])
            avg_temp = base_temp + variation
            
            data_points = []
            try:
                region_info = get_region_info(region.value)
                if region_info:
                    boundary = get_region_boundary(region.value)
                    data_points = self._generate_spatial_data_points(
                        boundary, "temperature", avg_temp, trend_config["variation"], year
                    )
            except Exception:
                data_points = []

            return TemperatureData(
                year=year,
                region=region,
                average_temperature_c=round(avg_temp, 1),
                min_temperature_c=round(avg_temp - 5, 1),
                max_temperature_c=round(avg_temp + 5, 1),
                heat_island_effect=0.5,
                data_points=data_points,
                source=DataSource.MODIS,
                trend="warming"
            )
        except Exception as e:
            logger.error(f"Temperature Simulation failed: {e}")
            return TemperatureData(
                year=year,
                region=region,
                average_temperature_c=20.0,
                min_temperature_c=15.0,
                max_temperature_c=25.0,
                heat_island_effect=0.5,
                data_points=[],
                source=DataSource.MODIS,
                trend="warming"
            )

    async def simulate_glof_data(self, region: Region, year: int) -> GLOFData:
        """Simulate GLOF risk"""
        return GLOFData(
            year=year,
            region=region,
            risk_level="High" if year > 2015 else "Medium",
            lake_area_km2=1.5,
            expansion_rate=0.02,
            data_points=[],
            source=DataSource.SENTINEL,
            trend="increasing"
        )

    async def simulate_forest_data(self, region: Region, year: int) -> ForestData:
        """Simulate Forest data"""
        return ForestData(
            year=year,
            region=region,
            forest_cover_km2=5000.0,
            deforestation_rate=0.5,
            illegal_logging_hotspots=2,
            community_forest_area=1000.0,
            data_points=[],
            source=DataSource.LANDSAT,
            trend="stable"
        )

    async def simulate_landslide_data(self, region: Region, year: int) -> LandslideData:
        """Simulate Landslide data"""
        return LandslideData(
            year=year,
            region=region,
            susceptibility_index=0.4,
            high_risk_area_km2=50.0,
            rainfall_correlation=0.8,
            data_points=[],
            source=DataSource.OTHER,
            trend="increasing"
        )

    async def simulate_earthquake_data(self, region: Region, year: int) -> EarthquakeRecoveryData:
        """Simulate Earthquake data"""
        return EarthquakeRecoveryData(
            year=year,
            region=region,
            recovery_percentage=80.0 if year > 2015 else 100.0,
            scar_visibility_index=0.2,
            vegetation_regrowth_rate=0.5,
            data_points=[],
            source=DataSource.MODIS,
            trend="recovering"
        )

    def _generate_spatial_data_points(
        self, 
        boundary: Optional[List[Tuple[float, float]]], 
        indicator_type: str, 
        base_value: float, 
        variation: float,
        year: int
    ) -> List[EnvironmentalDataPoint]:
        """Generate spatial data points across region"""
        if not boundary or len(boundary) < 3:
            return []
        
        try:
            # Generate sample points within region
            data_points = []
            num_points = random.randint(8, 25)
            
            # Get bounding box
            min_lng = min(point[0] for point in boundary)
            max_lng = max(point[0] for point in boundary)
            min_lat = min(point[1] for point in boundary)
            max_lat = max(point[1] for point in boundary)
            
            for _ in range(num_points):
                # Generate random points within bounding box
                longitude = random.uniform(min_lng, max_lng)
                latitude = random.uniform(min_lat, max_lat)
                
                # Add realistic variation to base value
                point_variation = random.uniform(-variation, variation)
                point_value = base_value + point_variation
                
                # Ensure reasonable bounds for different indicators
                if indicator_type == "ndvi":
                    point_value = max(-1, min(1, point_value))
                elif indicator_type == "temperature":
                    point_value = max(-50, min(50, point_value))
                elif indicator_type in ["glacier", "urban"]:
                    point_value = max(0, point_value)
                
                confidence = random.uniform(0.75, 0.98)
                
                # Safe month/day generation
                month = random.randint(6, 9)
                day = random.randint(1, 28)
                
                data_points.append(EnvironmentalDataPoint(
                    longitude=longitude,
                    latitude=latitude,
                    value=round(point_value, 3),
                    confidence=round(confidence, 2),
                    timestamp=datetime(year, month, day)
                ))
            
            return data_points
        except Exception as e:
            logger.error(f"Spatial point generation failed: {e}")
            return []
    
    async def _simulate_api_delay(self):
        """Simulate realistic API response delays"""
        if settings.SIMULATE_API_DELAY:
            delay = random.uniform(
                settings.API_DELAY_MS * 0.5, 
                settings.API_DELAY_MS * 1.5
            ) / 1000
            await asyncio.sleep(delay)
    
    def _process_real_ndvi_data(self, real_data: dict, region: Region, year: int) -> NDVIData:
        """Process real NASA MODIS NDVI data"""
        # Fallback to simulation for now to ensure stability
        return self._simulate_ndvi_data_fallback(region, year)
    
    def _simulate_ndvi_data_fallback(self, region: Region, year: int) -> NDVIData:
        """Fallback NDVI simulation when real data fails"""
        try:
            trend_config = self.REAL_TRENDS["ndvi"]
            region_factor = self.region_adjustments.get(region.value, {}).get("ndvi", 1.0)
            
            years_from_2000 = year - 2000
            base_value = trend_config["base_value"] + (trend_config["trend"] * years_from_2000)
            base_value *= region_factor
            
            variation = random.uniform(-trend_config["variation"], trend_config["variation"])
            avg_ndvi = max(0.0, min(1.0, base_value + variation))
            vegetation_coverage = max(0, min(100, avg_ndvi * 85 + random.uniform(-5, 10)))
            
            data_points = []
            try:
                region_info = get_region_info(region.value)
                if region_info:
                    boundary = get_region_boundary(region.value)
                    data_points = self._generate_spatial_data_points(
                        boundary, "ndvi", avg_ndvi, trend_config["variation"], year
                    )
            except Exception:
                data_points = []
            
            trend = "increasing" if avg_ndvi > 0.6 else "stable"
            
            return NDVIData(
                year=year,
                region=region,
                average_ndvi=round(avg_ndvi, 3),
                min_ndvi=round(max(0, avg_ndvi - trend_config["variation"]), 3),
                max_ndvi=round(min(1, avg_ndvi + trend_config["variation"]), 3),
                vegetation_coverage_percent=round(vegetation_coverage, 1),
                data_points=data_points,
                source=DataSource.MODIS,
                trend=trend
            )
        except Exception as e:
            logger.error(f"NDVI Fallback failed: {e}")
            return NDVIData(
                year=year,
                region=region,
                average_ndvi=0.6,
                min_ndvi=0.2,
                max_ndvi=0.9,
                vegetation_coverage_percent=60.0,
                data_points=[],
                source=DataSource.MODIS,
                trend="stable"
            )

    def get_trend_summary(self, indicator: DataIndicator, region: Region, start_year: int, end_year: int) -> str:
        """Generate human-readable trend summary"""
        years = end_year - start_year
        
        summaries = {
            DataIndicator.NDVI: f"Vegetation health changed over {years} years in {region.value.replace('_', ' ').title()}",
            DataIndicator.GLACIER: f"Glacier coverage retreated significantly over {years} years in {region.value.replace('_', ' ').title()}",
            DataIndicator.URBAN: f"Urban areas expanded dramatically over {years} years in {region.value.replace('_', ' ').title()}",
            DataIndicator.TEMPERATURE: f"Temperatures warmed consistently over {years} years in {region.value.replace('_', ' ').title()}"
        }
        
        return summaries.get(indicator, "Environmental changes observed over time")

# Global simulator instance
environmental_simulator = EnvironmentalDataSimulator()