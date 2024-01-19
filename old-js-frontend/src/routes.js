import Gifts from "./pages/gifts/Gifts";
import Login from './pages/login/Login';
import Register from './pages/register/Register';
import Explore from "./pages/explore/Explore";
import Settings from "./pages/settings/Settings";
import Wishlist from "./pages/wishlist/Wishlist";
import Birthdays from "./pages/birthdays/Birthdays";
import Dashboard from './pages/dashboard/Dashboard';
import UserProfile from './pages/userHome/UserHome';

const routes = [
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/register',
        element: <Register />
    },
    {
        path: '/home',
        element: <Dashboard />
    },
    {
        path: '/profile',
        element: <UserProfile />
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
