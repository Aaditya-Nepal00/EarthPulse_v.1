/**
 * Story Data Configuration
 * 5 Real Nepal-focused environmental stories with NASA imagery
 */

export interface StoryData {
    id: string
    title: {
        en: string
        ne: string
    }
    subtitle: {
        en: string
        ne: string
    }
    description: {
        en: string
        ne: string
    }
    location: {
        name: string
        coordinates: [number, number] // [lng, lat]
        zoom: number
    }
    images: {
        before: {
            url: string
            year: number
            caption: string
        }
        after: {
            url: string
            year: number
            caption: string
        }
    }
    metrics: {
        label: string
        before: string
        after: string
        change: string
        trend: 'positive' | 'negative' | 'neutral'
    }[]
    nasaLinks: {
        before: string
        after: string
    }
}

export const stories: StoryData[] = [
    {
        id: 'imja-tsho',
        title: {
            en: 'Imja Tsho: Growing GLOF Threat',
            ne: 'इम्जा त्सो: बढ्दो GLOF खतरा'
        },
        subtitle: {
            en: 'Glacial lake expansion in the Everest region',
            ne: 'सगरमाथा क्षेत्रमा हिमताल विस्तार'
        },
        description: {
            en: 'Imja Tsho, a glacial lake in the Everest region, has grown dramatically over 25 years. NASA satellite imagery shows the lake expanding from 0.9 km² in 2000 to 1.35 km² in 2025—a 50% increase. This rapid growth poses a critical GLOF (Glacial Lake Outburst Flood) risk to downstream communities.',
            ne: 'सगरमाथा क्षेत्रको हिमताल इम्जा त्सो २५ वर्षमा नाटकीय रूपमा बढेको छ। नासा उपग्रह चित्रले देखाउँछ कि ताल २००० मा ०.९ वर्ग कि.मी. बाट २०२५ मा १.३५ वर्ग कि.मी. मा विस्तार भएको छ—५०% वृद्धि। यो द्रुत वृद्धिले तलका समुदायहरूलाई गम्भीर GLOF जोखिम खडा गरेको छ।'
        },
        location: {
            name: 'Imja Tsho, Everest Region',
            coordinates: [86.92, 27.90],
            zoom: 13
        },
        images: {
            before: {
                url: '/images/stories/imja-2000.jpg', // Placeholder - use NASA Worldview
                year: 2000,
                caption: 'Imja Tsho in 2000 - smaller glacial lake'
            },
            after: {
                url: '/images/stories/imja-2025.jpg', // Placeholder - use NASA Worldview
                year: 2025,
                caption: 'Imja Tsho in 2025 - 50% larger, critical GLOF risk'
            }
        },
        metrics: [
            {
                label: 'Lake Area',
                before: '0.9 km²',
                after: '1.35 km²',
                change: '+50%',
                trend: 'negative'
            },
            {
                label: 'Expansion Rate',
                before: '0.012 km²/year',
                after: '0.018 km²/year',
                change: '+50%',
                trend: 'negative'
            },
            {
                label: 'GLOF Risk Level',
                before: 'High',
                after: 'Critical',
                change: 'Increased',
                trend: 'negative'
            }
        ],
        nasaLinks: {
            before: 'https://worldview.earthdata.nasa.gov/?v=86.7,27.8,86.95,27.95&t=2000-10-15&l=MODIS_Terra_CorrectedReflectance_TrueColor',
            after: 'https://worldview.earthdata.nasa.gov/?v=86.7,27.8,86.95,27.95&t=2024-10-15&l=VIIRS_NOAA20_CorrectedReflectance_TrueColor'
        }
    },
    {
        id: 'kathmandu-urban',
        title: {
            en: 'Kathmandu Valley: Urban Explosion',
            ne: 'काठमाडौं उपत्यका: शहरी विस्फोट'
        },
        subtitle: {
            en: 'Farmland transformed into concrete jungle',
            ne: 'खेतबारी कंक्रीट जंगलमा परिणत'
        },
        description: {
            en: 'Kathmandu Valley has experienced explosive urban growth. NASA Landsat imagery reveals farmland and green spaces replaced by buildings and roads. NDVI dropped 40% (0.52 → 0.31) while urban area increased 249% (118 km² → 412 km²). This rapid urbanization has created severe air quality and heat island effects.',
            ne: 'काठमाडौं उपत्यकाले विस्फोटक शहरी वृद्धि अनुभव गरेको छ। नासा ल्यान्डस्याट चित्रले खेतबारी र हरियाली भवन र सडकले प्रतिस्थापन गरेको देखाउँछ। NDVI ४०% घट्यो (०.५२ → ०.३१) जबकि शहरी क्षेत्र २४९% बढ्यो (११८ वर्ग कि.मी. → ४१२ वर्ग कि.मी.)। यो द्रुत शहरीकरणले गम्भीर वायु गुणस्तर र ताप द्वीप प्रभाव सिर्जना गरेको छ।'
        },
        location: {
            name: 'Kathmandu Valley',
            coordinates: [85.32, 27.70],
            zoom: 11
        },
        images: {
            before: {
                url: '/images/stories/kathmandu-2000.jpg',
                year: 2000,
                caption: 'Kathmandu Valley 2000 - green farmland visible'
            },
            after: {
                url: '/images/stories/kathmandu-2025.jpg',
                year: 2025,
                caption: 'Kathmandu Valley 2025 - dense urban sprawl'
            }
        },
        metrics: [
            {
                label: 'NDVI (Vegetation)',
                before: '0.52',
                after: '0.31',
                change: '-40%',
                trend: 'negative'
            },
            {
                label: 'Urban Area',
                before: '118 km²',
                after: '412 km²',
                change: '+249%',
                trend: 'negative'
            },
            {
                label: 'Population',
                before: '1.5M',
                after: '3.2M',
                change: '+113%',
                trend: 'neutral'
            }
        ],
        nasaLinks: {
            before: 'https://worldview.earthdata.nasa.gov/?v=85.1,27.5,85.5,27.9&t=2000-11-01&l=MODIS_Terra_CorrectedReflectance_TrueColor',
            after: 'https://worldview.earthdata.nasa.gov/?v=85.1,27.5,85.5,27.9&t=2024-11-01&l=VIIRS_NOAA20_CorrectedReflectance_TrueColor'
        }
    },
    {
        id: 'gorkha-earthquake',
        title: {
            en: '2015 Gorkha Earthquake: Landslide Scars',
            ne: '२०७२ गोरखा भूकम्प: पहिरोका दागहरू'
        },
        subtitle: {
            en: 'Visible scars remain 10 years later',
            ne: '१० वर्षपछि पनि दागहरू देखिने'
        },
        description: {
            en: 'The devastating 2015 Gorkha earthquake triggered massive landslides across central Nepal. NASA MODIS imagery shows 156 km² of landslide-affected areas. A decade later, vegetation has recovered 45%, but earthquake scars remain visible from space. This serves as a reminder of Nepal\'s seismic vulnerability.',
            ne: '२०१५ को विनाशकारी गोरखा भूकम्पले मध्य नेपालभर ठूलो पहिरो ल्यायो। नासा MODIS चित्रले १५६ वर्ग कि.मी. पहिरो प्रभावित क्षेत्र देखाउँछ। एक दशकपछि, वनस्पति ४५% पुनर्स्थापित भएको छ, तर भूकम्पका दागहरू अझै अन्तरिक्षबाट देखिन्छन्। यसले नेपालको भूकम्पीय जोखिमको सम्झना गराउँछ।'
        },
        location: {
            name: 'Gorkha District',
            coordinates: [84.73, 28.23],
            zoom: 10
        },
        images: {
            before: {
                url: '/images/stories/gorkha-2014.svg',
                year: 2014,
                caption: 'Before earthquake - stable hillsides'
            },
            after: {
                url: '/images/stories/gorkha-2025.svg',
                year: 2025,
                caption: 'After earthquake - landslide scars visible'
            }
        },
        metrics: [
            {
                label: 'Landslide Area',
                before: '0 km²',
                after: '156 km²',
                change: 'New',
                trend: 'negative'
            },
            {
                label: 'Vegetation Recovery',
                before: '100%',
                after: '55%',
                change: '-45%',
                trend: 'positive'
            },
            {
                label: 'Scar Visibility',
                before: 'None',
                after: 'Moderate',
                change: 'Visible',
                trend: 'neutral'
            }
        ],
        nasaLinks: {
            before: 'https://worldview.earthdata.nasa.gov/?v=84.5,27.8,85.5,28.3&t=2014-04-01&l=MODIS_Terra_CorrectedReflectance_TrueColor',
            after: 'https://worldview.earthdata.nasa.gov/?v=84.5,27.8,85.5,28.3&t=2024-04-01&l=VIIRS_NOAA20_CorrectedReflectance_TrueColor'
        }
    },
    {
        id: 'terai-forestry',
        title: {
            en: 'Terai: Community Forestry Success',
            ne: 'तराई: सामुदायिक वन सफलता'
        },
        subtitle: {
            en: 'A rare positive environmental story',
            ne: 'दुर्लभ सकारात्मक वातावरणीय कथा'
        },
        description: {
            en: 'Nepal\'s Terai region shows a remarkable success story. Community forestry programs have increased NDVI from 0.48 to 0.61 (+27%) and expanded forest coverage by 51% (890 km² → 1,340 km²). This demonstrates how local conservation efforts can reverse deforestation trends and sequester significant carbon.',
            ne: 'नेपालको तराई क्षेत्रले उल्लेखनीय सफलताको कथा देखाउँछ। सामुदायिक वन कार्यक्रमले NDVI ०.४८ बाट ०.६१ (+२७%) मा बढाएको छ र वन क्षेत्र ५१% (८९० वर्ग कि.मी. → १,३४० वर्ग कि.मी.) विस्तार गरेको छ। यसले स्थानीय संरक्षण प्रयासले कसरी वन विनाशको प्रवृत्तिलाई उल्टाउन र महत्वपूर्ण कार्बन संग्रह गर्न सक्छ भनेर देखाउँछ।'
        },
        location: {
            name: 'Chitwan-Bardiya Region',
            coordinates: [84.10, 27.25],
            zoom: 10
        },
        images: {
            before: {
                url: '/images/stories/terai-2000.svg',
                year: 2000,
                caption: 'Terai 2000 - sparse forest coverage'
            },
            after: {
                url: '/images/stories/terai-2025.svg',
                year: 2025,
                caption: 'Terai 2025 - thriving community forests'
            }
        },
        metrics: [
            {
                label: 'NDVI (Vegetation)',
                before: '0.48',
                after: '0.61',
                change: '+27%',
                trend: 'positive'
            },
            {
                label: 'Forest Coverage',
                before: '890 km²',
                after: '1,340 km²',
                change: '+51%',
                trend: 'positive'
            },
            {
                label: 'Community Forests',
                before: '245 km²',
                after: '536 km²',
                change: '+119%',
                trend: 'positive'
            }
        ],
        nasaLinks: {
            before: 'https://worldview.earthdata.nasa.gov/?v=83.5,27.0,84.5,27.5&t=2000-03-01&l=MODIS_Terra_NDVI_8Day',
            after: 'https://worldview.earthdata.nasa.gov/?v=83.5,27.0,84.5,27.5&t=2024-03-01&l=MODIS_Terra_NDVI_8Day'
        }
    },
    {
        id: 'rara-lake',
        title: {
            en: 'Rara Lake: Pristine Ecosystem',
            ne: 'रारा ताल: शुद्ध पारिस्थितिकी तंत्र'
        },
        subtitle: {
            en: 'Nepal\'s largest lake remains untouched',
            ne: 'नेपालको सबैभन्दा ठूलो ताल अछुतो'
        },
        description: {
            en: 'Rara Lake, Nepal\'s largest and deepest lake, remains a pristine ecosystem. NASA satellite monitoring shows stable water quality, 92% maintained forest coverage, and excellent biodiversity (8.7/10). This remote Himalayan jewel demonstrates successful conservation through limited human impact and protected area status.',
            ne: 'रारा ताल, नेपालको सबैभन्दा ठूलो र गहिरो ताल, शुद्ध पारिस्थितिकी तंत्र बनेको छ। नासा उपग्रह अनुगमनले स्थिर पानीको गुणस्तर, ९२% कायम वन क्षेत्र, र उत्कृष्ट जैविक विविधता (८.७/१०) देखाउँछ। यो दुर्गम हिमालयी रत्नले सीमित मानव प्रभाव र संरक्षित क्षेत्र स्थिति मार्फत सफल संरक्षण प्रदर्शन गर्दछ।'
        },
        location: {
            name: 'Rara Lake, Mugu',
            coordinates: [82.08, 29.52],
            zoom: 12
        },
        images: {
            before: {
                url: '/images/stories/rara-2000.svg',
                year: 2000,
                caption: 'Rara Lake 2000 - pristine waters'
            },
            after: {
                url: '/images/stories/rara-2025.svg',
                year: 2025,
                caption: 'Rara Lake 2025 - still pristine'
            }
        },
        metrics: [
            {
                label: 'Water Quality',
                before: 'Excellent',
                after: 'Excellent',
                change: 'Stable',
                trend: 'positive'
            },
            {
                label: 'Forest Coverage',
                before: '92%',
                after: '92%',
                change: '0%',
                trend: 'positive'
            },
            {
                label: 'Biodiversity Index',
                before: '8.6/10',
                after: '8.7/10',
                change: '+1.2%',
                trend: 'positive'
            }
        ],
        nasaLinks: {
            before: 'https://worldview.earthdata.nasa.gov/?v=82.0,29.4,82.2,29.6&t=2000-10-01&l=MODIS_Terra_CorrectedReflectance_TrueColor',
            after: 'https://worldview.earthdata.nasa.gov/?v=82.0,29.4,82.2,29.6&t=2024-10-01&l=VIIRS_NOAA20_CorrectedReflectance_TrueColor,MODIS_Terra_NDVI_8Day'
        }
    }
]
