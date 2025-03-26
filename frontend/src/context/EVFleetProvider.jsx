import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { EV_TYPES, getDefaultEV, applyTypeDefaults, API_URL } from "../config/defaults";
import { isEVValid } from "../utils/validation";

// Create context to share EV fleet state across the app
const EVFleetContext = createContext();

// Exposes context with a clean hook API for convenience
export const useEVFleet = () => useContext(EVFleetContext);

export const EVFleetProvider = ({ children }) => {
  // Initial state starts with one default EV to avoid an empty UI on load
  const [evs, setEvs] = useState([getDefaultEV()]);

  // Holds calculated insights such as total demand and per-vehicle stats
  const [insights, setInsights] = useState({ totalEnergyDemand: 0, results: [] });

  // Adds a new EV instance by appending a fresh default to the current state
  const addEV = () => setEvs(prev => [...prev, getDefaultEV()]);

  const updateEV = (id, key, value) => {
    setEvs(prev =>
      prev.map(ev =>
        ev.id === id
          ? key === "type"
            // Ensures appropriate efficiency gets applied when switching vehicle type
            ? applyTypeDefaults(ev, value)
            : { ...ev, [key]: value }
          : ev
      )
    );
  };

  // This allows users to remove any EV card from the list using its unique ID
  const removeEV = (id) => {
    setEvs(prev => prev.filter(ev => ev.id !== id));
  };

  const calculateFleetInsights = async (validEvs) => {
    try {
      // Sends only validated EVs to the backend for calculations
      const { data } = await axios.post(`${API_URL}/calculate`, { evs: validEvs });
      setInsights(data); // Triggers UI updates wherever insights are used
    } catch (error) {
      console.error("Error calculating fleet insights:", error);
    }
  };

  // Watch for any EV state changes
  useEffect(() => {
    // Only calculate insights if all fields are valid
    // However, it keeps the last valid results visible in the UI (not ideal)
    const isValid = evs.length > 0 && evs.every(isEVValid);
    isValid
      ? calculateFleetInsights(evs)
      : setInsights({ totalEnergyDemand: 0, results: [] }); // Clear if invalid
  }, [evs]);

  // Makes all logic and state available to children via context
  return (
    <EVFleetContext.Provider value={{ evs, insights, addEV, updateEV, removeEV, EV_TYPES }}>
      {children}
    </EVFleetContext.Provider>
  );
};
