import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AITools from "./pages/AITools";
import ForensicAnalysis from "./pages/ForensicAnalysis";
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
          {/* Public Login */}
          <Route path="/" element={<Login />} />

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
