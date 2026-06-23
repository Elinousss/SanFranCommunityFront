import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../presentation/hooks/useAuth';
import Button from '../components/Button';
import Input from '../components/Input';
import '../styles/auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login({ email, password });
    setLoading(false);

    if (result.success) {
      navigate('/');
    } else {
      setError(result.error || 'Error al iniciar sesión');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <i className="fas fa-building"></i>
          <h1>SanFran Community</h1>
          <p>Inicia sesión en tu cuenta</p>
        </div>

        <div className="auth-nav">
          <Link to="/" className="link">
            ← Volver a Home
          </Link>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <Input
            id="email"
            label="Correo Electrónico"
            icon="envelope"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tu@email.com"
            required
          />

          <Input
            id="password"
            label="Contraseña"
            icon="lock"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            required
          />

          <Button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
          </Button>
        </form>

        <div className="auth-footer">
          <p>¿No tienes cuenta?</p>
          <Link to="/register" className="link">
            Regístrate aquí
          </Link>
        </div>

        <div className="demo-info">
          <p><strong>Para pruebas admin:</strong></p>
          <p>Email: admin@sanfran.com</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
