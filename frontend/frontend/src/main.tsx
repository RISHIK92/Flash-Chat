import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import App from './App.tsx';
import { Room } from './pages/Room.tsx';

createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
      <Routes>
        <Route path="/room" element={<Room />} />
        <Route path="/app" element={<App />} />
      </Routes>
    </BrowserRouter>
)
