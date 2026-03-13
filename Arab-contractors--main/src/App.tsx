import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ProjectsPage from './pages/ProjectsPage';
import GalleryPage from './pages/GalleryPage';
import SectorsPage from './pages/SectorsPage';
import NewsPage from './pages/NewsPage';
import ContactPage from './pages/ContactPage';
import InnovationPage from './pages/InnovationPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import Layout from './components/Layout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout><HomePage /></Layout>} />
      <Route path="/about" element={<Layout><AboutPage /></Layout>} />
      <Route path="/projects" element={<Layout><ProjectsPage /></Layout>} />
      <Route path="/projects/:id" element={<Layout><ProjectDetailPage /></Layout>} />
      <Route path="/gallery" element={<Layout><GalleryPage /></Layout>} />
      <Route path="/sectors" element={<Layout><SectorsPage /></Layout>} />
      <Route path="/news" element={<Layout><NewsPage /></Layout>} />
      <Route path="/contact" element={<Layout><ContactPage /></Layout>} />
      <Route path="/innovation" element={<Layout><InnovationPage /></Layout>} />
      <Route path="*" element={<Layout><div className="section text-center"><h1>404</h1><p>Page Not Found</p></div></Layout>} />
    </Routes>
  );
}

export default App;
