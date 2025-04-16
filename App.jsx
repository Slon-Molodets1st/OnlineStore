import { useState } from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css'
import NotFound from './src/NotFound'
import Authentification from './src/Authentification'
import Catalogue from './src/Catalogue'
import AdminPanel from './src/AdminPanel';
import { UserProvider } from './src/header/UserContext';

function App() {
  const [page, setPage] = useState('registration')
  
  return (
  <UserProvider>
    <Router>
    <Routes>
      <Route path='/' element={<Catalogue></Catalogue>}></Route>
      <Route path='/authentification' element={<Authentification></Authentification>}></Route>
      <Route path="*" element={<NotFound></NotFound>} />
      <Route path='/admin' element={<AdminPanel></AdminPanel>}></Route>
    </Routes>
    </Router>
    
  </UserProvider>
  )
}

export default App