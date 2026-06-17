import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { CourseProvider } from './context/CourseContext'
import { PageTransition } from './components/ui/PageTransition'
import { Hub } from './pages/Hub'
import { Landing } from './pages/Landing'
import { Course } from './pages/Course'
import { AdminPanel } from './pages/AdminPanel'

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <PageTransition key={location.key}>
      <Routes location={location}>
        <Route path="/" element={<Hub />} />
        <Route path="/calidad" element={<Landing />} />
        <Route path="/curso" element={<Course />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </PageTransition>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <CourseProvider>
        <AnimatedRoutes />
      </CourseProvider>
    </BrowserRouter>
  )
}
