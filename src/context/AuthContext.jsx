import { createContext, useContext, useEffect, useState } from "react";
import { setAccessToken as updateApiToken } from "../lib/api";
import { refreshSession, getCurrentUser } from "../services/auth.service";

const AuthContext = createContext(null);

let refreshPromise = null;

const restoreAuthSession = () => {
  if (!refreshPromise) {
    refreshPromise = (async () => {
      const session = await refreshSession();
      const currentUser = await getCurrentUser(session.accessToken);

      return {
        accessToken: session.accessToken,
        user: currentUser.user,
      };
    })().finally(() => {
      refreshPromise = null;
    });
  }

  return refreshPromise;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

const loginUser = ({ user, accessToken }) => {
  setUser(user);
  setAccessToken(accessToken);
  updateApiToken(accessToken);
};

const logoutUser = () => {
  setUser(null);
  setAccessToken(null);
  updateApiToken(null);
};

useEffect(() => {
  let isMounted = true;

  const restoreSession = async () => {
    try {
      const session = await restoreAuthSession();

      if (isMounted) {
        setAccessToken(session.accessToken);
        setUser(session.user);
        updateApiToken(session.accessToken);
      }
    } catch {
      if (isMounted) {
        logoutUser();
      }
    } finally {
      if (isMounted) {
        setIsLoading(false);
      }
    }
  };

  restoreSession();

  return () => {
    isMounted = false;
  };
}, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        isAuthenticated: Boolean(accessToken),
        isLoading,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
};
