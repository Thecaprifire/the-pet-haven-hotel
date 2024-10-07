import { createBrowserRouter } from 'react-router-dom';

import App from './App';
import Home from './pages/Home';
import Services from './pages/Services';
import Profile from './pages/Profile';
import Products from './pages/Products';
import Register from './pages/Register';
import Booking from './pages/Booking';
import Error from './pages/Error';
import Login from './components/Login';
import Signup from './components/Signup';


const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <Error />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: '/services',
                element: <Services />,
            },
            {
                path: '/profile',
                element: <Profile />,
            },
            {
                path: '/products',
                element: <Products />,
            },
            {
                path: '/register',
                element: <Register />,
            },
            {
                path: '/booking',
                element: <Booking />,
            },
            {
                path: '/login',
                element: <Login />,
            },
            {
                path: '/signup',
                element: <Signup />,
            },
        ],
    },
]);

export default router;