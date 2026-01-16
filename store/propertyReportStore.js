import { create } from "zustand";

export const usePropertyReportStore = create((set, get) => ({
  // Form 1: Property Details
  propertyDetails: {
    projectName: "The Weave, JVC",
    builder: "Al Ghurair",
    apartment: "2 BHK",
    bedroom: 2,
    area: 1197,
    price: 1197013,
    pricePerSqft: 1000,
  },

  // Form 2: Payment Timeline
  paymentTimeline: [
    { date: "Oct 25", step: 1, percent: 5, amount: 61250, status: "default" },
    { date: "Nov 25", step: 2, percent: 15, amount: 183750, status: "default" },
    { date: "Jan 26", step: 3, percent: 25, amount: 122500, status: "default" },
    { date: "Jan 26", step: 4, percent: 35, amount: 122500, status: "green" },
    { date: "Jan 26", step: 5, percent: 45, amount: 122500, status: "green" },
    { date: "Jan 26", step: 6, percent: 55, amount: 122500, status: "green" },
    { date: "Jan 26", step: 7, percent: 65, amount: 122500, status: "key" },
    { date: "Jan 26", step: 8, percent: 100, amount: 122500, status: "flag" },
  ],

  // Form 3: Rating & Exit Strategies
  rating: 7.5,
  exitStrategies: {
    moderate: {
      label: "Moderate",
      roi: "8.5%",
      exitYear: 5,
      exitPrice: 1350000,
    },
    conservative: {
      label: "Conservative",
      roi: "5.2%",
      exitYear: 7,
      exitPrice: 1280000,
    },
    optimistic: {
      label: "Optimistic",
      roi: "12.3%",
      exitYear: 3,
      exitPrice: 1450000,
    },
  },

  // Form 4: Breakdown
  breakdown: {
    propertyPrice: 1197013,
    registrationFees: 35910,
    agentCommission: 59850,
    otherCharges: 15000,
    netTotal: 1197013,
  },

  // Metadata
  generatedBy: "Arpit Aryan Gupta",
  generatedDate: new Date().toLocaleDateString("en-GB"),

  // Actions
  updatePropertyDetails: (details) =>
    set((state) => ({
      propertyDetails: { ...state.propertyDetails, ...details },
    })),

  updatePaymentTimeline: (timeline) =>
    set({ paymentTimeline: timeline }),

  updateRating: (rating) =>
    set({ rating: Math.min(10, Math.max(0, rating)) }),

  updateExitStrategies: (strategies) =>
    set((state) => ({
      exitStrategies: { ...state.exitStrategies, ...strategies },
    })),

  updateBreakdown: (breakdown) =>
    set((state) => ({
      breakdown: { ...state.breakdown, ...breakdown },
    })),

  // Calculate derived values
  calculateRating: (params) => {
    const { locationScore, amenitiesScore, priceScore, developmentScore } = params;
    const rating = (locationScore + amenitiesScore + priceScore + developmentScore) / 4;
    set({ rating: Math.min(10, Math.max(0, rating)) });
  },

  // Sync payment timeline with form changes
  syncPaymentTimeline: (newTimeline) => {
    set({ paymentTimeline: newTimeline });
  },

  // Get all data for PDF
  getPdfData: () => get(),
}));
