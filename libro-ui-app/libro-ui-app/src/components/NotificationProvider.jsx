import React, { createContext, useState, useContext, useCallback, memo } from 'react';

const NotificationContext = createContext();

export const NotificationProvider = memo(({ children }) => {
  const [notification, setNotification] = useState(null);

  const showNotification = useCallback((type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 3000); // Auto-hide after 3 seconds
  }, []);

  const contextValue = useCallback(() => ({
    notification,
    showNotification
  }), [notification, showNotification]);

  return (
    <NotificationContext.Provider value={contextValue()}>
      {children}
      {notification && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}
    </NotificationContext.Provider>
  );
});

export const useNotification = () => useContext(NotificationContext);