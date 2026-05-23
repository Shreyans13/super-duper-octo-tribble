import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout';
import { ScrollToTop } from './components/utils/ScrollToTop';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import AllProductsPage from './pages/AllProductsPage';
import RentalsPage from './pages/RentalsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="services" element={<ProductsPage />} />
          <Route path="products" element={<AllProductsPage />} />
          <Route path="rentals" element={<RentalsPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
