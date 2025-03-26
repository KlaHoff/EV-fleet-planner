import { EVFleetProvider } from "./context/EVFleetProvider";
import Dashboard from "./pages/Dashboard";
import '@fortawesome/fontawesome-free/css/all.min.css';

function App() {
  return (
    <EVFleetProvider>
      <Dashboard />
    </EVFleetProvider>
  );
}

export default App;
