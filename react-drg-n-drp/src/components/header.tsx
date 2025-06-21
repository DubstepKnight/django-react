import React from 'react';
import { Button } from './ui/button';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from './theme-provider';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { ROUTES } from '@/routing';
import { Switch } from './ui/switch';
import { useAuth } from '@/context/AuthProvider';
import { ActionType } from '@/context/AuthContext';
import { logout } from '@/lib/requests/auth';
import { getCookie } from '@/lib/get-cookie';

const Header: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  const navigate = useNavigate();

  const { devMode, dispatch } = useAuth();

  const switchTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    }
    if (theme === 'dark') {
      setTheme('light');
    }
  };

  const handleLogout = async () => {
    await logout();
    const loggedInCookie = getCookie('logged_in');
    if (loggedInCookie) {
      toast({
        title: 'Successfully logged out!',
        variant: 'destructive',
      });
      return;
    }
    toast({
      title: 'Successfully logged out!',
    });

    navigate(ROUTES.SignIn);
  };

  return (
    <header className="flex justify-between items-center px-6 py-4 border-b-2">
      <h2 className="text-lg font-bold">
        <Link to={'/'}> Board Master </Link>
      </h2>
      <div className="flex justify-between gap-4">
        <Button onClick={switchTheme} variant={'ghost'} className="w-12">
          {theme === 'light' && (
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          )}
          {theme === 'dark' && (
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          )}
        </Button>
        <span className="flex items-center gap-4">
          <label htmlFor="devMode">Dev mode</label>
          <Switch
            id="devMode"
            checked={devMode}
            onCheckedChange={() => dispatch({ type: ActionType.SWITCH_DEV_MODE })}
          />
        </span>
        <Button onClick={handleLogout} variant={'destructive'}>
          Log out
        </Button>
      </div>
    </header>
  );
};

export default Header;
