
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ParticleBackground } from './components/ParticleBackground';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Newspapers } from './pages/Newspapers';
import { BusinessAreas } from './pages/BusinessAreas';
import { AboutUs } from './pages/AboutUs';
import { ScandicGroup } from './pages/ScandicGroup';
import { Login } from './pages/auth/Login';
import { Signup } from './pages/auth/Signup';
import { ForgotPassword } from './pages/auth/ForgotPassword';
import { OTPVerification } from './pages/auth/OTPVerification';
import { ResetPassword } from './pages/auth/ResetPassword';
import { Success } from './pages/auth/Success';
export function App() {
  return <BrowserRouter>
    <div className="relative min-h-screen bg-graphite">
      <ParticleBackground />

      <div className="content-layer">
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/newspapers" element={<Newspapers />} />
          <Route path="/business-areas" element={<BusinessAreas />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/scandic-group" element={<ScandicGroup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/otp-verification" element={<OTPVerification />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/success" element={<Success />} />
        </Routes>

        <Footer />
      </div>
    </div>
  </BrowserRouter>;
}