import React, { useState } from 'react';
import Modal from './Modal';

const AddUserModal = ({ visible, onClose, onSave }) => {
  const [names, setNames] = useState('');
  const [email, setEmail] = useState('');
  const [idDocument, setIdDocument] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('RESIDENT');
  const [subRole, setSubRole] = useState('TENANT');

  const handleSave = () => {
    if (!names || !email || !password || password !== confirmPassword) {
      alert('Completa todos los campos y asegúrate de que las contraseñas coincidan.');
      return;
    }
    onSave({ names, email, idDocument, password, role, subRole });
  };

  return (
    <Modal visible={visible} title="Agregar Usuario" onClose={onClose}>
      <div className="form-row">
        <label>Nombre</label>
        <input value={names} onChange={(e) => setNames(e.target.value)} />
      </div>
      <div className="form-row">
        <label>Email</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="form-row">
        <label>Documento</label>
        <input value={idDocument} onChange={(e) => setIdDocument(e.target.value)} />
      </div>
      <div className="form-row">
        <label>Contraseña</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div className="form-row">
        <label>Confirmar Contraseña</label>
        <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
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
      <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
        <button className="btn btn-success" onClick={handleSave}>Guardar</button>
        <button className="btn btn-danger" onClick={onClose}>Cancelar</button>
      </div>
    </Modal>
  );
};

export default AddUserModal;
