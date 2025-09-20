import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import AITools from "./pages/AITools";
import ForensicAnalysis from "./pages/ForensicAnalysis";
import UploadCriminalData from "./pages/UploadCriminalData";
import Reports from "./pages/Reports";

// ✅ Helper component for protecting routes
const ProtectedRoute = ({ children }) => {
  const caseData = localStorage.getItem("caseData");
  const isAuthenticated = caseData !== null;

  return isAuthenticated ? children : <Navigate to="/" replace />;
};

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {/* Landing Page */}
          <Route path="/" element={<LandingPage />} />
          
          {/* Public Auth Pages */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Pages */}
          <Route
            path="/dashboard"
            element={
              // <ProtectedRoute>
                <Layout>
                  <Dashboard />
                </Layout>
              // </ProtectedRoute>
            }
          />
          <Route
            path="/ai-tools"
            element={
              // <ProtectedRoute>
                <Layout>
                  <AITools />
                </Layout>
              // </ProtectedRoute>
            }
          />
          <Route
            path="/forensic"
            element={
              // <ProtectedRoute>
                <Layout>
                  <ForensicAnalysis />
                </Layout>
              // </ProtectedRoute>
            }
          />
          <Route
            path="/upload"
            element={
              // <ProtectedRoute>
                <Layout>
                  <UploadCriminalData />
                </Layout>
              // </ProtectedRoute>
            }
          />
          <Route
            path="/reports"
            element={
              // <ProtectedRoute>
                <Layout>
                  <Reports />
                </Layout>
              // </ProtectedRoute>
            }
          />

          {/* Catch-all → redirect */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
