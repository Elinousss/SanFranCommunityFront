import React, { useState, useEffect } from 'react';
import Modal from './Modal';

const AddFacilityModal = ({ visible, onClose, onSave }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [capacity, setCapacity] = useState(1);
  const [imageUrl, setImageUrl] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');

  const revokePreview = (url) => {
    if (url && url.startsWith('blob:')) {
      URL.revokeObjectURL(url);
    }
  };

  useEffect(() => {
    if (!visible) {
      setName('');
      setDescription('');
      setCapacity(1);
      setImageUrl('');
      setSelectedFile(null);
      revokePreview(previewUrl);
      setPreviewUrl('');
    }
  }, [visible]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    revokePreview(previewUrl);
    const objectUrl = URL.createObjectURL(file);
    setSelectedFile(file);
    setPreviewUrl(objectUrl);
    setImageUrl('');
  };

  const handleImageUrlChange = (value) => {
    if (selectedFile) {
      revokePreview(previewUrl);
      setSelectedFile(null);
    }
    setImageUrl(value);
    setPreviewUrl(value);
  };

  const handleSave = () => {
    const cap = Number(capacity);
    if (!name || !description || Number.isNaN(cap) || cap < 1) {
      alert('Completa todos los campos correctamente');
      return;
    }

    const finishSave = (url) => {
      onSave({ name, description, capacity: cap, imageUrl: url });
    };

    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        finishSave(reader.result || '');
      };
      reader.readAsDataURL(selectedFile);
      return;
    }

    finishSave(imageUrl.trim());
  };

  return (
    <Modal visible={visible} title="Agregar Facility" onClose={onClose}>
      <div className="form-row">
        <label>Nombre</label>
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div className="form-row">
        <label>Descripción</label>
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <div className="form-row">
        <label>Capacidad</label>
        <input type="number" value={capacity} onChange={(e) => setCapacity(e.target.value)} />
      </div>
      <div className="form-row">
        <label>Imagen de referencia</label>
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <input
          type="text"
          placeholder="URL de imagen o deja el archivo seleccionado"
          value={imageUrl}
          onChange={(e) => handleImageUrlChange(e.target.value)}
        />
      </div>
      {previewUrl && (
        <div className="form-row image-preview-row">
          <label>Vista previa</label>
          <img className="image-preview" src={previewUrl} alt="Preview" />
        </div>
      )}
      <div style={{ marginTop: 12, display: 'flex', gap: 8 }}>
        <button className="btn btn-success" onClick={handleSave}>Guardar</button>
        <button className="btn btn-danger" onClick={onClose}>Cancelar</button>
      </div>
    </Modal>
  );
};

export default AddFacilityModal;
