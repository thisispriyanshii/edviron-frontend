import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './hooks/useAuth';
import Layout from './components/Layout/Layout';
import ErrorBoundary from './components/common/ErrorBoundary';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import TransactionsOverview from './pages/TransactionsOverview';
import TransactionsBySchool from './pages/TransactionsBySchool';
import StatusCheck from './pages/StatusCheck';

// Protected Route Component
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}>
        Loading...
      </div>
    );
  }

  return user ? <>{children}</> : <Navigate to="/login" replace />;
};

// Public Route Component (redirect to dashboard if already logged in)
const PublicRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return user ? <Navigate to="/transactions" replace /> : <>{children}</>;
};

function App() {
  return (
    <AuthProvider>
      <ErrorBoundary>
        <Router>
          <Routes>
          {/* Public Routes */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />
          <Route
            path="/register"
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            }
          />

          {/* Default route -> login to avoid redirect loops during unauthenticated state */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route
            path="/transactions"
            element={
              <ProtectedRoute>
                <TransactionsOverview />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/schools/:schoolId"
            element={
              <ProtectedRoute>
                <TransactionsBySchool />
              </ProtectedRoute>
            }
          />
          <Route
            path="/status-check"
            element={
              <ProtectedRoute>
                <StatusCheck />
              </ProtectedRoute>
            }
          />

          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
      </ErrorBoundary>
    </AuthProvider>
  );
}

export default App;
