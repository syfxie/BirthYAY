import { ReactElement } from "react";

import Gifts from "../pages/gifts/Gifts";
import Login from '../pages/login/Login';
import Explore from "../pages/explore/Explore";
import Register from '../pages/register/Register';
import Settings from "../pages/settings/Settings";
import UserHome from '../pages/userHome/UserHome';
import Wishlist from "../pages/wishlist/Wishlist";
import Birthdays from "../pages/birthdays/Birthdays";
import Dashboard from '../pages/dashboard/Dashboard';

interface Route {
    path: string;
    element: ReactElement;
}

const routes: Route[] = [
    {
        path: '/',
        element: <Dashboard />
    },
    {
        path:'/login',
        element:<Login />
    },
    {
        path: '/register',
        element: <Register />
    },
    {
        path: '/profile',
        element: <UserHome />
    },
    {
        path: '/birthdays',
        element: <Birthdays />
    },
    {
        path: '/gifts',
        element: <Gifts />
    },
    {
        path: '/wishlist',
        element: <Wishlist />
    },
    {
        path: '/explore',
        element: <Explore />
    },
    {
        path: '/settings',
        element: <Settings />
    },
];

export default routes;
