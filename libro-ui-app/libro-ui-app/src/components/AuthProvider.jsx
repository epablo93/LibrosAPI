import React, { createContext, useState, useEffect, useCallback } from 'react';
import { authenticate, getToken } from '../utils/auth';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(getToken());
  const [loading, setLoading] = useState(true);

  const fetchToken = useCallback(async () => {
    try {
      const username = process.env.REACT_APP_DEFAULT_USERNAME;
      const password = process.env.REACT_APP_DEFAULT_PASSWORD;
      await authenticate(username, password);
      setAuthToken(getToken());
    } catch (error) {
      console.error('Authentication failed:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchToken();
  }, [fetchToken]);

  return (
    <AuthContext.Provider value={{ authToken, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;