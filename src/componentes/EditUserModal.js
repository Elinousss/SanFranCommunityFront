import React, { useState, useEffect } from 'react';
import Modal from './Modal';

const EditUserModal = ({ visible, title = 'Editar Usuario', initialData, onClose, onSave }) => {
  const [names, setNames] = useState('');
  const [email, setEmail] = useState('');
  const [idDocument, setIdDocument] = useState('');
  const [role, setRole] = useState('RESIDENT');
  const [subRole, setSubRole] = useState('TENANT');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  useEffect(() => {
    if (initialData) {
      setNames(initialData.names || '');
      setEmail(initialData.email || '');
      setIdDocument(initialData.idDocument || '');
      setRole(initialData.role || 'RESIDENT');
      setSubRole(initialData.subRole || 'TENANT');
      setPassword('');
      setConfirmPassword('');
    }
  }, [initialData]);

  const handleSave = () => {
    if (!names || !email) {
      alert('Nombre y email son requeridos');
      return;
    }
    if (password && password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    const data = { names, email, idDocument, role, subRole };
    if (password) {
      data.password = password;
    }
    onSave(data);
  };

  return (
    <Modal visible={visible} title="Editar Usuario" onClose={onClose}>
      <div className="form-row">
        <label>Nombre</label>
        <input value={names} onChange={(e) => setNames(e.target.value)} />
      </div>
      <div className="form-row">
        <label>Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="form-row">
        <label>Documento</label>
        <input value={idDocument} onChange={(e) => setIdDocument(e.target.value)} />
      </div>
      <div className="form-row">
        <label>Rol</label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="RESIDENT">RESIDENT</option>
          <option value="STAFF">STAFF</option>
          <option value="ADMIN">ADMIN</option>
        </select>
      </div>
      <div className="form-row">
        <label>Sub-rol</label>
        <select value={subRole} onChange={(e) => setSubRole(e.target.value)}>
          <option value="OWNER">OWNER</option>
          <option value="TENANT">TENANT</option>
          <option value="GUEST">GUEST</option>
        </select>
      </div>
      <div className="form-row">
        <label>Nueva Contraseña (opcional)</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Dejar en blanco para no cambiar" />
      </div>
      <div className="form-row">
        <label>Confirmar Contraseña</label>
        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Dejar en blanco para no cambiar" />
      </div>
      <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
        <button className="btn" onClick={handleSave}>Guardar</button>
        <button className="btn btn-danger" onClick={onClose}>Cancelar</button>
      </div>
    </Modal>
  );
};

export default EditUserModal;
