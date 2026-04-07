import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [users, setUsers] = useState([]);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  // LocalStorage'dan verileri yükle
  useEffect(() => {
    const storedUsers = localStorage.getItem('kullanicilar');
    if (storedUsers) {
      setUsers(JSON.parse(storedUsers));
    } else {
      localStorage.setItem('kullanicilar', JSON.stringify([]));
    }

    const activeUser = localStorage.getItem('aktifKullanici');
    if (activeUser) {
      setUser(JSON.parse(activeUser));
    }
  }, []);

  // Kullanıcı kaydet
  const registerUser = (fullName, username, email, password) => {
    const newUser = {
      id: users.length + 1,
      fullName,
      username,
      email,
      password
    };

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem('kullanicilar', JSON.stringify(updatedUsers));
    
    return true;
  };

  // Kullanıcı girişi
  const loginUser = (username, password) => {
    const foundUser = users.find(u => u.username === username && u.password === password);
    if (foundUser) {
      const { password, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('aktifKullanici', JSON.stringify(userWithoutPassword));
      return true;
    }
    return false;
  };

  // Kullanıcı çıkışı
  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem('aktifKullanici');
    setUserDropdownOpen(false);
  };

  // Kullanıcı adı zaten var mı
  const isUsernameExists = (username) => {
    return users.some(u => u.username === username);
  };

  // Email zaten var mı
  const isEmailExists = (email) => {
    return users.some(u => u.email === email);
  };

  return (
    <UserContext.Provider value={{
      user,
      users,
      registerUser,
      loginUser,
      logoutUser,
      isUsernameExists,
      isEmailExists,
      userDropdownOpen,
      setUserDropdownOpen
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
};
