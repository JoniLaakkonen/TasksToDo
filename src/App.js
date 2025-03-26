import { useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Dashboard from './admin/dashboard/Dashboard';
import Login from './admin/login/Login';
import './App.css';
import { Homepage } from './pages';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem("auth") === "true"; // ✅ Load auth state from localStorage
  });

  useEffect(() => {
      localStorage.setItem("auth", isAuthenticated); // ✅ Save auth state to localStorage
  }, [isAuthenticated]);
  
  const ProtectedRoute = ({ children }) => {
    return isAuthenticated ? children : <Navigate to="/admin" />;
  };
  return (
    <>
      <Routes>
        <Route path="/admin" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
        <Route path='/*' element={<Homepage/>}/>

      </Routes>
    </>
  );
}

export default App;
