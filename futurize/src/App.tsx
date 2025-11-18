import { ThemeProvider } from "./context/ThemeContext";
import Router from "./routes/Router";

function App() {
  return (
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  );
}

export default App;
