const express = require("express");
const cors = require("cors");

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

/**
 * Function to calculate fleet statistics based on EV details.
 * @param {Array} evs - List of electric vehicles with their specifications.
 * @returns {Object} Fleet statistics including total energy demand and per-vehicle insights.
 */
const calculateFleetStats = (evs) => {
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

// API Route to receive EV fleet details and return calculated insights
app.post("/calculate", (req, res) => {
  const { evs } = req.body;

  // Validate input: Ensure we receive an array
  if (!Array.isArray(evs)) {
    return res.status(400).json({ error: "Invalid input" });
  }

  // Perform calculations and return results
  const result = calculateFleetStats(evs);
  res.json(result);
});

// Start the server and listen on PORT 5001
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
