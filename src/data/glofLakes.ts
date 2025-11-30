/**
 * GLOF Warning Data
 * 5 High-risk glacial lakes in Nepal
 */

export interface GLOFLake {
    id: string
    name: {
        en: string
        ne: string
    }
    coordinates: [number, number] // [lng, lat]
    riskLevel: 'critical' | 'high' | 'medium'
    lakeArea: number // km²
    expansionRate: number // km²/year
    downstreamPopulation: number
    lastAssessment: string
    description: {
        en: string
        ne: string
    }
}

export const glofLakes: GLOFLake[] = [
    {
        id: 'imja-tsho',
        name: {
            en: 'Imja Tsho',
            ne: 'इम्जा त्सो'
        },
        coordinates: [86.9246, 27.8958],
        riskLevel: 'critical',
        lakeArea: 1.35,
        expansionRate: 0.018,
        downstreamPopulation: 50000,
        lastAssessment: '2024-10',
        description: {
            en: 'Rapidly expanding glacial lake in Everest region. Lake has grown 50% since 2000, posing critical GLOF risk to downstream communities including Dingboche and Namche Bazaar.',
            ne: 'सगरमाथा क्षेत्रमा द्रुत रूपमा विस्तार हुँदै गरेको हिमताल। ताल २००० देखि ५०% बढेको छ, दिङबोचे र नाम्चे बजार सहित तलका समुदायहरूलाई गम्भीर GLOF जोखिम।'
        }
    },
    {
        id: 'tsho-rolpa',
        name: {
            en: 'Tsho Rolpa',
            ne: 'त्सो रोल्पा'
        },
        coordinates: [86.4667, 28.5333],
        riskLevel: 'high',
        lakeArea: 1.65,
        expansionRate: 0.012,
        downstreamPopulation: 100000,
        lastAssessment: '2024-09',
        description: {
            en: 'Nepal\'s largest and most dangerous glacial lake. Despite mitigation efforts (outlet lowering in 2000), continued expansion maintains high GLOF risk to Rolwaling Valley.',
            ne: 'नेपालको सबैभन्दा ठूलो र खतरनाक हिमताल। न्यूनीकरण प्रयासहरू (२००० मा आउटलेट तल्लो पारिएको) बावजुद, निरन्तर विस्तारले रोल्वालिङ उपत्यकामा उच्च GLOF जोखिम कायम राखेको छ।'
        }
    },
    {
        id: 'thulagi',
        name: {
            en: 'Thulagi',
            ne: 'थुलागी'
        },
        coordinates: [84.3167, 28.6167],
        riskLevel: 'high',
        lakeArea: 0.82,
        expansionRate: 0.015,
        downstreamPopulation: 30000,
        lastAssessment: '2024-08',
        description: {
            en: 'Fast-growing lake in Manaslu region. Rapid glacier retreat has caused 80% expansion since 2000. Threatens Budi Gandaki valley and hydropower projects.',
            ne: 'मनास्लु क्षेत्रमा द्रुत रूपमा बढ्दो ताल। द्रुत हिमनदी पछाडि हटाइले २००० देखि ८०% विस्तार भएको छ। बुढी गण्डकी उपत्यका र जलविद्युत परियोजनाहरूलाई खतरा।'
        }
    },
    {
        id: 'lower-barun',
        name: {
            en: 'Lower Barun',
            ne: 'तल्लो बरुण'
        },
        coordinates: [87.0833, 27.7167],
        riskLevel: 'medium',
        lakeArea: 0.65,
        expansionRate: 0.008,
        downstreamPopulation: 20000,
        lastAssessment: '2024-07',
        description: {
            en: 'Emerging threat in Makalu-Barun region. Moderate expansion rate but unstable moraine dam. Monitoring increased after 2017 assessment upgrade.',
            ne: 'मकालु-बरुण क्षेत्रमा उभरिरहेको खतरा। मध्यम विस्तार दर तर अस्थिर मोरेन बाँध। २०१७ मूल्याङ्कन स्तरवृद्धि पछि अनुगमन बढाइएको।'
        }
    },
    {
        id: 'lumding',
        name: {
            en: 'Lumding',
            ne: 'लुम्डिङ'
        },
        coordinates: [86.5833, 28.1167],
        riskLevel: 'medium',
        lakeArea: 0.48,
        expansionRate: 0.006,
        downstreamPopulation: 15000,
        lastAssessment: '2024-06',
        description: {
            en: 'Medium-risk lake in Khumbu region. Slower expansion but proximity to trekking routes and settlements requires continued monitoring.',
            ne: 'खुम्बु क्षेत्रमा मध्यम जोखिम ताल। ढिलो विस्तार तर ट्रेकिङ मार्ग र बस्तीहरूको निकटताले निरन्तर अनुगमन आवश्यक छ।'
        }
    }
]

export const getRiskLevelColor = (level: 'critical' | 'high' | 'medium'): string => {
    switch (level) {
        case 'critical':
            return '#ef4444' // red-500
        case 'high':
            return '#f59e0b' // amber-500
        case 'medium':
            return '#eab308' // yellow-500
    }
}

export const getRiskLevelLabel = (level: 'critical' | 'high' | 'medium', language: 'en' | 'ne'): string => {
    if (language === 'ne') {
        switch (level) {
            case 'critical':
                return 'गम्भीर'
            case 'high':
                return 'उच्च'
            case 'medium':
                return 'मध्यम'
        }
    }
    return level.charAt(0).toUpperCase() + level.slice(1)
}
