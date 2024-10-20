import { createBrowserRouter, redirect } from 'react-router-dom';
import SignUpPage from './pages/signup-page';
import App from './App';
import NotFoundPage from './pages/404-page';
import SignInPage from './pages/signin-page';
import BoardPage from './pages/board-page';
import ProfilePage from './pages/profile-page';
import { getCookie } from './lib/get-cookie';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: ':boardId',
        element: <BoardPage />,
      },
      {
        path: 'profile',
        element: <ProfilePage />,
      },
    ],
  },
  {
    path: '/sign-up',
    element: <SignUpPage />,
  },
  {
    path: '/sign-in',
    element: <SignInPage />,
    loader: () => {
      const jwtCookie = getCookie('auth');
      if (jwtCookie) {
        return redirect('/profile');
      }
      return null;
    },
  },
]);
