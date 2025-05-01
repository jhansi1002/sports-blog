import React, { createContext, useState } from 'react';

// Create the context
export const UserContext = createContext();

// UserProvider component to wrap around the app and provide context
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Initialize with null or any default value

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
