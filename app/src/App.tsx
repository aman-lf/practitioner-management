import { Routes, Route } from "react-router-dom";

import "./App.css";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import SignIn from "./pages/SignIn";
import AppLayout from "./components/layout/AppLayout";
import jwtInterceptor from "./_helpers/jwt.interceptor";

function App() {
    jwtInterceptor(); // axios request interceptor

    return (
        <Routes>
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/" element={<AppLayout />}>
                <Route index element={<Home />} />
            </Route>
        </Routes>
    );
}

export default App;
