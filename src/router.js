import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './jsx/pages/Login';
import Dashboard from './jsx/pages/Dashboard';
import NewMember from "./jsx/pages/NewMember";
import AdminWellList from "./jsx/pages/AdminWellList";
import WellDetail from "./jsx/pages/WellDetail";
import NewWell from "./jsx/pages/NewWell";
import WellReports from "./jsx/pages/WellReports";
import WellCardReport from "./jsx/components/WellCardReport";
import WellSummaryReport from "./jsx/components/WellSummaryReport";
import MemberList from "./jsx/pages/MemberList";
import MemberDetail from "./jsx/pages/MemberDetail";
import UserRegister from "./jsx/pages/UserRegister";
import UserWellList from "./jsx/pages/UserWellList";

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/user-register" element={<UserRegister />} />
            <Route path="/adminWells" element={<AdminWellList />} />
            <Route path="/userWells" element={<UserWellList />} />
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
