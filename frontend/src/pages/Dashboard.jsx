import { useEVFleet } from "../context/EVFleetProvider";
import EVCard from "../components/EVCard";
import FleetSummary from "../components/FleetSummary";
import ElectricityCostEstimator from "../components/ElectricityCostEstimator";

const Dashboard = () => {
  const { evs, addEV } = useEVFleet(); // Access global EV list and the function to add a new EV

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-header">
        <h2 className="dashboard-title">EV Fleet Charge Planning Tool</h2>

        {/* Add EV button directly modifies global fleet state via context — keeps UI in sync */}
        <button onClick={addEV}>
          <i className="fas fa-plus"></i> Add EV
        </button>
      </div>
      
      <div className="dashboard">
        <div className="left-panel">
          {/* Render each EVCard dynamically — order and data integrity depend on unique ID */}
          {/* Index is passed optionally for display or accessibility use */}
          {evs.map((ev, index) => (
            <EVCard key={ev.id} ev={ev} index={index} />
          ))}
        </div>

        <div className="right-panel">
          {/* This component reflects computed insights across the whole EV fleet */}
          <FleetSummary />

          {/* Cost estimator is context-aware and updates immediately with slider input */}
          {/* Placed below summary for logical UX flow: consumption → cost */}
          <ElectricityCostEstimator />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
