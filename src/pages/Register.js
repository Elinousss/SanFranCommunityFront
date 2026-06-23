import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../presentation/hooks/useAuth';
import Button from '../components/Button';
import Input from '../components/Input';
import '../styles/auth.css';

const Register = () => {
  const [formData, setFormData] = useState({
    names: '',
    email: '',
    idDocument: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    if (formData.password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres');
      return;
    }

    setLoading(true);
    const result = await register(formData);
    setLoading(false);

    if (result.success) {
      navigate('/');
    } else {
      setError(result.error || 'Error al registrarse');
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card auth-card-large">
        <div className="auth-header">
          <i className="fas fa-user-plus"></i>
          <h1>Crear Cuenta</h1>
          <p>Únete a SanFran Community</p>
        </div>

        <div className="auth-nav">
          <Link to="/" className="link">
            ← Volver a Home
          </Link>
        </div>

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-row">
            <Input
              id="names"
              name="names"
              label="Nombres Completos"
              icon="user"
              type="text"
              value={formData.names}
              onChange={handleChange}
              placeholder="Tu nombre completo"
              required
            />

            <Input
              id="idDocument"
              name="idDocument"
              label="Documento de Identidad"
              icon="id-card"
              type="text"
              value={formData.idDocument}
              onChange={handleChange}
              placeholder="123456789"
              required
            />
          </div>

          <Input
            id="email"
            name="email"
            label="Correo Electrónico"
            icon="envelope"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="tu@email.com"
            required
          />

          <div className="form-row">
            <Input
              id="password"
              name="password"
              label="Contraseña"
              icon="lock"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />

            <Input
              id="confirmPassword"
              name="confirmPassword"
              label="Confirmar Contraseña"
              icon="lock"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              required
            />
          </div>

          <Button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Creando cuenta...' : 'Crear Cuenta'}
          </Button>
        </form>

        <div className="auth-footer">
          <p>¿Ya tienes cuenta?</p>
          <Link to="/login" className="link">
            Inicia sesión aquí
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
