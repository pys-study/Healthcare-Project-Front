import { useRoutes } from "react-router-dom";
import Themeroutes from "./routes/Router";
import { AuthProvider } from "./contexts/AuthContext";
import { CurrentDateProvider } from "./contexts/CurrentDateContext";

const App = () => {
  const routing = useRoutes(Themeroutes);

  return (
    <AuthProvider>
      <CurrentDateProvider>
        <div className="dark">{routing}</div>
      </CurrentDateProvider>
    </AuthProvider>
  );
};

export default App;