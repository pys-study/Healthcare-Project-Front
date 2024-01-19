import React, { createContext, useState, useContext } from 'react';

const CurrentDateContext = createContext();

export const useCurrentDate = () => useContext(CurrentDateContext);

export const CurrentDateProvider = ({ children }) => {
  const [currentDate, setCurrentDate] = useState(new Date().toISOString().split('T')[0]);

  return (
    <CurrentDateContext.Provider value={{ currentDate, setCurrentDate }}>
      {children}
    </CurrentDateContext.Provider>
  );
};
