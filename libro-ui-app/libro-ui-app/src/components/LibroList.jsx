import React, { useEffect, useState, createContext, useCallback, memo, useRef, useMemo } from 'react';
import { useNotification } from './NotificationProvider'; // Adjusted the import path
import libroService from '../services/libroService';
import SearchBox from './SearchBox';
import './Libro.css';

export const LibroListContext = createContext();

const LibroListProvider = ({ children }) => {
  const [libros, setLibros] = useState([]);
  const [error, setError] = useState(null);
  const hasInitialized = useRef(false);

  const refreshLibros = useCallback(async () => {
    try {
      const data = await libroService.getLibros();
      setLibros(data);
      setError(null); // Clear any previous errors
    } catch (err) {
      setError('Error al cargar los libros. Intente más tarde.');
    }
  }, []);

  const initialLoad = useCallback(async () => {
    // Prevent duplicate calls during React StrictMode
    if (hasInitialized.current) return;
    hasInitialized.current = true;
    await refreshLibros();
  }, [refreshLibros]);

  useEffect(() => {
    initialLoad();
  }, [initialLoad]);

  const contextValue = useCallback(() => ({
    refreshLibros,
    libros,
    error
  }), [refreshLibros, libros, error]);

  return (
    <LibroListContext.Provider value={contextValue()}>
      {children}
    </LibroListContext.Provider>
  );
};

const LibroList = memo(() => {
  const { libros, error } = React.useContext(LibroListContext);
  const { showNotification } = useNotification();
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (error) {
      showNotification('error', error);
    }
  }, [error, showNotification]);

  const handleSearch = useCallback((term) => {
    setSearchTerm(term);
  }, []);

  const filteredLibros = useMemo(() => {
    if (!searchTerm) return libros;
    
    return libros.filter(libro => 
      libro.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      libro.autor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      libro.descripcion.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [libros, searchTerm]);

  return (
    <div className="libro-list">
      <h1>Libros</h1>
      <SearchBox onSearch={handleSearch} placeholder="Buscar libros..." />
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
          {filteredLibros.map((libro) => (
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
});

export { LibroListProvider };
export default LibroList;