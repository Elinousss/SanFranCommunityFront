import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../presentation/hooks/useAuth';
import { useApi } from '../presentation/hooks/useApi';
import { ServiceLocator } from '../infrastructure/service-locator';
import Button from '../components/Button';
import Spinner from '../components/Spinner';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import PiscinaImage from '../assets/images/Piscina.jpg';
import CanchaMultipleImage from '../assets/images/CanchaMultiple.png';
import SalonSocialImage from '../assets/images/SalonSocial.jpeg';
import '../styles/home.css';

const facilityService = ServiceLocator.getInstance().facilityService;

const getFacilityBannerImage = (name) => {
  const normalized = name?.toLowerCase() || '';

  if (normalized.includes('salón') || normalized.includes('salon')) {
    return SalonSocialImage;
  }
  if (normalized.includes('cancha') || normalized.includes('múltiple') || normalized.includes('multiple')) {
    return CanchaMultipleImage;
  }
  if (normalized.includes('piscina')) {
    return PiscinaImage;
  }

  return null;
};

const isPlaceholderImageUrl = (imageUrl) => {
  return typeof imageUrl === 'string' && imageUrl.trim() !== '' && /example\.com/i.test(imageUrl);
};

const getFacilityBannerStyle = (name) => {
  const normalized = name?.toLowerCase() || '';

  if (normalized.includes('salón') || normalized.includes('salon')) {
    return { background: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' };
  }
  if (normalized.includes('cancha') || normalized.includes('múltiple') || normalized.includes('multiple')) {
    return { background: 'linear-gradient(135deg, #059669 0%, #34d399 100%)', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' };
  }
  if (normalized.includes('piscina')) {
    return { background: 'linear-gradient(135deg, #3b82f6 0%, #60a5fa 100%)', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' };
  }

  return { background: 'linear-gradient(135deg, #6366f1 0%, #818cf8 100%)', backgroundRepeat: 'no-repeat', backgroundPosition: 'center' };
};

const Home = () => {
  const { user, logout, isAdmin } = useAuth();
  const [reservationMessage, setReservationMessage] = useState({});
  const [activeReservation, setActiveReservation] = useState(null);
  const [reservationForm, setReservationForm] = useState({ date: new Date(), startTime: '09:00', endTime: '10:00' });
  const [reservationErrors, setReservationErrors] = useState({});
  const [reservationLoading, setReservationLoading] = useState(false);
  const RESERVATION_MIN_MINUTES = 30;
  const RESERVATION_START_HOUR = 6; // 06:00
  const RESERVATION_END_HOUR = 22; // 22:00
  const fetchFacilities = useCallback(() => facilityService.getAll(), []);
  const { data, loading, error, execute } = useApi(fetchFacilities);
  const facilities = data ?? [];

  useEffect(() => {
    execute();
  }, [execute]);

  const openReservationForm = (facilityId) => {
    if (!user) {
      setReservationErrors((s) => ({ ...s, [facilityId]: 'Debes iniciar sesión para reservar.' }));
      return;
    }
    const now = new Date();
    setReservationForm({ date: now, startTime: '09:00', endTime: '10:00' });
    setReservationErrors((s) => ({ ...s, [facilityId]: '' }));
    setReservationMessage((s) => ({ ...s, [facilityId]: '' }));
    setActiveReservation(facilityId);
  };

  const cancelReservation = () => {
    setActiveReservation(null);
  };

  const submitReservation = async (facilityId) => {
    const reservationService = ServiceLocator.getInstance().reservationService;
    const { date: dateObj, startTime, endTime } = reservationForm;

    const pad = (n) => String(n).padStart(2, '0');
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const date = dateObj instanceof Date ? new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate()) : new Date(dateObj);

    const toMinutes = (t) => {
      if (!t) return NaN;
      const parts = t.split(':').map(Number);
      return parts[0] * 60 + (parts[1] || 0);
    };

    if (!date || !startTime || !endTime) {
      setReservationErrors((s) => ({ ...s, [facilityId]: 'Completa fecha y hora.' }));
      return;
    }

    if (date < today) {
      setReservationErrors((s) => ({ ...s, [facilityId]: 'La fecha seleccionada ya pasó.' }));
      return;
    }

    const startMin = toMinutes(startTime);
    const endMin = toMinutes(endTime);
    if (Number.isNaN(startMin) || Number.isNaN(endMin)) {
      setReservationErrors((s) => ({ ...s, [facilityId]: 'Formato de hora inválido.' }));
      return;
    }

    if (startMin >= endMin) {
      setReservationErrors((s) => ({ ...s, [facilityId]: 'La hora de inicio debe ser anterior a la hora de fin.' }));
      return;
    }

    // Allowed hours window
    if (startMin < RESERVATION_START_HOUR * 60 || endMin > RESERVATION_END_HOUR * 60) {
      setReservationErrors((s) => ({ ...s, [facilityId]: `Horario permitido: ${String(RESERVATION_START_HOUR).padStart(2,'0')}:00 - ${String(RESERVATION_END_HOUR).padStart(2,'0')}:00` }));
      return;
    }

    // Minimum duration
    if (endMin - startMin < RESERVATION_MIN_MINUTES) {
      setReservationErrors((s) => ({ ...s, [facilityId]: `La duración mínima de la reserva es de ${RESERVATION_MIN_MINUTES} minutos.` }));
      return;
    }

    if (date.toDateString() === today.toDateString()) {
      const nowMin = now.getHours() * 60 + now.getMinutes();
      // require start at least 30 minutes in future
      if (startMin <= nowMin + Math.min(30, RESERVATION_MIN_MINUTES)) {
        setReservationErrors((s) => ({ ...s, [facilityId]: 'La hora de inicio debe ser al menos 30 minutos en el futuro.' }));
        return;
      }
    }

    setReservationLoading(true);
    try {
      // Backend expects times with seconds
      const formatTime = (t) => (t.length === 5 ? `${t}:00` : t);
      const dateStr = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
      await reservationService.create({
        userId: user.id,
        facilityId,
        date: dateStr,
        startTime: formatTime(startTime),
        endTime: formatTime(endTime),
      });
      setReservationMessage((s) => ({ ...s, [facilityId]: 'Reserva realizada correctamente.' }));
      setReservationErrors((s) => ({ ...s, [facilityId]: '' }));
      setActiveReservation(null);
    } catch (err) {
      const msg = err?.message || 'No se pudo crear la reserva. Revisa tu conexión o inténtalo de nuevo.';
      setReservationErrors((s) => ({ ...s, [facilityId]: msg }));
    } finally {
      setReservationLoading(false);
    }
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <div className="header-content">
          <div className="header-left">
            <i className="fas fa-building"></i>
            <h1>SanFran Community</h1>
          </div>
          <div className="header-right">
            {user ? (
              <div className="user-menu">
                <span className="user-name">
                  <i className="fas fa-user-circle"></i> {user.names}
                  {isAdmin() && (
                    <i className="fas fa-star admin-badge" title="Admin"></i>
                  )}
                </span>
                {isAdmin() && (
                  <Link to="/admin" className="btn btn-small">
                    <i className="fas fa-cog"></i> Panel Admin
                  </Link>
                )}
                <button onClick={logout} className="btn btn-small btn-outline">
                  <i className="fas fa-sign-out-alt"></i> Cerrar Sesión
                </button>
              </div>
            ) : (
              <div className="auth-buttons">
                <Link to="/login" className="btn btn-small btn-outline">
                  Iniciar Sesión
                </Link>
                <Link to="/register" className="btn btn-small">
                  Registrarse
                </Link>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="home-main">
        <section className="hero">
          <div className="hero-content">
            <h2>Bienvenido a SanFran Community</h2>
            <p>Descubre nuestras increíbles instalaciones y servicios</p>
            {user && <p className="welcome-msg">¡Hola, {user.names}!</p>}
          </div>
          <img
            src="https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&h=400&fit=crop"
            alt="Community Building"
            className="hero-image"
          />
        </section>

        <section className="facilities-section">
          <h2>Nuestras Instalaciones</h2>
          {error && <div className="alert alert-error">{error}</div>}

          {loading ? (
            <Spinner message="Cargando instalaciones..." />
          ) : facilities.length === 0 ? (
            <div className="empty-state">
              <i className="fas fa-inbox"></i>
              <p>No hay facilities disponibles</p>
            </div>
          ) : (
            <div className="facilities-grid">
              {facilities.map((facility) => {
                const localBannerImage = getFacilityBannerImage(facility.name);
                const useLocalImage = !facility.imageUrl || isPlaceholderImageUrl(facility.imageUrl);
                const bannerStyle = !useLocalImage && facility.imageUrl
                  ? {
                      backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.18), rgba(15, 23, 42, 0.18)), url(${facility.imageUrl})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }
                  : localBannerImage
                  ? {
                      backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.18), rgba(15, 23, 42, 0.18)), url(${localBannerImage})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }
                  : getFacilityBannerStyle(facility.name);

                return (
                  <div key={facility.id} className="facility-card">
                    <div className="facility-banner" style={bannerStyle} />
                    <div className="facility-info">
                    <h3>{facility.name}</h3>
                    <p className="description">{facility.description}</p>
                    <div className="facility-details">
                      <span className="capacity">
                        <i className="fas fa-users"></i> Capacidad: {facility.capacity}
                      </span>
                    </div>
                    {user && (
                      activeReservation === facility.id ? (
                        <div className="reservation-form">
                          <label>
                            Fecha:{' '}
                            <ReactDatePicker
                              selected={reservationForm.date}
                              onChange={(d) => setReservationForm((s) => ({ ...s, date: d }))}
                              dateFormat="yyyy-MM-dd"
                              minDate={new Date()}
                              className="react-datepicker-input"
                            />
                          </label>
                          <label>
                            Hora inicio:{' '}
                            <input
                              type="time"
                              value={reservationForm.startTime}
                              onChange={(e) => setReservationForm((s) => ({ ...s, startTime: e.target.value }))}
                            />
                          </label>
                          <label>
                            Hora fin:{' '}
                            <input
                              type="time"
                              value={reservationForm.endTime}
                              onChange={(e) => setReservationForm((s) => ({ ...s, endTime: e.target.value }))}
                            />
                          </label>
                          <div style={{ marginTop: 8 }}>
                            <button className="btn btn-small" disabled={reservationLoading} onClick={() => submitReservation(facility.id)}>
                              {reservationLoading ? 'Reservando...' : 'Confirmar'}
                            </button>
                            <button className="btn btn-small btn-outline" style={{ marginLeft: 8 }} onClick={cancelReservation}>
                              Cancelar
                            </button>
                          </div>
                        </div>
                      ) : (
                        <Button
                          className="btn-primary btn-small"
                          onClick={() => openReservationForm(facility.id)}
                        >
                          <i className="fas fa-calendar-plus"></i> Reservar
                        </Button>
                      )
                    )}

                    {reservationErrors[facility.id] && (
                      <p className="reservation-message" style={{ color: 'var(--danger)' }}>{reservationErrors[facility.id]}</p>
                    )}
                    {reservationMessage[facility.id] && (
                      <p className="reservation-message">{reservationMessage[facility.id]}</p>
                    )}
                  </div>
                </div>
              );
            })}
            </div>
          )}
        </section>

        <section className="stats-section">
          <div className="stat-card">
            <i className="fas fa-building"></i>
            <h3>{facilities.length}</h3>
            <p>Instalaciones</p>
          </div>
          <div className="stat-card">
            <i className="fas fa-users"></i>
            <h3>+500</h3>
            <p>Residentes</p>
          </div>
          <div className="stat-card">
            <i className="fas fa-check-circle"></i>
            <h3>99%</h3>
            <p>Satisfacción</p>
          </div>
        </section>

        {!user && (
          <section className="cta-section">
            <h2>¿Listo para unirte?</h2>
            <p>Regístrate ahora y accede a todas nuestras instalaciones</p>
            <Link to="/register" className="btn btn-primary btn-large">
              Crear Cuenta
            </Link>
          </section>
        )}
      </main>

      <footer className="home-footer">
        <p>&copy; 2026 SanFran Community. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default Home;
