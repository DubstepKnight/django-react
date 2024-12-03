import { createBrowserRouter, redirect } from 'react-router-dom';
import SignUpPage from './pages/signup-page';
import App from './App';
import NotFoundPage from './pages/404-page';
import SignInPage from './pages/signin-page';
import BoardPage from './pages/board-page';
import ProfilePage from './pages/profile-page';
import { getCookie } from './lib/get-cookie';

export enum ROUTES {
  Profile = '/profile',
  SignIn = '/sign-in',
  SignUp = '/sign-up',
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: ':boardId',
        element: <BoardPage />,
        loader: () => {
          const loggedIn = getCookie('logged_in');
          console.log('loggedIn: ', loggedIn);
          if (!loggedIn) {
            return redirect(ROUTES.SignIn);
          }
          return null;
        },
      },
      {
        path: ROUTES.Profile,
        element: <ProfilePage />,
        loader: () => {
          const loggedIn = getCookie('logged_in');
          if (!loggedIn) {
            return redirect(ROUTES.SignIn);
          }
          return null;
        },
      },
    ],
  },
  {
    path: ROUTES.SignUp,
    element: <SignUpPage />,
  },
  {
    path: ROUTES.SignIn,
    element: <SignInPage />,
    loader: () => {
      const loggedIn = getCookie('logged_in');
      if (loggedIn) {
        return redirect(ROUTES.Profile);
      }
      return null;
    },
  },
]);
