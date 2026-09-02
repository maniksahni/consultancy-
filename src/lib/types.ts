export interface Destination {
  id: string;
  name: string;
  slug: string;
  flag: string;
  tagline: string;
  image: string;
  avgTuition: string;
  livingCost: string;
  pswRights: string; // Post study work rights
  visaRate: string;
  processingTime: string;
  intakes: string[];
  minIelts: string;
  currency: string;
  popularDegrees: string[];
  topUniversities: {
    name: string;
    ranking: string;
    acceptanceRate: string;
    location: string;
    avgFee: string;
    badge?: string;
  }[];
  keyBenefits: string[];
  visaRequirements: string[];
  workPermitRules: string;
  highlightStat: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  icon: string;
  badge?: string;
  features: string[];
  metrics: string;
  deliverables: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  avatar: string;
  course: string;
  university: string;
  universityLogo?: string;
  destinationCountry: string;
  flag: string;
  originCountry: string;
  visaType: string;
  visaGrantedDate: string;
  turnaroundDays: number;
  scholarshipAmount?: string;
  rating: number;
  reviewDate: string;
  quote: string;
  verificationBadge: string;
}

export interface ProcessStep {
  stepNumber: number;
  title: string;
  subtitle: string;
  duration: string;
  description: string;
  icon: string;
  checklist: string[];
  proTip: string;
  badge: string;
}

export interface PortalStudent {
  id: string;
  name: string;
  email: string;
  phone: string;
  targetCountry: string;
  targetIntake: string;
  targetDegree: string;
  applicationId: string;
  overallProgress: number;
  assignedCounsellor: {
    name: string;
    role: string;
    avatar: string;
    email: string;
    phone: string;
    rating: number;
    alumniOf: string;
    activeCases: number;
  };
  stages: {
    id: number;
    title: string;
    status: 'completed' | 'in_progress' | 'pending';
    updatedAt: string;
    actionRequired?: string;
  }[];
  documents: {
    id: string;
    name: string;
    category: 'Academic' | 'Identity' | 'Financial' | 'Language';
    status: 'verified' | 'under_review' | 'required' | 'action_needed';
    uploadedAt?: string;
    fileSize?: string;
    notes?: string;
  }[];
  applications: {
    university: string;
    program: string;
    country: string;
    status: 'Offer Letter Received' | 'Under Review' | 'Submitted' | 'Visa Approved';
    statusColor: string;
    scholarshipAwarded?: string;
    deadline: string;
  }[];
}

export interface EligibilityFormData {
  educationLevel: string;
  gpaOrPercentage: string;
  fieldOfStudy: string;
  backlogs: string;
  englishTest: string;
  englishScore: string;
  targetCountry: string;
  targetIntake: string;
  budgetPerYear: string;
  fullName: string;
  email: string;
  whatsappNumber: string;
  countryCode: string;
}

export interface EligibilityResult {
  scorePercentage: number;
  ratingTier: 'Exceptional' | 'High Chance' | 'Moderate' | 'Needs Strategy';
  matchedUniversities: {
    name: string;
    country: string;
    matchType: 'Ambitious' | 'Target' | 'Safe';
    avgTuition: string;
    chance: number;
  }[];
  pswEligibility: string;
  estimatedScholarship: string;
  visaSuccessProbability: number;
  recommendations: string[];
}

export interface Scholarship {
  id: string;
  name: string;
  country: string;
  amount: string;
  eligibility: string;
  deadline: string;
  level: string;
  coverage: string;
  tag: string;
}
