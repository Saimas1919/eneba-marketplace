import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/layout/Navbar";
import Navigation from "./components/layout/Navigation";
import Footer from "./components/layout/Footer";
import ScrollToTop from "./components/layout/ScrollToTop";
import CartSuccessModal from "./components/cart/CartSuccessModal";

import Home from "./pages/Home";
import Store from "./pages/Store";
import ProductPage from "./pages/ProductPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import OrderSuccess from "./pages/OrderSuccess";
import OrderHistory from "./pages/OrderHistory";

function Layout() {
  const location = useLocation();
  
  // Hide global layout for auth, cart, checkout, and the new light-theme dashboard
  const hideGlobalLayout = 
    location.pathname === "/login" || 
    location.pathname === "/register" || 
    location.pathname === "/cart" ||
    location.pathname === "/checkout" ||
    location.pathname === "/order-success" ||
    location.pathname === "/orders"; // <-- Added /orders

  return (
    <div className="min-h-screen bg-[#4618ac]">
      {!hideGlobalLayout && (
        <>
          <Navbar />
          <Navigation />
        </>
      )}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/store" element={<Store />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/orders" element={<OrderHistory />} />
      </Routes>

      {!hideGlobalLayout && <Footer />}
      
      <CartSuccessModal />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Layout />
      </Router>
    </AuthProvider>
  );
}

export default App;