import { EligibilityFormData, EligibilityResult } from "./types";

export function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}

export function formatCurrency(amount: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function calculateEligibility(data?: EligibilityFormData | any): EligibilityResult {
  const gpa = data?.gpaOrPercentage || "";
  let baseScore = 85;

  if (gpa.includes("85") || gpa.includes("9") || gpa.includes("3.8")) {
    baseScore = 95;
  } else if (gpa.includes("75") || gpa.includes("8") || gpa.includes("3.5")) {
    baseScore = 88;
  } else if (gpa.includes("60") || gpa.includes("3.0")) {
    baseScore = 78;
  } else if (gpa.includes("50")) {
    baseScore = 68;
  }

  let ratingTier: EligibilityResult["ratingTier"] = "High Chance";
  if (baseScore >= 90) ratingTier = "Exceptional";
  else if (baseScore >= 80) ratingTier = "High Chance";
  else if (baseScore >= 70) ratingTier = "Moderate";
  else ratingTier = "Needs Strategy";

  const targetCountry = data?.targetCountry || "United Kingdom";

  return {
    scorePercentage: baseScore,
    ratingTier,
    matchedUniversities: [
      {
        name: targetCountry === "United States" ? "Northeastern University" : "University of Leeds",
        country: targetCountry,
        matchType: "Target",
        avgTuition: "£16,500 / yr",
        chance: 92,
      },
      {
        name: targetCountry === "United States" ? "New York University" : "University of Manchester",
        country: targetCountry,
        matchType: "Ambitious",
        avgTuition: "£22,000 / yr",
        chance: 78,
      },
      {
        name: targetCountry === "United States" ? "Arizona State University" : "Coventry University",
        country: targetCountry,
        matchType: "Safe",
        avgTuition: "£14,000 / yr",
        chance: 98,
      },
    ],
    pswEligibility: "2 to 3 Years Post-Study Work Visa Guaranteed",
    estimatedScholarship: baseScore >= 85 ? "$5,000 - $15,000 Merit Award" : "$2,000 - $5,000 Bursary",
    visaSuccessProbability: baseScore >= 80 ? 98 : 88,
    recommendations: [
      "Eligible for direct admission to Tier-1 partner universities.",
      "High probability for merit scholarships and fee waivers.",
      "Fast-track consular visa filing with authenticated sponsor financial documents.",
    ],
  };
}
