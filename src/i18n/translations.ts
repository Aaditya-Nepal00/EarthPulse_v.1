/**
 * EarthPulse - Internationalization Translations
 * English and Nepali (नेपाली) language support
 */

export interface Translations {
    // Header
    appName: string
    tagline: string

    // Navigation
    dashboard: string
    comparison: string
    stories: string
    download: string

    // Environmental Indicators
    indicators: {
        ndvi: string
        glacier: string
        urban: string
        temperature: string
        glof: string
        forest: string
        landslide: string
        earthquake: string
    }

    // Dashboard
    environmentalDashboard: string
    selectIndicator: string
    currentYear: string
    trend: string
    value: string
    status: string
    details: string
    refreshData: string
    exportData: string

    // Status
    statusGood: string
    statusWarning: string
    statusCritical: string
    statusStable: string

    // Trends
    trendIncreasing: string
    trendDecreasing: string
    trendStable: string
    trendImproving: string
    trendDeclining: string

    // Map
    mapView: string
    satelliteImagery: string
    dataPoints: string

    // Timeline
    timeSlider: string
    selectYear: string

    // Comparison
    comparisonTool: string
    compareYears: string
    baselineYear: string
    comparisonYear: string
    changeAmount: string
    changePercentage: string

    // Stories
    environmentalStories: string
    storyOf: string
    year: string
    nextSlide: string
    previousSlide: string
    play: string
    pause: string
    poweredByNASA: string

    // Story Titles
    storyTitles: {
        imjaTsho: string
        kathmandu: string
        gorkha: string
        terai: string
        rara: string
    }

    // Download
    downloadPanel: string
    exportReport: string
    selectFormat: string
    includeCharts: string
    includeMaps: string
    generateReport: string
    exportAsPDF: string

    // Formats
    formats: {
        pdf: string
        excel: string
        csv: string
        json: string
    }

    // Common
    close: string
    loading: string
    error: string
    retry: string
    success: string

    // Live Data
    liveData: string
    staticImages: string
    liveNASAData: string

    // GLOF Warnings
    glofWarnings: string
    highRiskLakes: string
    riskLevel: string
    lakeArea: string
    expansionRate: string

    // Units
    units: {
        km2: string
        celsius: string
        percent: string
        index: string
        perYear: string
    }

    // Regions
    regions: {
        nepalHimalayas: string
        kathmanduValley: string
        annapurnaRegion: string
        everestRegion: string
    }
}

