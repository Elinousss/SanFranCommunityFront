import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../componentes/Button';
import Input from '../componentes/Input';
import '../styles/auth.css';

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setError('');

    if (password.length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres');
      return;
    }

    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    setSuccess(true);
  };

  return (
    <div className="auth-container">
      <aside className="auth-scene" aria-label="SanFran Community, un lugar para sentirte en casa">
        <span className="auth-scene-kicker">SanFran Community / 2026</span>
        <div>
          <p>Vivir mejor, juntos</p>
          <h2>Un lugar para sentirte en casa.</h2>
        </div>
        <span className="auth-scene-note">Espacios compartidos. Comunidad cercana.</span>
      </aside>
      <section className="auth-card" aria-labelledby="reset-password-title">
        <header className="auth-header">
          <i className="fas fa-key" aria-hidden="true"></i>
          <h1 id="reset-password-title">Cambiar contraseña</h1>
          <p>Ingresa tu correo y define una contraseña nueva</p>
        </header>

        <div className="auth-nav">
          <Link to="/login" className="link">
            ← Volver a iniciar sesión
          </Link>
        </div>

        {error && <div className="alert alert-error" role="alert">{error}</div>}

        {success ? (
          <div className="alert alert-success" role="status">
            <strong>Contraseña cambiada correctamente.</strong>
            <span>Esta confirmación es una demostración: no se envió un correo ni se actualizó el backend.</span>
            <Link to="/login" className="link">Ir a iniciar sesión</Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="auth-form">
            <Input
              id="reset-email"
              label="Correo electrónico"
              icon="envelope"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="tu@email.com"
              autoComplete="email"
              required
            />

            <Input
              id="new-password"
              label="Nueva contraseña"
              icon="lock"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Mínimo 8 caracteres"
              autoComplete="new-password"
              minLength={8}
              required
            />

            <Input
              id="confirm-new-password"
              label="Confirmar contraseña"
              icon="lock"
              type="password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              placeholder="Repite la contraseña"
              autoComplete="new-password"
              minLength={8}
              required
            />

            <Button type="submit" className="btn-primary">
              Cambiar contraseña
            </Button>
          </form>
        )}
      </section>
    </div>
  );
};

export default ResetPassword;
