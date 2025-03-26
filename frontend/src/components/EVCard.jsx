import { useState, useEffect } from "react";
import { useEVFleet } from "../context/EVFleetProvider";
import { validateField } from "../utils/validation";

// Field labels are centralized here to make the UI consistent
const FIELDS = {
  count: "Number of EVs",
  avgMileage: "Daily Mileage",
  battery: "Battery Capacity (kWh)",
  chargingPower: "Charging Power (kW)",
  efficiency: "Efficiency (mi/kWh)",
};

const EVCard = ({ ev, index }) => {
  const { updateEV, removeEV, EV_TYPES } = useEVFleet();

  // Local state allows partial input (e.g., typing "7.") without immediately pushing invalid values to global state
  const [local, setLocal] = useState(ev);
  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    const error = validateField(field, value);

    // Local state reflects current user input immediately, even if invalid
    setLocal({ ...local, [field]: value });
    setErrors({ ...errors, [field]: error });

    // Only push validated data upstream to avoid backend or insight calculation crashes
    if (!error) {
      updateEV(ev.id, field, Number(value));
    }
  };

  useEffect(() => {
    // This ensures local state stays in sync with external updates (e.g., when type changes programmatically)
    if (local.type !== ev.type) {
      setLocal(ev);
    }
  }, [ev]);

  return (
    <div className="ev-card">
      <h3 className="ev-card-title">EV type {index + 1}</h3>

      {/* Vehicle type dropdown — separate from other fields since it controls efficiency defaults */}
      <label>Vehicle Type:</label>
      <select
        className="ev-input"
        value={local.type}
        onChange={(e) => updateEV(ev.id, "type", e.target.value)}
      >
        {/* Dynamic options list based on allowed EV types from context */}
        {Object.keys(EV_TYPES).map(type => (
          <option key={type} value={type}>{type}</option>
        ))}
      </select>

      {/* All numeric inputs are rendered based on FIELDS definition,
          it supports easier reordering or adding/removing fields */}
      {Object.entries(FIELDS).map(([field, label]) => (
        <div key={field} className="ev-field">
          <label>{label}</label>
          <input
            type="text"
            className="ev-input"
            value={local[field]}
            onChange={(e) => handleChange(field, e.target.value)}
          />
          {/* Validation errors are shown immediately for responsive feedback */}
          {errors[field] && <p className="ev-error">{errors[field]}</p>}
        </div>
      ))}

      {/* Delete button triggers removal through context to update global state */}
      <button className="delete-button" onClick={() => removeEV(ev.id)}>
        <i className="fas fa-trash-alt"></i> Delete EV
      </button>
    </div>
  );
};

export default EVCard;