export const translations: Record<'en' | 'ne', Translations> = {
    en: {
        // Header
        appName: 'EarthPulse',
        tagline: 'NASA Earth Observation for Nepal',

        // Navigation
        dashboard: 'Dashboard',
        comparison: 'Comparison',
        stories: 'Stories',
        download: 'Download',

        // Environmental Indicators
        indicators: {
            ndvi: 'Vegetation (NDVI)',
            glacier: 'Glacier Coverage',
            urban: 'Urban Expansion',
            temperature: 'Temperature',
            glof: 'GLOF Risk',
            forest: 'Forest Coverage',
            landslide: 'Landslide Risk',
            earthquake: 'Earthquake Recovery',
        },

        // Dashboard
        environmentalDashboard: 'Environmental Dashboard',
        selectIndicator: 'Select Indicator',
        currentYear: 'Current Year',
        trend: 'Trend',
        value: 'Value',
        status: 'Status',
        details: 'Details',
        refreshData: 'Refresh Data',
        exportData: 'Export Data',

        // Status
        statusGood: 'Good',
        statusWarning: 'Warning',
        statusCritical: 'Critical',
        statusStable: 'Stable',

        // Trends
        trendIncreasing: 'Increasing',
        trendDecreasing: 'Decreasing',
        trendStable: 'Stable',
        trendImproving: 'Improving',
        trendDeclining: 'Declining',

        // Map
        mapView: 'Map View',
        satelliteImagery: 'Satellite Imagery',
        dataPoints: 'Data Points',

        // Timeline
        timeSlider: 'Time Slider',
        selectYear: 'Select Year',

        // Comparison
        comparisonTool: 'Comparison Tool',
        compareYears: 'Compare Years',
        baselineYear: 'Baseline Year',
        comparisonYear: 'Comparison Year',
        changeAmount: 'Change Amount',
        changePercentage: 'Change Percentage',

        // Stories
        environmentalStories: 'Environmental Stories',
        storyOf: 'Story of',
        year: 'Year',
        nextSlide: 'Next Slide',
        previousSlide: 'Previous Slide',
        play: 'Play',
        pause: 'Pause',
        poweredByNASA: 'Powered by NASA Earth Observation Data',

        // Story Titles
        storyTitles: {
            imjaTsho: 'Imja Tsho: Growing GLOF Threat',
            kathmandu: 'Kathmandu Valley: Urban Explosion',
            gorkha: '2015 Gorkha Earthquake: Landslide Scars',
            terai: 'Terai: Community Forestry Success',
            rara: 'Rara Lake: Pristine Ecosystem',
        },

        // Download
        downloadPanel: 'Download Panel',
        exportReport: 'Export Report',
        selectFormat: 'Select Format',
        includeCharts: 'Include Charts',
        includeMaps: 'Include Maps',
        generateReport: 'Generate Report',
        exportAsPDF: 'Export as PDF Report',

        // Formats
        formats: {
            pdf: 'PDF Document',
            excel: 'Excel Spreadsheet',
            csv: 'CSV Data',
            json: 'JSON Data',
        },

        // Common
        close: 'Close',
        loading: 'Loading...',
        error: 'Error',
        retry: 'Retry',
        success: 'Success',

        // Live Data
        liveData: 'Live Data',
        staticImages: 'Static Images',
        liveNASAData: 'Live NASA Data',

        // GLOF Warnings
        glofWarnings: 'GLOF Warnings',
        highRiskLakes: 'High-Risk Lakes',
        riskLevel: 'Risk Level',
        lakeArea: 'Lake Area',
        expansionRate: 'Expansion Rate',

        // Units
        units: {
            km2: 'km²',
            celsius: '°C',
            percent: '%',
            index: 'Index',
            perYear: '/year',
        },

        // Regions
        regions: {
            nepalHimalayas: 'Nepal Himalayas',
            kathmanduValley: 'Kathmandu Valley',
            annapurnaRegion: 'Annapurna Region',
            everestRegion: 'Everest Region',
        },
    },

    ne: {
        // Header
        appName: 'अर्थपल्स',
        tagline: 'नेपालका लागि नासा पृथ्वी अवलोकन',

        // Navigation
        dashboard: 'ड्यासबोर्ड',
        comparison: 'तुलना',
        stories: 'कथाहरू',
        download: 'डाउनलोड',

        // Environmental Indicators
        indicators: {
            ndvi: 'वनस्पति (NDVI)',
            glacier: 'हिमनदी क्षेत्र',
            urban: 'शहरी विस्तार',
            temperature: 'तापक्रम',
            glof: 'GLOF जोखिम',
            forest: 'वन क्षेत्र',
            landslide: 'पहिरो जोखिम',
            earthquake: 'भूकम्प पुनर्निर्माण',
        },

        // Dashboard
        environmentalDashboard: 'वातावरणीय ड्यासबोर्ड',
        selectIndicator: 'सूचक छान्नुहोस्',
        currentYear: 'हालको वर्ष',
        trend: 'प्रवृत्ति',
        value: 'मान',
        status: 'स्थिति',
        details: 'विवरण',
        refreshData: 'डाटा ताजा गर्नुहोस्',
        exportData: 'डाटा निर्यात गर्नुहोस्',

        // Status
        statusGood: 'राम्रो',
        statusWarning: 'चेतावनी',
        statusCritical: 'गम्भीर',
        statusStable: 'स्थिर',

        // Trends
        trendIncreasing: 'बढ्दै',
        trendDecreasing: 'घट्दै',
        trendStable: 'स्थिर',
        trendImproving: 'सुधार हुँदै',
        trendDeclining: 'खस्कँदै',

        // Map
        mapView: 'नक्सा दृश्य',
        satelliteImagery: 'उपग्रह चित्र',
        dataPoints: 'डाटा बिन्दुहरू',

        // Timeline
        timeSlider: 'समय स्लाइडर',
        selectYear: 'वर्ष छान्नुहोस्',

        // Comparison
        comparisonTool: 'तुलना उपकरण',
        compareYears: 'वर्षहरू तुलना गर्नुहोस्',
        baselineYear: 'आधार वर्ष',
        comparisonYear: 'तुलना वर्ष',
        changeAmount: 'परिवर्तन मात्रा',
        changePercentage: 'परिवर्तन प्रतिशत',

        // Stories
        environmentalStories: 'वातावरणीय कथाहरू',
        storyOf: 'को कथा',
        year: 'वर्ष',
        nextSlide: 'अर्को स्लाइड',
        previousSlide: 'अघिल्लो स्लाइड',
        play: 'चलाउनुहोस्',
        pause: 'रोक्नुहोस्',
        poweredByNASA: 'नासा पृथ्वी अवलोकन डाटाद्वारा संचालित',

        // Story Titles
        storyTitles: {
            imjaTsho: 'इम्जा त्सो: बढ्दो GLOF खतरा',
            kathmandu: 'काठमाडौं उपत्यका: शहरी विस्फोट',
            gorkha: '२०७२ गोरखा भूकम्प: पहिरोका दागहरू',
            terai: 'तराई: सामुदायिक वन सफलता',
            rara: 'रारा ताल: शुद्ध पारिस्थितिकी तंत्र',
        },

        // Download
        downloadPanel: 'डाउनलोड प्यानल',
        exportReport: 'रिपोर्ट निर्यात गर्नुहोस्',
        selectFormat: 'ढाँचा छान्नुहोस्',
        includeCharts: 'चार्टहरू समावेश गर्नुहोस्',
        includeMaps: 'नक्साहरू समावेश गर्नुहोस्',
        generateReport: 'रिपोर्ट उत्पन्न गर्नुहोस्',
        exportAsPDF: 'PDF रिपोर्ट निर्यात गर्नुहोस्',

        // Formats
        formats: {
            pdf: 'PDF कागजात',
            excel: 'Excel स्प्रेडसिट',
            csv: 'CSV डाटा',
            json: 'JSON डाटा',
        },

        // Common
        close: 'बन्द गर्नुहोस्',
        loading: 'लोड हुँदैछ...',
        error: 'त्रुटि',
        retry: 'पुन: प्रयास गर्नुहोस्',
        success: 'सफलता',

        // Live Data
        liveData: 'प्रत्यक्ष डाटा',
        staticImages: 'स्थिर चित्रहरू',
        liveNASAData: 'प्रत्यक्ष नासा डाटा',

        // GLOF Warnings
        glofWarnings: 'GLOF चेतावनीहरू',
        highRiskLakes: 'उच्च जोखिम तालहरू',
        riskLevel: 'जोखिम स्तर',
        lakeArea: 'ताल क्षेत्र',
        expansionRate: 'विस्तार दर',

        // Units
        units: {
            km2: 'वर्ग कि.मी.',
            celsius: '°C',
            percent: '%',
            index: 'सूचकांक',
            perYear: '/वर्ष',
        },

        // Regions
        regions: {
            nepalHimalayas: 'नेपाल हिमालय',
            kathmanduValley: 'काठमाडौं उपत्यका',
            annapurnaRegion: 'अन्नपूर्ण क्षेत्र',
            everestRegion: 'सगरमाथा क्षेत्र',
        },
    },
}

export type Language = 'en' | 'ne'

export const getTranslation = (lang: Language): Translations => {
    return translations[lang]
}
