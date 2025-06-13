import React, { createContext, useState, useEffect, useCallback, useRef } from 'react';
import { authenticate, getToken } from '../utils/auth';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(getToken());
  const [loading, setLoading] = useState(true);
  const hasInitialized = useRef(false);

  const fetchToken = useCallback(async () => {
    // Prevent duplicate calls during React StrictMode
    if (hasInitialized.current) return;
    hasInitialized.current = true;

    // If token already exists, don't authenticate again
    const existingToken = getToken();
    if (existingToken) {
      setAuthToken(existingToken);
      setLoading(false);
      return;
    }

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

  const contextValue = useCallback(() => ({
    authToken,
    loading
  }), [authToken, loading]);

  return (
    <AuthContext.Provider value={contextValue()}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;