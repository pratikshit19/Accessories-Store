import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1">
          <AppRoutes>
            <Route path="/" element={<Home />} />
          </AppRoutes>
        </main>
        <Footer />
      </div>
    
  );
}

export default App;