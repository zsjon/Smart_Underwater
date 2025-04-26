import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import NewMember from "./pages/NewMember";
import WellList from "./pages/WellList";
import WellDetail from "./pages/WellDetail";
import NewWell from "./pages/NewWell";
import WellReports from "./pages/WellReports";
import WellCardReport from "./components/WellCardReport";
import WellSummaryReport from "./components/WellSummaryReport";
import MemberList from "./pages/MemberList";
import MemberDetail from "./pages/MemberDetail";
import UserRegister from "./pages/UserRegister";

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/user-register" element={<UserRegister />} />
            <Route path="/wells" element={<WellList />} />
            <Route path="/wells/:id" element={<WellDetail />} />
            <Route path="/wells/register" element={<NewWell />} />
            <Route path="/wells/report" element={<WellReports />} />
            <Route path="/wells/report/card/:id" element={<WellCardReport />} />
            <Route path="/wells/report/summary/:id" element={<WellSummaryReport />} />
            <Route path="/users" element={<MemberList />} />
            <Route path="/users/:id" element={<MemberDetail />} />
            <Route path="/users/newmember" element={<NewMember />} />
        </Routes>
    );
};

export default Router;