import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
//import de bootstrap para los estilos
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/Custom-color/custom.scss'
//import para el fondo de la pantalla
import './Style.css'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

