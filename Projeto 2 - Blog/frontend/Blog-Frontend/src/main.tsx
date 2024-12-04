import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import UpdatePost from './updatePost.tsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/new" element={<App />} />
      <Route path="/updatePost/:id" element={<UpdatePost />} />
    </Routes>
    </BrowserRouter>
  </StrictMode>,
)
