import React from 'react';
import CurrencyConverter from './CurrencyConverter';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <h1 className="app-title">🌍 Conversor de Moeda</h1>
      <div className="app-content">
        <CurrencyConverter />
      </div>
      <footer className="footer">
        <p>Feito com ❤️ por Nicollas de Oliveira Micossi</p>
      </footer>
    </div>
  );
}

export default App;
