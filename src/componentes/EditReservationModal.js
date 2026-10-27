import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const EditReservationModal = ({ visible, title = 'Editar Reservación', initialData, onClose, onSave }) => {
  const [date, setDate] = useState(new Date());
  const [startTime, setStartTime] = useState('09:00');
  const [endTime, setEndTime] = useState('10:00');
  const [status, setStatus] = useState('PENDING');

  useEffect(() => {
    if (initialData) {
      setDate(initialData.date ? new Date(initialData.date) : new Date());
      setStartTime(initialData.startTime ? initialData.startTime.substring(0,5) : '09:00');
      setEndTime(initialData.endTime ? initialData.endTime.substring(0,5) : '10:00');
      setStatus(initialData.status || 'PENDING');
    }
  }, [initialData]);

  const pad = (n) => String(n).padStart(2, '0');

  const handleSave = () => {
    if (!date || !startTime || !endTime) {
      alert('Fecha y horas requeridas');
      return;
    }
    const dateStr = `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
    const fmt = (t) => (t.length === 5 ? `${t}:00` : t);
    onSave({ date: dateStr, startTime: fmt(startTime), endTime: fmt(endTime), status });
  };

  return (
    <Modal visible={visible} title="Editar Reservación" onClose={onClose}>
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
        <button className="btn" onClick={handleSave}>Guardar</button>
        <button className="btn btn-danger" onClick={onClose}>Cancelar</button>
      </div>
    </Modal>
  );
};

export default EditReservationModal;
