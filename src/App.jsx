import { Routes, Route, Link } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Home from "./pages/Home";
import VerifyEmail from "./pages/VerifyEmail";
import ResetPassword from "./pages/ResetPassword";
import "./App.css";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/verify-email" element={<VerifyEmail />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route
          path="*"
          element={
            <div className="not-found">
              <p>A different trail</p>
              <h1>Let’s find your way back.</h1>
              <Link to="/">Return to Gilgit-Baltistan</Link>
            </div>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
