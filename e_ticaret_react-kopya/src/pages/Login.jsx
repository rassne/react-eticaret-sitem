import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useUser } from '../context/UserContext';
import Footer from '../components/Footer';
import '../styles/auth.css';

const Login = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [loginForm, setLoginForm] = useState({
    username: '',
    password: ''
  });
  const [registerForm, setRegisterForm] = useState({
    fullName: '',
    username: '',
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const { login } = useContext(AuthContext);
  const { loginUser, registerUser, isUsernameExists, isEmailExists, user } = useUser();
  const navigate = useNavigate();

  // Redirect if already logged in
  if (user) {
    navigate('/');
    return null;
  }

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginForm(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setRegisterForm(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!loginForm.username) {
      newErrors.loginUsername = 'Kullanıcı adı zorunludur';
    }
    if (!loginForm.password) {
      newErrors.loginPassword = 'Şifre zorunludur';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Önce AuthContext'teki login fonksiyonunu dene (admin ve normal kullanıcılar)
    const result = login(loginForm.username, loginForm.password);

    if (result === "admin") {
      navigate("/admin");        // admin paneline git
    } else if (result === "user") {
      navigate("/");             // anasayfaya git
    } else {
      setErrors({ loginError: 'Kullanıcı adı veya şifre yanlış!' }); // hata göster
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!registerForm.fullName) {
      newErrors.registerName = 'Ad soyad zorunludur';
    }
    if (!registerForm.username) {
      newErrors.registerUsername = 'Kullanıcı adı zorunludur';
    } else if (registerForm.username.length < 3) {
      newErrors.registerUsername = 'Kullanıcı adı en az 3 karakter olmalıdır';
    } else if (isUsernameExists(registerForm.username)) {
      newErrors.registerUsername = 'Bu kullanıcı adı zaten kayıtlı';
    }
    if (!registerForm.email) {
      newErrors.registerEmail = 'E-posta zorunludur';
    } else if (!/\S+@\S+\.\S+/.test(registerForm.email)) {
      newErrors.registerEmail = 'Geçerli bir e-posta adresi girin';
    } else if (isEmailExists(registerForm.email)) {
      newErrors.registerEmail = 'Bu e-posta adresi zaten kayıtlı';
    }
    if (!registerForm.password) {
      newErrors.registerPassword = 'Şifre zorunludur';
    } else if (registerForm.password.length < 6) {
      newErrors.registerPassword = 'Şifre en az 6 karakter olmalıdır';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    registerUser(registerForm.fullName, registerForm.username, registerForm.email, registerForm.password);
    setSuccessMessage('Hesabınız başarıyla oluşturuldu! Şimdi giriş yapabilirsiniz.');
    setActiveTab('login');
    setRegisterForm({
      fullName: '',
      username: '',
      email: '',
      password: ''
    });
    setLoginForm({
      username: registerForm.username,
      password: registerForm.password
    });
  };

  return (
    <>
      <div className="auth-container">
        <div className="auth-tabs">
          <button
            className={`auth-tab ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('login');
              setErrors({});
            }}
          >
            <i className="fas fa-sign-in-alt"></i> Giriş Yap
          </button>
          <button
            className={`auth-tab ${activeTab === 'register' ? 'active' : ''}`}
            onClick={() => {
              setActiveTab('register');
              setErrors({});
            }}
          >
            <i className="fas fa-user-plus"></i> Hesap Oluştur
          </button>
        </div>

        {activeTab === 'login' && (
          <div className="auth-tab-content active">
            <h2>Giriş Yap</h2>
            {successMessage && (
              <div style={{
                background: '#4caf50',
                color: 'white',
                padding: '1rem',
                borderRadius: '6px',
                marginBottom: '1rem',
                textAlign: 'center'
              }}>
                {successMessage}
              </div>
            )}
            <form onSubmit={handleLoginSubmit}>
              <div className="form-group">
                <label htmlFor="loginUsername">Kullanıcı Adı</label>
                <input
                  type="text"
                  id="loginUsername"
                  name="username"
                  placeholder="Kullanıcı adınız"
                  value={loginForm.username}
                  onChange={handleLoginChange}
                />
                {errors.loginUsername && (
                  <span className="form-error">{errors.loginUsername}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="loginPassword">Şifre</label>
                <input
                  type="password"
                  id="loginPassword"
                  name="password"
                  placeholder="Şifreniz"
                  value={loginForm.password}
                  onChange={handleLoginChange}
                />
                {errors.loginPassword && (
                  <span className="form-error">{errors.loginPassword}</span>
                )}
              </div>

              {errors.loginError && (
                <div className="form-error" style={{ textAlign: 'center', marginBottom: '1rem' }}>
                  {errors.loginError}
                </div>
              )}

              <button type="submit">
                <i className="fas fa-sign-in-alt"></i> Giriş Yap
              </button>
            </form>
          </div>
        )}

        {activeTab === 'register' && (
          <div className="auth-tab-content active">
            <h2>Hesap Oluştur</h2>
            <form onSubmit={handleRegisterSubmit}>
              <div className="form-group">
                <label htmlFor="registerName">Ad Soyad</label>
                <input
                  type="text"
                  id="registerName"
                  name="fullName"
                  placeholder="Ad Soyad"
                  value={registerForm.fullName}
                  onChange={handleRegisterChange}
                />
                {errors.registerName && (
                  <span className="form-error">{errors.registerName}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="registerUsername">Kullanıcı Adı</label>
                <input
                  type="text"
                  id="registerUsername"
                  name="username"
                  placeholder="Kullanıcı adı"
                  value={registerForm.username}
                  onChange={handleRegisterChange}
                />
                {errors.registerUsername && (
                  <span className="form-error">{errors.registerUsername}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="registerEmail">E-posta</label>
                <input
                  type="email"
                  id="registerEmail"
                  name="email"
                  placeholder="E-posta adresiniz"
                  value={registerForm.email}
                  onChange={handleRegisterChange}
                />
                {errors.registerEmail && (
                  <span className="form-error">{errors.registerEmail}</span>
                )}
              </div>

              <div className="form-group">
                <label htmlFor="registerPassword">Şifre</label>
                <input
                  type="password"
                  id="registerPassword"
                  name="password"
                  placeholder="Şifre"
                  value={registerForm.password}
                  onChange={handleRegisterChange}
                />
                {errors.registerPassword && (
                  <span className="form-error">{errors.registerPassword}</span>
                )}
              </div>

              {errors.registerError && (
                <div className="form-error" style={{ textAlign: 'center', marginBottom: '1rem' }}>
                  {errors.registerError}
                </div>
              )}

              <button type="submit">
                <i className="fas fa-user-plus"></i> Hesap Oluştur
              </button>
            </form>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default Login;
