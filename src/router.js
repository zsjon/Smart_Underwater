import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './jsx/pages/Login';
import Dashboard from './jsx/pages/Dashboard';
import NewMember from "./jsx/pages/NewMember";
import AdminWellList from "./jsx/pages/AdminWellList";
import AdminWellDetail from "./jsx/pages/AdminWellDetail";
import NewWell from "./jsx/pages/NewWell";
import WellReports from "./jsx/pages/WellReports";
import WellCardReport from "./jsx/components/WellCardReport";
import WellSummaryReport from "./jsx/components/WellSummaryReport";
import MemberList from "./jsx/pages/MemberList";
import MemberDetail from "./jsx/pages/MemberDetail";
import UserRegister from "./jsx/pages/UserRegister";
import UserWellList from "./jsx/pages/UserWellList";
import UserWellDetail from "./jsx/pages/UserWellDetail";
import UserWellStatis from "./jsx/pages/UserWellStatis";
import UserWellStatisDetail from "./jsx/pages/UserWellStatisDetail";
import UserWellLive from "./jsx/pages/UserWellLive";

const Router = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/user-register" element={<UserRegister />} />
            <Route path="/adminWells" element={<AdminWellList />} />
            <Route path="/userWells/list" element={<UserWellList />} />
            <Route path="/adminWells/:id" element={<AdminWellDetail />} />
            <Route path="/userWells/:id" element={<UserWellDetail />} />
            <Route path="/wells/register" element={<NewWell />} />
            <Route path="/wells/report" element={<WellReports />} />
            <Route path="/wells/report/card/:id" element={<WellCardReport />} />
            <Route path="/wells/report/summary/:id" element={<WellSummaryReport />} />
            <Route path="/users" element={<MemberList />} />
            <Route path="/users/:id" element={<MemberDetail />} />
            <Route path="/users/newmember" element={<NewMember />} />
            <Route path="/userWells/live" element={<UserWellLive />} />
            <Route path="/userWells/statistics" element={<UserWellStatis/>} />
            <Route path="/userWells/:id/statistics" element={<UserWellStatisDetail/>} />
        </Routes>
    );
};

export default Router;
