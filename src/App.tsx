/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Gallery from './components/Gallery';
import ProjectPage from './ProjectPage';
import ScrollToTop from './components/ScrollToTop';
import AboutPage from './AboutPage';
import ClassificationPage from './ClassificationPage';
import ContactPage from './ContactPage';
import LoginPage from './admin/LoginPage';
import AdminDashboard from './admin/AdminDashboard';

function HomePage() {
  return (
    <main>
      <Gallery />
    </main>
  );
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen selection:bg-brand-text selection:text-brand-bg">
        <Navbar />
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/portfolio" element={<HomePage />} />
            <Route path="/classification" element={<ClassificationPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/admin/login" element={<LoginPage />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/:projectId" element={<ProjectPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

