import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import NotFound from './NotFound.jsx';
import './index.css'
import App from '../App.jsx'
import Authorization from './Authorization.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
      
      <App></App>
       
  </StrictMode>,
)
