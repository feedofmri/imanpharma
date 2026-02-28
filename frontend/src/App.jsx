import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './Theme.jsx';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Contact from './pages/Contact';
import Products from './pages/Products';
import FAQ from './pages/FAQ';
import OrderDetails from './pages/OrderDetails';
import ProductDetails from './pages/ProductDetails';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/order-details" element={<OrderDetails />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
