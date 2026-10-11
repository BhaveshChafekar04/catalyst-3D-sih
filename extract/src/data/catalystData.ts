export interface CommunityProblem {
  id: string;
  title: string;
  category: 'Environment & Water' | 'Clean Energy' | 'Urban Mobility' | 'Agriculture & Soil' | 'Public Health';
  location: string;
  coordinates: string;
  affectedPopulation: string;
  summary: string;
  fullDescription: string;
  image: string;
  status: 'Decomposed' | 'Lab Matched' | 'Prototyping' | 'Field Deployed';
  leadInstitution: string;
  studentTeamSize: number;
  industrySponsor: string;
  impactMetric: string;
  urgency: 'Critical' | 'High' | 'Strategic';
  timeline: string;
}

export const COMMUNITY_PROBLEMS: CommunityProblem[] = [
  {
    id: 'prob-water-01',
    title: 'River Basin Micro-Pollutant Detection & Community Filtration',
    category: 'Environment & Water',
    location: 'Sacramento Watershed, Northern California',
    coordinates: '38.5816° N, 121.4944° W',
    affectedPopulation: '62,000 residents across 4 agricultural districts',
    summary: 'Autonomous optical sensor telemetry identifying agricultural runoff nitrates and organophosphate spikes prior to municipal intake channels.',
    fullDescription: 'Seasonal agricultural runoff frequently exceeds safe threshold levels during early spring storms, overwhelming standard municipal filters. Catalyst deployed a multi-stage initiative bringing together UC Davis Hydrology, student sensor teams, and regional water district engineers to build real-time fluorometric probes and passive bio-char filtration columns.',
    image: '/src/assets/images/urban_water_sensor_1791563391292.jpg',
    status: 'Field Deployed',
    leadInstitution: 'UC Davis College of Agricultural & Environmental Sciences',
    studentTeamSize: 8,
    industrySponsor: 'Hydrolabs Sensor Tech & California Water Board',
    impactMetric: '94.2% detection lead time improvement (from 48h lab delay to 90s telemetry)',
    urgency: 'Critical',
    timeline: 'Phase 3: 4 Active Sensor Stations Live'
  },
  {
    id: 'prob-energy-02',
    title: 'Community Municipal Rooftop Microgrid & Resilient Storage',
    category: 'Clean Energy',
    location: 'Denver Metro East Urban Corridor, Colorado',
    coordinates: '39.7392° N, 104.9903° W',
    affectedPopulation: '18,500 low-income apartment dwellers & senior centers',
    summary: 'Distributed rooftop solar arrays linked to shared lithium iron phosphate battery banks, shielding vulnerable residents from grid brownouts.',
    fullDescription: 'Extreme weather volatility regularly triggers peak-demand blackouts during high summer heatwaves. Catalyst structured a multi-partner project uniting Colorado School of Mines, graduate power systems students, municipal housing authorities, and renewable storage manufacturers.',
    image: '/src/assets/images/community_solar_microgrid_1791563402614.jpg',
    status: 'Field Deployed',
    leadInstitution: 'Colorado School of Mines Renewable Energy Institute',
    studentTeamSize: 12,
    industrySponsor: 'SolarGrid Innovations & Mile High Municipal Trust',
    impactMetric: '2.4 MW decentralized capacity deployed; 0 brownout outages during July heat peak',
    urgency: 'High',
    timeline: 'Operational: 14 Municipal Roofs Connected'
  },
  {
    id: 'prob-transit-03',
    title: 'On-Demand Autonomous Electric Transit for Medical & Grocery Access',
    category: 'Urban Mobility',
    location: 'Maplewood & North King County, Washington',
    coordinates: '47.4829° N, 122.2037° W',
    affectedPopulation: '34,000 residents in transit desert zones',
    summary: 'Flexible zero-emission feeder shuttles synchronized with regional hospital routes and essential grocery distribution hubs.',
    fullDescription: 'Suburban development patterns isolated non-driving seniors and shift workers from primary health clinics and nutritious grocers. University of Washington urban mobility researchers collaborated with student software designers to synthesize ridership telemetry and route optimization.',
    image: '/src/assets/images/smart_transit_rural_1791563415100.jpg',
    status: 'Prototyping',
    leadInstitution: 'University of Washington Urban Freight & Transit Lab',
    studentTeamSize: 9,
    industrySponsor: 'Pacific Mobility Dynamics & Metro Regional Transit',
    impactMetric: '68% decrease in missed medical appointments across pilot cohort',
    urgency: 'High',
    timeline: 'Phase 2: 6 Electric Shuttles Active in Pilot'
  },
  {
    id: 'prob-soil-04',
    title: 'Precision Soil Regeneration & Runoff Drone Mapping',
    category: 'Agriculture & Soil',
    location: 'Willamette Valley Agricultural Co-op, Oregon',
    coordinates: '44.9429° N, 123.0351° W',
    affectedPopulation: '140 independent family farms & regional downstream fisheries',
    summary: 'Autonomous multispectral drone imagery and ground soil moisture arrays providing predictive nutrient management to prevent topsoil loss.',
    fullDescription: 'Heavy winter rains cause irreversible topsoil erosion and downstream sediment deposition in salmon habitats. Oregon State University agricultural robotics students partnered with local farming cooperatives to deploy automated drone flight corridors that map moisture dynamics in sub-meter detail.',
    image: '/src/assets/images/soil_regeneration_drone_1791563425960.jpg',
    status: 'Lab Matched',
    leadInstitution: 'Oregon State University Center for Agriculture & Robotics',
    studentTeamSize: 6,
    industrySponsor: 'TerraSense Systems & Willamette Valley Growers Guild',
    impactMetric: '31% reduction in synthetic nitrogen application; 1,800 tons topsoil preserved',
    urgency: 'Strategic',
    timeline: 'Phase 1: 1,400 Hectares Mapped'
  }
];

