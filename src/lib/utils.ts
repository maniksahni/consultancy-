import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { EligibilityFormData, EligibilityResult } from "./types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function calculateEligibility(data: EligibilityFormData): EligibilityResult {
  let baseScore = 70;
  
  // GPA factor
  const gpa = parseFloat(data.gpaOrPercentage) || 70;
  if (gpa >= 85 || gpa >= 3.6) baseScore += 18;
  else if (gpa >= 75 || gpa >= 3.0) baseScore += 12;
  else if (gpa >= 60 || gpa >= 2.6) baseScore += 5;
  else baseScore -= 10;

  // English test factor
  if (data.englishTest !== 'Not Given') {
    const score = parseFloat(data.englishScore) || 6.5;
    if (score >= 7.5 || score >= 75 || score >= 120) baseScore += 10;
    else if (score >= 6.5 || score >= 60 || score >= 105) baseScore += 6;
  } else {
    baseScore -= 5;
  }

  // Backlogs
  const backlogs = parseInt(data.backlogs) || 0;
  if (backlogs === 0) baseScore += 5;
  else if (backlogs > 4) baseScore -= 12;

  const finalScore = Math.min(Math.max(baseScore, 58), 98);

  let ratingTier: 'Exceptional' | 'High Chance' | 'Moderate' | 'Needs Strategy' = 'High Chance';
  if (finalScore >= 90) ratingTier = 'Exceptional';
  else if (finalScore >= 78) ratingTier = 'High Chance';
  else if (finalScore >= 65) ratingTier = 'Moderate';
  else ratingTier = 'Needs Strategy';

  const country = data.targetCountry || 'USA';

  const universityPools: Record<string, EligibilityResult['matchedUniversities']> = {
    USA: [
      { name: "Northeastern University", country: "USA", matchType: "Target", avgTuition: "$38,000/yr", chance: 88 },
      { name: "Columbia University (Ivy League)", country: "USA", matchType: "Ambitious", avgTuition: "$54,000/yr", chance: 64 },
      { name: "Arizona State University", country: "USA", matchType: "Safe", avgTuition: "$31,000/yr", chance: 96 },
    ],
    UK: [
      { name: "University of Manchester", country: "UK", matchType: "Target", avgTuition: "£24,500/yr", chance: 90 },
      { name: "Imperial College London", country: "UK", matchType: "Ambitious", avgTuition: "£36,000/yr", chance: 68 },
      { name: "University of Leeds", country: "UK", matchType: "Safe", avgTuition: "£21,000/yr", chance: 95 },
    ],
    Canada: [
      { name: "University of Waterloo", country: "Canada", matchType: "Target", avgTuition: "CAD 34,000/yr", chance: 86 },
      { name: "University of Toronto", country: "Canada", matchType: "Ambitious", avgTuition: "CAD 46,000/yr", chance: 65 },
      { name: "York University", country: "Canada", matchType: "Safe", avgTuition: "CAD 26,000/yr", chance: 94 },
    ],
    Australia: [
      { name: "University of Melbourne", country: "Australia", matchType: "Ambitious", avgTuition: "AUD 44,000/yr", chance: 72 },
      { name: "Monash University (Go8)", country: "Australia", matchType: "Target", avgTuition: "AUD 38,000/yr", chance: 91 },
      { name: "Deakin University", country: "Australia", matchType: "Safe", avgTuition: "AUD 30,000/yr", chance: 97 },
    ],
    Germany: [
      { name: "Technical University of Munich (TUM)", country: "Germany", matchType: "Ambitious", avgTuition: "€0 (Tuition-Free)", chance: 70 },
      { name: "RWTH Aachen University", country: "Germany", matchType: "Target", avgTuition: "€0 (Tuition-Free)", chance: 89 },
      { name: "TU Berlin", country: "Germany", matchType: "Safe", avgTuition: "€0 (Tuition-Free)", chance: 94 },
    ],
    Ireland: [
      { name: "Trinity College Dublin", country: "Ireland", matchType: "Ambitious", avgTuition: "€22,000/yr", chance: 75 },
      { name: "University College Dublin (UCD)", country: "Ireland", matchType: "Target", avgTuition: "€19,500/yr", chance: 90 },
      { name: "National University of Ireland Galway", country: "Ireland", matchType: "Safe", avgTuition: "€16,000/yr", chance: 96 },
    ],
  };

  const pswMap: Record<string, string> = {
    USA: "Up to 3 Years STEM OPT Work Permit (F-1 Visa)",
    UK: "2 Years Graduate Route Post-Study Work Visa",
    Canada: "Up to 3 Years Post-Graduation Work Permit (PGWP)",
    Australia: "2 to 4 Years Temporary Graduate Visa (Subclass 485)",
    Germany: "18-Month Post-Study Jobseeker Residence Permit",
    Ireland: "24-Month Third Level Graduate Scheme (Stamp 1G)",
  };

  const scholarshipEst = finalScore > 85 ? "$10,000 - $25,000 Merit Fellowship" : "$4,000 - $12,000 International Grant";

  return {
    scorePercentage: finalScore,
    ratingTier,
    matchedUniversities: universityPools[country] || universityPools.USA,
    pswEligibility: pswMap[country] || "2-3 Years Post-Study Work Authorization",
    estimatedScholarship: scholarshipEst,
    visaSuccessProbability: Math.min(finalScore + 3, 99),
    recommendations: [
      `Target ${data.targetIntake || 'Upcoming'} Intake priority application deadline to maximize scholarship allocation.`,
      `Tailor SOP with high-impact research / project portfolio for ${country} tier-1 universities.`,
      `Financial profile meets standard embassy proof-of-funds criteria with 0% collateral loan eligibility.`,
      `Book a 1-on-1 strategy call with our certified ex-visa officer for application fee waivers.`
    ]
  };
}
