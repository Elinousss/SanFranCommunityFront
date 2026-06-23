import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../presentation/hooks/useAuth';
import { Link } from 'react-router-dom';
import { ServiceLocator } from '../infrastructure/service-locator';
import '../styles/admin.css';
import EditUserModal from '../components/EditUserModal';
import EditFacilityModal from '../components/EditFacilityModal';
import EditReservationModal from '../components/EditReservationModal';
import AddUserModal from '../components/AddUserModal';
import AddFacilityModal from '../components/AddFacilityModal';
import AddReservationModal from '../components/AddReservationModal';

const userService = ServiceLocator.getInstance().userService;
const facilityService = ServiceLocator.getInstance().facilityService;
const reservationService = ServiceLocator.getInstance().reservationService;

const AdminPanel = () => {
  const { user, logout } = useAuth();

  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState([]);
  const [facilities, setFacilities] = useState([]);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Modals / editing state
  const [showUserModal, setShowUserModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [showFacilityModal, setShowFacilityModal] = useState(false);
  const [editingFacility, setEditingFacility] = useState(null);
  const [showReservationModal, setShowReservationModal] = useState(false);
  const [editingReservation, setEditingReservation] = useState(null);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showAddFacilityModal, setShowAddFacilityModal] = useState(false);
  const [showAddReservationModal, setShowAddReservationModal] = useState(false);

  const loadData = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      if (activeTab === 'users') {
        const usersList = await userService.getAll();
        setUsers(usersList);
      } else if (activeTab === 'facilities') {
        const facilitiesList = await facilityService.getAll();
        setFacilities(facilitiesList);
      } else if (activeTab === 'reservations') {
        const reservationsList = await reservationService.getAll();
        setReservations(reservationsList);
      }
    } catch (err) {
      console.error('Error:', err);
      setError(err?.message || 'Error al conectar con el servidor');
    } finally {
      setLoading(false);
    }
  }, [activeTab]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleDeleteUser = async (userId) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      try {
        await userService.delete(userId);
        setSuccess('Usuario eliminado correctamente');
        loadData();
      } catch (err) {
        setError(err?.message || 'Error al eliminar usuario');
      }
    }
  };

  const handleEditUser = (u) => {
    setEditingUser(u);
    setShowUserModal(true);
  };

  const saveUser = async (data) => {
    try {
      await userService.update(editingUser.id, data);
      setSuccess('Usuario actualizado correctamente');
      setShowUserModal(false);
      setEditingUser(null);
      loadData();
    } catch (err) {
      setError(err?.message || 'Error al actualizar usuario');
    }
  };

  const openAddUser = () => {
    setShowAddUserModal(true);
  };

  const saveNewUser = async (data) => {
    try {
      await userService.create(data);
      setSuccess('Usuario agregado correctamente');
      setShowAddUserModal(false);
      loadData();
    } catch (err) {
      setError(err?.message || 'Error al agregar usuario');
    }
  };

  const handleDeleteFacility = async (facilityId) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta facility?')) {
      try {
        await facilityService.delete(facilityId);
        setSuccess('Facility eliminada correctamente');
        loadData();
      } catch (err) {
        setError(err?.message || 'Error al eliminar facility');
      }
    }
  };

  const handleEditFacility = (f) => {
    setEditingFacility(f);
    setShowFacilityModal(true);
  };

  const saveFacility = async (data) => {
    try {
      await facilityService.update(editingFacility.id, data);
      setSuccess('Facility actualizada correctamente');
      setShowFacilityModal(false);
      setEditingFacility(null);
      loadData();
    } catch (err) {
      setError(err?.message || 'Error al actualizar facility');
    }
  };

  const openAddFacility = () => {
    setShowAddFacilityModal(true);
  };

  const saveNewFacility = async (data) => {
    try {
      await facilityService.create(data);
      setSuccess('Facility agregada correctamente');
      setShowAddFacilityModal(false);
      loadData();
    } catch (err) {
      setError(err?.message || 'Error al agregar facility');
    }
  };

  const handleEditReservation = (r) => {
    setEditingReservation(r);
    setShowReservationModal(true);
  };

  const saveReservation = async (data) => {
    try {
      await reservationService.update(editingReservation.id, data);
      setSuccess('Reservación actualizada correctamente');
      setShowReservationModal(false);
      setEditingReservation(null);
      loadData();
    } catch (err) {
      setError(err?.message || 'Error al actualizar reservación');
    }
  };

  const openAddReservation = async () => {
    if (users.length === 0 || facilities.length === 0) {
      setLoading(true);
      try {
        const [usersList, facilitiesList] = await Promise.all([
          userService.getAll(),
          facilityService.getAll(),
        ]);
        setUsers(usersList);
        setFacilities(facilitiesList);
      } catch (err) {
        setError(err?.message || 'Error al cargar usuarios o facilities');
      } finally {
        setLoading(false);
      }
    }
    setShowAddReservationModal(true);
  };

  const saveNewReservation = async (data) => {
    try {
      await reservationService.create(data);
      setSuccess('Reservación agregada correctamente');
      setShowAddReservationModal(false);
      loadData();
    } catch (err) {
      setError(err?.message || 'Error al agregar reservación');
    }
  };

  return (
    <div className="admin-panel">
      <header className="admin-header">
        <div className="admin-header-content">
          <div className="admin-title">
            <div className="admin-back">
              <Link to="/" className="link back-link">← Volver a Home</Link>
            </div>
            <i className="fas fa-shield-alt"></i>
            <h1>Panel de Administración</h1>
          </div>
          <div className="admin-user-info">
            <span>
              <i className="fas fa-user-circle"></i> {user?.names}
            </span>
            <button onClick={logout} className="btn btn-logout">
              <i className="fas fa-sign-out-alt"></i> Cerrar Sesión
            </button>
          </div>
        </div>
      </header>

      <div className="admin-container">
        <nav className="admin-nav">
          <button
            className={`nav-item ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            <i className="fas fa-users"></i>
            Usuarios
          </button>
          <button
            className={`nav-item ${activeTab === 'facilities' ? 'active' : ''}`}
            onClick={() => setActiveTab('facilities')}
          >
            <i className="fas fa-building"></i>
            Facilities
          </button>
          <button
            className={`nav-item ${activeTab === 'reservations' ? 'active' : ''}`}
            onClick={() => setActiveTab('reservations')}
          >
            <i className="fas fa-calendar"></i>
            Reservaciones
          </button>
        </nav>

        <main className="admin-content">
          {error && (
            <div className="alert alert-error">
              <i className="fas fa-exclamation-circle"></i> {error}
              <button onClick={() => setError('')} className="alert-close">
                ×
              </button>
            </div>
          )}

          {success && (
            <div className="alert alert-success">
              <i className="fas fa-check-circle"></i> {success}
              <button onClick={() => setSuccess('')} className="alert-close">
                ×
              </button>
            </div>
          )}

          {loading ? (
            <div className="loading">
              <div className="spinner"></div>
              <p>Cargando...</p>
            </div>
          ) : activeTab === 'users' ? (
            <div className="tab-content">
              <h2>Gestión de Usuarios ({users.length})</h2>
              <div className="table-wrapper">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nombre</th>
                      <th>Email</th>
                      <th>Documento</th>
                      <th>Rol</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.length === 0 ? (
                      <tr>
                        <td colSpan="6" style={{ textAlign: 'center', padding: '20px' }}>
                          No hay usuarios
                        </td>
                      </tr>
                    ) : (
                      users.map((u) => (
                        <tr key={u.id}>
                          <td>{u.id}</td>
                          <td>{u.names}</td>
                          <td>{u.email}</td>
                          <td>{u.idDocument}</td>
                          <td>
                            <span className={`role-badge role-${u.role?.toLowerCase()}`}>
                              {u.role}
                            </span>
                          </td>
                          <td>
                            <button
                              className="btn btn-small btn-primary"
                              onClick={() => handleEditUser(u)}
                              title="Editar usuario"
                            >
                              <i className="fas fa-edit"></i>
                            </button>
                            <button
                              className="btn btn-small btn-danger"
                              onClick={() => handleDeleteUser(u.id)}
                              style={{ marginLeft: 8 }}
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan="6" className="table-footer-cell">
                        <button className="btn btn-add" onClick={openAddUser}>
                          <i className="fas fa-plus"></i> Agregar Usuario
                        </button>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          ) : activeTab === 'facilities' ? (
            <div className="tab-content">
              <h2>Gestión de Facilities ({facilities.length})</h2>
              <div className="table-wrapper">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nombre</th>
                      <th>Descripción</th>
                      <th>Capacidad</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {facilities.length === 0 ? (
                      <tr>
                        <td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>
                          No hay facilities
                        </td>
                      </tr>
                    ) : (
                      facilities.map((f) => (
                        <tr key={f.id}>
                          <td>{f.id}</td>
                          <td>{f.name}</td>
                          <td>{f.description}</td>
                          <td>{f.capacity}</td>
                          <td>
                            <button
                              className="btn btn-small btn-primary"
                              onClick={() => handleEditFacility(f)}
                              title="Editar facility"
                            >
                              <i className="fas fa-edit"></i>
                            </button>
                            <button
                              className="btn btn-small btn-danger"
                              onClick={() => handleDeleteFacility(f.id)}
                              style={{ marginLeft: 8 }}
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan="5" className="table-footer-cell">
                        <button className="btn btn-add" onClick={openAddFacility}>
                          <i className="fas fa-plus"></i> Agregar Facility
                        </button>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          ) : (
            <div className="tab-content">
              <h2>Gestión de Reservaciones ({reservations.length})</h2>
              <div className="table-wrapper">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Usuario</th>
                      <th>Facility</th>
                      <th>Fecha</th>
                      <th>Hora</th>
                      <th>Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reservations.length === 0 ? (
                      <tr>
                        <td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>
                          No hay reservaciones
                        </td>
                      </tr>
                    ) : (
                      reservations.map((r) => (
                        <tr key={r.id}>
                          <td>{r.id}</td>
                          <td>{r.userId}</td>
                          <td>{r.facilityId}</td>
                          <td>{r.date ? new Date(r.date).toLocaleDateString() : '-'}</td>
                          <td>{r.startTime ? r.startTime : '-'} - {r.endTime ? r.endTime : '-'}</td>
                          <td>
                            <span className={`status-badge ${r.status ? `status-${r.status.toLowerCase()}` : 'status-unknown'}`}>
                              {r.status || 'PENDIENTE'}
                            </span>
                            <div style={{ marginTop: 6 }}>
                              <button
                                className="btn btn-small btn-primary"
                                onClick={() => handleEditReservation(r)}
                                title="Editar reservación"
                              >
                                <i className="fas fa-edit"></i>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colSpan="6" className="table-footer-cell">
                        <button className="btn btn-add" onClick={openAddReservation}>
                          <i className="fas fa-plus"></i> Agregar Reservación
                        </button>
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>
          )}
        </main>
        {/* Modals */}
        <EditUserModal
          visible={showUserModal}
          initialData={editingUser}
          onClose={() => { setShowUserModal(false); setEditingUser(null); }}
          onSave={saveUser}
        />
        <EditFacilityModal
          visible={showFacilityModal}
          initialData={editingFacility}
          onClose={() => { setShowFacilityModal(false); setEditingFacility(null); }}
          onSave={saveFacility}
        />
        <EditReservationModal
          visible={showReservationModal}
          initialData={editingReservation}
          onClose={() => { setShowReservationModal(false); setEditingReservation(null); }}
          onSave={saveReservation}
        />
        <AddUserModal
          visible={showAddUserModal}
          onClose={() => setShowAddUserModal(false)}
          onSave={saveNewUser}
        />
        <AddFacilityModal
          visible={showAddFacilityModal}
          onClose={() => setShowAddFacilityModal(false)}
          onSave={saveNewFacility}
        />
        <AddReservationModal
          visible={showAddReservationModal}
          onClose={() => setShowAddReservationModal(false)}
          onSave={saveNewReservation}
          users={users}
          facilities={facilities}
        />
      </div>
    </div>
  );
};

export default AdminPanel;
