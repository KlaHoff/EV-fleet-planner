// Placeholder only – logic will come later
import { createContext, useContext, useState } from "react";

const EVFleetContext = createContext();

export const useEVFleet = () => useContext(EVFleetContext);

export const EVFleetProvider = ({ children }) => {
  const [evs, setEvs] = useState([]);
  const [insights, setInsights] = useState({ totalEnergyDemand: 0, results: [] });

  return (
    <EVFleetContext.Provider value={{ evs, insights }}>
      {children}
    </EVFleetContext.Provider>
  );
};