export const ECOSYSTEM_STAKEHOLDERS = {
  problems: {
    title: 'PROBLEMS',
    tagline: 'Discover Community Challenges',
    description: 'Real-world civic dilemmas, environmental bottlenecks, and public health inequities submitted by verified community leaders, non-profits, and municipal bodies.',
    keyStats: '240+ Active Problem Submissions',
    highlights: [
      'Structured intake protocol converting unstructured complaints into rigorous technical RFPs',
      'Geospatial and demographic verification of affected populations',
      'Open problem ledger with community voting and urgency ranking'
    ]
  },
  universities: {
    title: 'UNIVERSITIES',
    tagline: 'Connect Research & Specialized Labs',
    description: 'Top research universities integrate Catalyst challenges directly into capstone courses, doctoral research programs, and specialized academic laboratories.',
    keyStats: '38 Participating Universities & Institutes',
    highlights: [
      'Direct pipeline from academic literature to empirical real-world field trials',
      'Faculty mentorship credited toward public-impact tenure milestones',
      'Inter-institutional research sharing with open intellectual property frameworks'
    ]
  },
  students: {
    title: 'STUDENTS',
    tagline: 'Build Multidisciplinary Teams',
    description: 'Undergraduate and graduate students team up across engineering, public policy, product design, and biology to solve tangible challenges.',
    keyStats: '14,200+ Student Builders Engaged',
    highlights: [
      'Hands-on portfolio projects deployed directly into actual communities',
      'Mentorship from corporate technical fellows and civic leaders',
      'Fast-track talent recruitment from partner industry sponsors'
    ]
  },
  industry: {
    title: 'INDUSTRY',
    tagline: 'Enable Technology, Funding & Implementation',
    description: 'Corporate partners provide hardware grants, cloud computing credits, executive mentorship, and direct scale funding to take verified prototypes to production.',
    keyStats: '$18.4M Direct Infrastructure Funding',
    highlights: [
      'Strategic ESG alignment with measurable, auditable community outcomes',
      'De-risked technical R&D through university-tested prototypes',
      'Direct deployment partnerships with municipal procurement offices'
    ]
  },
  impact: {
    title: 'IMPACT',
    tagline: 'Track Progress & Measurable Outcomes',
    description: 'Transparent telemetry dashboards measure emissions reduced, clean gallons delivered, commute hours saved, and lives improved with tamper-proof auditing.',
    keyStats: '100% Open Data & Auditable Outcomes',
    highlights: [
      'Continuous sensor telemetry and longitudinal post-deployment surveys',
      'Open-source blueprints published for global replication in peer cities',
      'Municipal hand-off protocols ensuring 10+ year operational longevity'
    ]
  }
};

export const PROCESS_STEPS = [
  {
    step: '01',
    title: 'PROBLEM',
    subtitle: 'Ground Truth Intake',
    detail: 'Community members, municipal officials, and grassroots organizations document hyper-local challenges using structured intake forms, geospatial coordinates, and photographic evidence.'
  },
  {
    step: '02',
    title: 'INTELLIGENCE',
    subtitle: 'Systemic AI Decomposition',
    detail: 'Catalyst’s AI models analyze constraints, cross-reference 40+ million academic papers, identify root systemic causes, and decompose complex dilemmas into modular engineering briefs.'
  },
  {
    step: '03',
    title: 'EXPERTISE',
    subtitle: 'Academic Lab Matching',
    detail: 'Automated semantic routing pairs structured briefs with specialized university labs, doctoral researchers, and faculty advisors possessing relevant domain authority.'
  },
  {
    step: '04',
    title: 'COLLABORATION',
    subtitle: 'Multidisciplinary Cohorts',
    detail: 'Cross-functional student teams and industry technology partners receive sprint grants, hardware testbenches, and civic clearances to build working field prototypes.'
  },
  {
    step: '05',
    title: 'IMPACT',
    subtitle: 'Production Civic Scale',
    detail: 'Validated solutions transition into municipal deployment, tracked by longitudinal telemetry, open-source documentation, and transparent impact ledgers.'
  }
];
