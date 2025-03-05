import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import "./App.css";

import { useAuth } from "./context/AuthContext";

import PageLayout from "./layout/PageLayout";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Worker from "./pages/worker/Worker";
import AddWorker from "./pages/worker/AddWorker";
import WorkerDetails from "./pages/worker/WorkerDetails";
import NotFound from "./pages/notFound/NotFound";
import Construction from "./pages/construction/Construction";
import AddConstruction from "./pages/construction/AddConstruction"
import ConstructionDetails from "./pages/construction/ConstructionDetails"

function App() {
    const { isAuthenticated } = useAuth();
    return (
        <Routes>
            {/* {isAuthenticated && (
                <> */}
                    <Route element={<PageLayout />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/worker" element={<Worker />} />
                        <Route path="/AddWorker" element={<AddWorker />} />
                        <Route path="/worker/:name" element={<WorkerDetails />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/construction" element={<Construction />} />
                        <Route path="/ConstructionDetails" element={<ConstructionDetails />} />
                        <Route path="/AddConstruction" element={<AddConstruction />} />
                    </Route>
                    <Route path="*" element={<NotFound />} />
                {/* </>
            )}  */}
            <Route path="*" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    )
}

export default App