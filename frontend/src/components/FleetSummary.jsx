import { useEVFleet } from "../context/EVFleetProvider";

// Centralized mapping of displayed metrics makes the layout easy to update or reorder
// Keeps the render logic clean and decoupled from specific EV field names
const fieldMappings = [
  { label: "Number of EVs", key: "count", decimals: 0 },
  { label: "Daily Energy Consumption per EV", key: "dailyEnergyConsumption", unit: "kWh" },
  { label: "Battery Consumed Daily", key: "batteryUsagePercent", unit: "% per day" },
  { label: "Daily Recharge Time Needed", key: "chargingTimeAfterUse", unit: "hours" },
  { label: "Charging Time (20% → 80%)", key: "chargingTimeStandard", unit: "hours" },
];

const FleetSummary = () => {
  const { insights } = useEVFleet(); // Pulls precomputed fleet-wide insights from shared state

  return (
    <div className="fleet-summary">
      <h2>Total Daily Energy Demand</h2>
      <p className="total-energy-value">{insights.totalEnergyDemand.toFixed(2)} kWh</p>

      {/* Iterates over each EV type separately for easier visual comparisons between vehicle types */}
      {insights.results.map((ev, index) => (
        <div key={ev.id} className="ev-summary">
          <div className="ev-summary-separator" />
          <h3 className="ev-card-title">EV type {index + 1}</h3>

          {/* Uses consistent layout structure and formatting for each stat line */}
          {/* Defensive handling for non-numeric values avoids UI breakage if backend changes */}
          {fieldMappings.map(({ label, key, unit, decimals }) => (
            <div key={key} className="ev-summary-row">
              <span>{label}</span>
              <span>
                {typeof ev[key] === "number"
                  ? ev[key].toFixed(decimals ?? 2) // Defaults to 2 decimal places if not specified
                  : ev[key]} {unit || ""}
              </span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default FleetSummary;
