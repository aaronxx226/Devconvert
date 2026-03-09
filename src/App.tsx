import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Header, Footer } from './components/Layout';
import { Home } from './pages/Home';
import { ToolPage } from './pages/ToolPage';
import { ToolsDirectory } from './pages/ToolsDirectory';
import { SEOPage } from './pages/SEOPage';
import { ErrorLibrary } from './pages/ErrorLibrary';
import { ErrorPage } from './pages/ErrorPage';
import { About, Privacy, Terms, Contact } from './pages/StaticPages';

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <div className="min-h-screen flex flex-col bg-white dark:bg-zinc-950 transition-colors duration-300">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/tools" element={<ToolsDirectory />} />
              <Route path="/tools/:slug" element={<ToolPage />} />
              <Route path="/errors" element={<ErrorLibrary />} />
              <Route path="/errors/:slug" element={<ErrorPage />} />
              <Route path="/about" element={<About />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/:seoSlug" element={<SEOPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </HelmetProvider>
  );
}
