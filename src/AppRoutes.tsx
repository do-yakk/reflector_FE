import { Routes, Route } from "react-router-dom";
import MainPage from "./pages/Main";
import LoginPage from "./pages/Login";
import CreatePostPage from "./pages/CreatePost";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/create-post" element={<CreatePostPage />} />
        </Routes>
    )
};

export default AppRoutes;