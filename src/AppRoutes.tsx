import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/Main";
import LoginPage from "./pages/Login";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<LoginPage />} />
        </Routes>
    )
};

export default AppRoutes;