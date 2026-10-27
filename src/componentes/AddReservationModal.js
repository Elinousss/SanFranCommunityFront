import React, { useState } from 'react';
import Modal from './Modal';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AddReservationModal = ({ visible, onClose, onSave, users, facilities }) => {
  const [userId, setUserId] = useState(users?.[0]?.id || '');
  const [facilityId, setFacilityId] = useState(facilities?.[0]?.id || '');
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('10:00');
  const [status, setStatus] = useState('PENDING');

  const pad = (n) => String(n).padStart(2, '0');

  const handleSave = () => {
    if (!userId || !facilityId || !date || !startTime || !endTime) {
      alert('Completa todos los campos');
      return;
    }
    const dateStr = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
    const formatTime = (t) => (t.length === 5 ? `${t}:00` : t);
    onSave({ userId, facilityId, date: dateStr, startTime: formatTime(startTime), endTime: formatTime(endTime), status });
  };

  return (
    <Modal visible={visible} title="Agregar Reservación" onClose={onClose}>
      <div className="form-row">
        <label>Usuario</label>
        <select value={userId} onChange={(e) => setUserId(e.target.value)}>
          {users?.map((u) => (
            <option key={u.id} value={u.id}>{u.names}</option>
          ))}
        </select>
      </div>
      <div className="form-row">
        <label>Facility</label>
        <select value={facilityId} onChange={(e) => setFacilityId(e.target.value)}>
          {facilities?.map((f) => (
            <option key={f.id} value={f.id}>{f.name}</option>
          ))}
        </select>
      </div>
      <div className="form-row">
        <label>Fecha</label>
        <ReactDatePicker selected={date} onChange={(d) => setDate(d)} dateFormat="yyyy-MM-dd" />
      </div>
      <div className="form-row">
        <label>Hora Inicio</label>
        <input type="time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
      </div>
      <div className="form-row">
        <label>Hora Fin</label>
        <input type="time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
      </div>
      <div className="form-row">
        <label>Estado</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="PENDING">PENDING</option>
          <option value="CONFIRMED">CONFIRMED</option>
          <option value="CANCELLED">CANCELLED</option>
        </select>
      </div>
      <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
        <button className="btn btn-success" onClick={handleSave}>Guardar</button>
        <button className="btn btn-danger" onClick={onClose}>Cancelar</button>
      </div>
    </Modal>
  );
};

export default AddReservationModal;
