import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // Uygulama yüklendiğinde localStorage'dan verileri geri yükle
  useEffect(() => {
    const saved = localStorage.getItem("aktifKullanici");
    const adminFlag = localStorage.getItem("adminGiris");
    
    if (saved) {
      setCurrentUser(JSON.parse(saved));
    }
    if (adminFlag === "true") {
      setIsAdmin(true);
    }
  }, []);

  const login = (username, password) => {
    // Admin kontrolü — önce bu yapılır, localStorage'a bakılmaz
    if (username === "admin" && password === "unutma99") {
      const adminUser = { kullaniciAdi: "admin", isAdmin: true };
      setCurrentUser(adminUser);
      setIsAdmin(true);
      localStorage.setItem("aktifKullanici", JSON.stringify(adminUser));
      localStorage.setItem("adminGiris", "true");
      return "admin";
    }

    // Normal kullanıcı kontrolü
    const users = JSON.parse(localStorage.getItem("kullanicilar") || "[]");
    const found = users.find(
      (u) => u.username === username && u.password === password
    );

    if (found) {
      setCurrentUser(found);
      setIsAdmin(false);
      localStorage.setItem("aktifKullanici", JSON.stringify(found));
      return "user";
    }

    return "error";
  };

  const logout = () => {
    setCurrentUser(null);
    setIsAdmin(false);
    localStorage.removeItem("aktifKullanici");
    localStorage.removeItem("adminGiris");
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAdmin,
        login,
        logout,
        setCurrentUser,
        setIsAdmin
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
