const Dashboard = () => {
    return (
      <div className="dashboard-wrapper">
        <div className="dashboard-header">
          <h2 className="dashboard-title">EV Fleet Charge Planning Tool</h2>
          <button><i className="fas fa-plus"></i> Add EV</button>
        </div>
  
        <div className="dashboard">
          <div className="left-panel">
            {/* EV cards will go here */}
          </div>
  
          <div className="right-panel">
            {/* FleetSummary + CostEstimator will go here */}
          </div>
        </div>
      </div>
    );
  };
  
  export default Dashboard;
  