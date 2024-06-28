import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Outlet } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';
import '../../assets/css/main.css';
import DarkMode from '../../components/shared/features/ThemeMode';

const AdminLayout = () => {
  const [darkMode, handleToggleDarkMode] = DarkMode();
  const role = useSelector((state) => state.UserDetails.role); // Adjust according to your state structure
  const navigate = useNavigate();

  useEffect(() => {
    if (role !== 'admin') {
      navigate('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [role, navigate]); // Only include navigate in the dependency array

  return (
    <div id="root" className={darkMode ? "App dark-mode" : "App"}>
      <AdminDashboard />
      <Outlet />
    </div>
  );
};

export default AdminLayout;
