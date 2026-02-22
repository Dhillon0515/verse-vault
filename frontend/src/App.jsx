import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* If they go to /register, show the Register page */}
        <Route path="/register" element={<Register />} />
        
        {/* If they go to /login, show the Login page */}
        <Route path="/login" element={<Login />} />
        
        {/* If they just go to the main website link, send them to login */}
        <Route path="*" element={<Navigate to="/login" />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;