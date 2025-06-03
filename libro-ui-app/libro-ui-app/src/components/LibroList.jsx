import React, { useEffect, useState, createContext, useCallback } from 'react';
import { useNotification } from './NotificationProvider'; // Adjusted the import path
import libroService from '../services/libroService';
import './Libro.css';

export const LibroListContext = createContext();

const LibroListProvider = ({ children }) => {
  const [libros, setLibros] = useState([]);
  const [error, setError] = useState(null);

  const refreshLibros = useCallback(async () => {
    try {
      const data = await libroService.getLibros();
      setLibros(data);
      setError(null); // Clear any previous errors
    } catch (err) {
      setError('Error al cargar los libros. Intente más tarde.');
    }
  }, []);

  useEffect(() => {
    refreshLibros();
  }, [refreshLibros]);

  return (
    <LibroListContext.Provider value={{ refreshLibros, libros, error }}>
      {children}
    </LibroListContext.Provider>
  );
};

const LibroList = () => {
  const { libros, error } = React.useContext(LibroListContext);
  const { showNotification } = useNotification();

  useEffect(() => {
    if (error) {
      showNotification('error', error);
    }
  }, [error, showNotification]);

  return (
    <div className="libro-list">
      <h1>Libros</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Título</th>
            <th>Autor</th>
            <th>Descripción</th>
          </tr>
        </thead>
        <tbody>
          {libros.map((libro) => (
            <tr key={libro.id}>
              <td>{libro.id}</td>
              <td>{libro.titulo}</td>
              <td>{libro.autor}</td>
              <td>{libro.descripcion}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export { LibroListProvider };
export default LibroList;