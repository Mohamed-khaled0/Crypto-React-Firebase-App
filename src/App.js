import { ThemeProvider } from "./context/ThemeContext";

function App() {
  return <ThemeProvider>
    <Navbar/>
  </ThemeProvider>
}

export default App;
