import { Routes, Route } from "react-router-dom";
import "./App.css";

import PageLayout from "./layout/PageLayout";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Worker from "./pages/worker/Worker";
import AddWorker from "./pages/worker/AddWorker";
import NotFound from "./pages/notFound/NotFound";
import Construction from "./pages/construction/Construction";

function App() {
    return (
        <Routes>
            <Route element={<PageLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/worker" element={<Worker />} />
                <Route path="/AddWorker" element={<AddWorker />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/construction" element={<Construction />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}

export default App