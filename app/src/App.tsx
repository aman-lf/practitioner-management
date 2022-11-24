import { Routes, Route } from "react-router-dom";

import "./App.css";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import SignIn from "./pages/SignIn";
import AppLayout from "./components/layout/AppLayout";
import AddPractitioner from "./pages/AddPractitioner";
import UpdatePractitioner from "./pages/UpdatePractitioner";
import LogOut from "./pages/LogOut";
import PageNotFound from "./pages/PageNotFound";

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/signup" element={<Signup />} />
                <Route path="/signin" element={<SignIn />} />
                <Route path="/logout" element={<LogOut />} />
                <Route path="/" element={<AppLayout />}>
                    <Route index element={<Home />} />
                    <Route path="/new" element={<AddPractitioner />} />
                    <Route path="/update/:id" element={<UpdatePractitioner />} />
                </Route>
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </div>
    );
}

export default App;
