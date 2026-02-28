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
import Login from './pages/Login';
import Register from './pages/Register';
import ProtectedRoute from './components/ProtectedRoute';

import BuyerLayout from './layouts/BuyerLayout';
import BuyerDashboard from './pages/buyer/Dashboard';
import BuyerOrders from './pages/buyer/Orders';
import BuyerProfile from './pages/buyer/Profile';

import SellerLayout from './layouts/SellerLayout';
import SellerDashboard from './pages/seller/Dashboard';
import ManageProducts from './pages/seller/ManageProducts';
import ManageOrders from './pages/seller/ManageOrders';
import ManageManagers from './pages/seller/ManageManagers';
import ManageBranches from './pages/seller/ManageBranches';
import Reports from './pages/seller/Reports';

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
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Buyer Routes */}
            <Route path="/buyer" element={<ProtectedRoute allowedRoles={['buyer']}><BuyerLayout /></ProtectedRoute>}>
              <Route index element={<BuyerDashboard />} />
              <Route path="orders" element={<BuyerOrders />} />
              <Route path="profile" element={<BuyerProfile />} />
            </Route>

            {/* Seller Routes */}
            <Route path="/seller" element={<ProtectedRoute allowedRoles={['admin', 'manager']}><SellerLayout /></ProtectedRoute>}>
              <Route index element={<SellerDashboard />} />
              <Route path="products" element={<ManageProducts />} />
              <Route path="orders" element={<ManageOrders />} />
              <Route path="managers" element={<ManageManagers />} />
              <Route path="branches" element={<ManageBranches />} />
              <Route path="reports" element={<Reports />} />
            </Route>
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
