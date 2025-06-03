import React, { useState, useContext } from 'react';
import libroService from '../services/libroService';
import { LibroListContext } from './LibroList';
import { validateRequired, validateMinLength, validateForm } from '../utils/validation';
import './Libro.css';
import { useNotification } from './NotificationProvider';

const LibroForm = () => {
  const [formData, setFormData] = useState({
    titulo: '',
    autor: '',
    descripcion: '',
  });

  const [errors, setErrors] = useState({});
  const { refreshLibros } = useContext(LibroListContext);
  const { showNotification } = useNotification();

  const validations = {
    titulo: [validateRequired, (value) => validateMinLength(value, 3)],
    autor: [validateRequired],
    descripcion: [validateRequired],
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm(formData, validations);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await libroService.createLibro(formData);
      refreshLibros();
      showNotification('success', `Libro creado: ${formData.titulo}`);
      setFormData({ titulo: '', autor: '', descripcion: '' });
      setErrors({});
    } catch (error) {
      if (error.response) {
        showNotification('error', `Error del servidor: ${error.response.data.message || 'Intente más tarde.'}`);
      } else if (error.request) {
        showNotification('error', 'No se pudo conectar con el servidor. Verifique su conexión.');
      } else {
        showNotification('error', 'Ocurrió un error inesperado. Intente más tarde.');
      }
    }
  };

  return (
    <div className="libro-form">
      <h1>Crear Libro</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Título:
          <input
            type="text"
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
          />
          {errors.titulo && <span className="error">{errors.titulo}</span>}
        </label>
        <label>
          Autor:
          <input
            type="text"
            name="autor"
            value={formData.autor}
            onChange={handleChange}
          />
          {errors.autor && <span className="error">{errors.autor}</span>}
        </label>
        <label>
          Descripción:
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
          />
          {errors.descripcion && <span className="error">{errors.descripcion}</span>}
        </label>
        <button type="submit">Crear</button>
      </form>
    </div>
  );
};

export default LibroForm;