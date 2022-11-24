import { Routes, Route } from "react-router-dom";

import "./App.css";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import SignIn from "./pages/SignIn";
import AppLayout from "./components/layout/AppLayout";
import jwtInterceptor from "./_helpers/jwt.interceptor";
import AddPractitioner from "./pages/AddPractitioner";
import UpdatePractitioner from "./pages/UpdatePractitioner";

function App() {
    jwtInterceptor(); // axios request interceptor

    return (
        <div className="App">
            <Routes>
                <Route path="/signup" element={<Signup />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/" element={<AppLayout />}>
                    <Route index element={<Home />} />
                    <Route path="/new" element={<AddPractitioner />} />
                    <Route path="/update/:id" element={<UpdatePractitioner />} />
                </Route>
            </Routes>
        </div>
    );
}

export default App;
