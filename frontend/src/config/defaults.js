// Efficiency values for different vehicle types
export const EV_TYPES = {
  Car: { efficiency: 4.5 },
  "Small Van": { efficiency: 3.5 },
  "Large Van": { efficiency: 2.5 },
  HGV: { efficiency: 1.2 },
};

// Default values for new EV cards
export const DEFAULT_EV_TYPE = "Car";

export const getDefaultEV = (type = DEFAULT_EV_TYPE) => ({
  id: Date.now(),
  type,
  count: 1,
  avgMileage: 50,
  battery: 75,
  chargingPower: 7.4,
  efficiency: EV_TYPES[type].efficiency, // Efficiency is based on type
});

// Helper to update efficiency when EV type changes
export const applyTypeDefaults = (ev, newType) => ({
  ...ev,
  type: newType,
  efficiency: EV_TYPES[newType].efficiency,
});
