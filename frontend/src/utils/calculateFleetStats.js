/**
 * Calculates fleet statistics from a list of EVs.
 * @param {Array} evs - Electric vehicles
 * @returns {Object} Fleet stats
 */
export const calculateFleetStats = (evs) => {
  let totalEnergyDemand = 0;

  const results = evs.map((ev) => {
    const dailyEnergyConsumption = ev.avgMileage / ev.efficiency;
    const batteryUsagePercent = (dailyEnergyConsumption / ev.battery) * 100;
    const chargingTimeStandard = (0.6 * ev.battery) / ev.chargingPower;
    const chargingTimeAfterUse = dailyEnergyConsumption / ev.chargingPower;

    totalEnergyDemand += dailyEnergyConsumption * ev.count;

    return {
      id: ev.id,
      count: ev.count,
      dailyEnergyConsumption,
      batteryUsagePercent,
      chargingTimeStandard,
      chargingTimeAfterUse,
    };
  });

  return { results, totalEnergyDemand };
};
