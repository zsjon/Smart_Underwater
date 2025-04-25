import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import UserRegister from "./pages/UserRegister";
import WellList from "./pages/WellList";
import WellDetail from "./pages/WellDetail";
import WellRegister from "./pages/WellRegister";

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/user-register" element={<UserRegister />} />
            <Route path="/wells" element={<WellList />} />
            <Route path="/wells/:id" element={<WellDetail />} />
            <Route path="/wells/register" element={<WellRegister />} />
        </Routes>
    );
};

export default Router;