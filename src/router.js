import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import UserRegister from "./pages/UserRegister";
import WellList from "./pages/WellList";

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/user-register" element={<UserRegister />} />
            <Route path="/wells" element={<WellList />} />
        </Routes>
    );
};

export default Router;