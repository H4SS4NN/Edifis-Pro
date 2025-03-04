import { Routes, Route } from "react-router-dom";
import "./App.css";

import PageLayout from "./layout/PageLayout";
import Home from "./pages/home/Home";
import NotFound from "./pages/notFound/NotFound";
import Login from "./pages/login/Login";
import Worker from "./pages/worker/Worker";
import AddWorker from "./pages/worker/AddWorker";

function App() {
    return (
        <>
            <Routes>
                <Route element={<PageLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/worker" element={<Worker />} />
                    <Route path="/AddWorker" element={<AddWorker />} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    )
}

export default App