import { ReactNode, useContext, useReducer } from 'react';
import { AuthContext, authReducer, initAuthState } from './AuthContext';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initAuthState);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated: state.isAuthenticated, devMode: state.devMode, dispatch: dispatch }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('Auth context has not been initialized!');
  }
  return context;
};
