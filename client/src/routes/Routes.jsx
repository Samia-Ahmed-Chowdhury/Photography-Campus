import React from 'react'
import { createBrowserRouter } from "react-router-dom";
import HomeLayout from '../layout/HomeLayout';
import Home from '../pages/Home/Home';
import Login from '../pages/signInSystem/Login';
import Register from '../pages/signInSystem/Register';
import Classes from '../pages/Classes/Classes';
import Instructors from '../pages/Instructors/Instructors';
import DashboradLayout from '../layout/DashboradLayout';
import SelectedClasses from '../pages/Dashboard/StudentDashboard/SelectedClasses';
import EnrolledClasses from '../pages/Dashboard/StudentDashboard/EnrolledClasses';
import PaymentHistory from '../pages/Dashboard/StudentDashboard/PaymentHistory';
import ManageClasses from '../pages/Dashboard/AdminDashboard/ManageClasses';
import ManageUsers from '../pages/Dashboard/AdminDashboard/ManageUsers';
import AddClass from '../pages/Dashboard/InstructorDashboard/AddClass';
import MyClasses from '../pages/Dashboard/InstructorDashboard/MyClasses';
import ProtectedRoute from './ProtectedRoute';
import RoleWiseRoute from './RoleWiseRoute';
import ErrorPage from '../shared/ErrorPage/ErrorPage';

const routes = createBrowserRouter([
    {
        path: '/',
        element: <HomeLayout />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <Home />,
                errorElement: <ErrorPage />,
            },
            {
                path: '/instructors',
                element: <Instructors />,
                errorElement: <ErrorPage />,
            },
            {
                path: '/classes',
                element: <Classes />,
                errorElement: <ErrorPage />,

            },
            {
                path: "login",
                element: <Login />,
                errorElement: <ErrorPage />,
            },
            {
                path: "register",
                element: <Register />,
                errorElement: <ErrorPage />,
            },
        ]
    },

    {
        path: 'dashboard',
        element: <ProtectedRoute> <DashboradLayout /></ProtectedRoute>,
        errorElement: <ErrorPage />,
        children: [
            {
                path: "my_selected_classes",
                element: <RoleWiseRoute><SelectedClasses /></RoleWiseRoute>,
                errorElement: <ErrorPage />,
            },
            {
                path: "my_enrolled_classes",
                element: <RoleWiseRoute> <EnrolledClasses /></RoleWiseRoute>,
                errorElement: <ErrorPage />,
            },
            {
                path: "my_payment_history",
                element: <RoleWiseRoute><PaymentHistory /></RoleWiseRoute>,
                errorElement: <ErrorPage />,
            },
            {
                path: "add_class",
                element: <RoleWiseRoute><AddClass /></RoleWiseRoute>,
                errorElement: <ErrorPage />,
            },
            {
                path: "my_classes",
                element: <RoleWiseRoute><MyClasses /></RoleWiseRoute>,
                errorElement: <ErrorPage />,
            },
            {
                path: "manage_classes",
                element: <RoleWiseRoute><ManageClasses /></RoleWiseRoute>,
                errorElement: <ErrorPage />,
            },
            {
                path: "manage_users",
                element: <RoleWiseRoute><ManageUsers /></RoleWiseRoute>,
                errorElement: <ErrorPage />,
            },
        ]
    }


])

export default routes