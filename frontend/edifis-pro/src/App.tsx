import { Routes, Route } from "react-router-dom";
import "./App.css";

import PageLayout from "./layout/PageLayout";
import Home from "./pages/home/Home";
import NotFound from "./pages/notFound/NotFound";
import Login from "./pages/login/Login";

function App() {
    return (
        <>
            <Routes>
                <Route element={<PageLayout />}>
                    <Route path="/" element={<Home />} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    )
}

export default App