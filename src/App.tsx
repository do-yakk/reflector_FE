import type React from "react";
import './App.css'
import AppRoutes from "./AppRoutes.tsx";
import { BrowserRouter } from "react-router-dom";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
