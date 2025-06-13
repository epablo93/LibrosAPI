import React, { memo } from 'react';
import './App.css';
import LibroList from './components/LibroList';
import LibroForm from './components/LibroForm';
import { LibroListProvider } from './components/LibroList';
import { NotificationProvider } from './components/NotificationProvider';

const App = memo(() => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Libros App</h1>
      </header>
      <main>
        <NotificationProvider>
          <LibroListProvider>
            <LibroForm />
            <LibroList />
          </LibroListProvider>
        </NotificationProvider>
      </main>
    </div>
  );
});

export default App;
