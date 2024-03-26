import React, { useContext } from 'react';
import './App.css';
import Layout from './Components/Layout/Layout';
import AdminLayout from './Components/Layout/AdminLayout';
import { AuthContext } from './context/AuthContext';

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'


function App() {
  const { user } = useContext(AuthContext);

  const isAdmin = user && user.role === 'admin';

  return isAdmin ? <AdminLayout /> : <Layout />;
}

export default App;
