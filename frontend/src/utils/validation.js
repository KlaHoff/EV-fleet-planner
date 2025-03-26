// Defines allowed range and error messages for each EV input field
const validationRules = {
  count: {
    min: 1,
    max: 10000,
    message: "Must be between 1 and 10000",
  },
  avgMileage: {
    min: 1,
    max: 1000,
    message: "Must be between 1 and 1000",
  },
  battery: {
    min: 1,
    max: 1000,
    message: "Must be between 1 and 1000",
  },
  chargingPower: {
    min: 1,
    max: 1000,
    message: "Must be between 1 and 1000",
  },
  efficiency: {
    min: 0.1,
    max: 10,
    message: "Must be between 0.1 and 10",
  },
};

/**
 * Validates a single field value based on predefined rules.
 * @param {string} field - The name of the field (e.g., 'battery', 'efficiency').
 * @param {string|number} value - The value to validate.
 * @returns {string} Error message if invalid, or empty string if valid.
 */
export const validateField = (field, value) => {
  if (value === "") return "Field Required";
  const num = Number(value);
  if (isNaN(num)) return "Must be a number";

  const rule = validationRules[field];
  if (!rule) return "";

  if (num < rule.min || num > rule.max) {
    return rule.message;
  }

  return "";
};

/**
 * Validates an entire EV object (all required fields).
 * @param {object} ev - The EV data object.
 * @returns {boolean} True if all fields are valid, false otherwise.
 */
export const isEVValid = (ev) => {
  return Object.keys(validationRules).every((key) => {
    const val = ev[key];
    return (
      val !== "" &&
      !isNaN(val) &&
      +val >= validationRules[key].min &&
      +val <= validationRules[key].max
    );
  });
};
