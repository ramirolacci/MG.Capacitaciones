import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { CourseProvider } from './context/CourseContext'
import { Hub } from './pages/Hub'
import { Landing } from './pages/Landing'
import { Course } from './pages/Course'
import { AdminPanel } from './pages/AdminPanel'

export default function App() {
  return (
    <BrowserRouter>
      <CourseProvider>
        <Routes>
          <Route path="/" element={<Hub />} />
          <Route path="/calidad" element={<Landing />} />
          <Route path="/curso" element={<Course />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </CourseProvider>
    </BrowserRouter>
  )
}
