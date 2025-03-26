import { useState } from "react";
import { useEVFleet } from "../context/EVFleetProvider";

const ElectricityCostEstimator = () => {
  const { insights } = useEVFleet(); // Access global fleet data including total energy demand
  const [tariff, setTariff] = useState(0.20); // Initial tariff value, assuming default contract rate

  // Parse slider value into a float before storing it to avoid string math issues later
  const handleChange = (e) => setTariff(parseFloat(e.target.value));

  // Real-time cost estimation based on total fleet consumption and user-defined tariff
  const estimatedCost = insights.totalEnergyDemand * tariff;

  return (
    <>
      <div className="ev-summary-separator" />

      <div className="cost-estimator">
        <div className="cost-estimator-header">
          <label htmlFor="tariff-slider">
            Electricity Tariff
          </label>
          <span>{tariff.toFixed(2)} £/kWh</span>
        </div>

        <input
          id="tariff-slider"
          type="range"
          min="0.02"        
          max="0.50"        
          step="0.01"       
          value={tariff}
          onChange={handleChange}
        />

        <div className="estimated-cost">
          <span><strong>Estimated Daily Cost</strong></span>
          <span><strong>{estimatedCost.toFixed(2)} £</strong></span>
        </div>
      </div>
    </>
  );
};

export default ElectricityCostEstimator;
