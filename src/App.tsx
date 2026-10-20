import { HashRouter, Routes, Route } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HomePage from '@/pages/HomePage';
import DesignStudio from '@/pages/DesignStudio';
import CollectionsPage from '@/pages/CollectionsPage';
import MyDesignsPage from '@/pages/MyDesignsPage';
import AboutPage from '@/pages/AboutPage';
import { ToastProvider } from '@/components/Toast';

function App() {
  return (
    <ToastProvider>
      <HashRouter>
        <div className="fv-app">
          <Navbar />
          <main className="fv-main">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/studio" element={<DesignStudio />} />
              <Route path="/collections" element={<CollectionsPage />} />
              <Route path="/my-designs" element={<MyDesignsPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="*" element={<HomePage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </HashRouter>
    </ToastProvider>
  );
}

export default App;
