import { Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";
import CreativeBackground from "./Components/CreativeBackground";
import NewsLetter from "./Pages/NewsLetter";
import NewCollections from "./Pages/NewCollections";
import Hero from "./Components/Hero";
//import LimitedEditions from "./Pages/LimitedEditions";
import Policy from "./Pages/Policy";
import Collections from "./Pages/Collections";
import About from "./Pages/About";
import Contact from "./Pages/Contact";
import Product from "./Pages/Product";
import Cart from "./Pages/Cart";
import PlaceOrder from "./Pages/PlaceOrder";
import Orders from "./Pages/Orders";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import SearchBar from "./Components/SearchBar";
import OrderSummary from "./Pages/OrderSummary";
import ShopNow from "./Pages/ShopNow";
//import Admin from "./Pages/Admin";
import ClothingDashboard from "./Pages/Dashboard";
import ImageUploader from "./Components/ImageUploader";
import { Toaster } from "sonner";
import OrderItems from "./Pages/OrderItems";
import MobileNavbar from "./Components/MobileNavbar";
import ProtectedRoute from "./Components/ProtectedRoute";
import Checkout from "./Pages/TestCheckoutPage";
// import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const isAdminPath = location.pathname.startsWith("/dashboard") || location.pathname.startsWith("/Dash2");
  const today = new Date();
  const showBanner = today <= new Date("2026-08-16T23:59:59.999Z") && !isAdminPath;

  return (
    <>
      <CreativeBackground />
      <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] overflow-x-hidden relative z-10">
      <Toaster />
      {showBanner && (
        <div className="sale-banner">
          <div className="sale-banner__ticker">
            <span>August Summer Sales !!!</span>
            <span>20% OFF All Items</span>
            <span>You don't want to miss this !!!</span>
            <span>August Summer Sales !!!</span>
            <span>20% OFF All Items</span>
            <span>You don't want to miss this !!!</span>
          </div>
        </div>
      )}
      <Navbar
        setVisible={setVisible}
        loading={loading}
        setLoading={setLoading}
      />
      <SearchBar />
      <MobileNavbar visible={visible} setVisible={setVisible} />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Hero />
              <NewCollections />
              <ShopNow />
              {/*<LimitedEditions />*/}
              <Policy />
              <NewsLetter />
            </>
          }
        />
        <Route path="/collections" element={<Collections />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/dashboard" element={<ProtectedRoute> <ClothingDashboard /></ProtectedRoute>} />
        {/* <Route path="/testing" element={<Testing/>}/> */}
        <Route path="/Dash2" element={<ImageUploader />} />

        <Route path="/cart" element={<Cart />} />
        <Route path="/placeorder" element={<PlaceOrder />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/order-summary" element={<OrderSummary />} />
        <Route path="/order-items/:orderId" element={<OrderItems />} />
        <Route path="/test-paystack" element={<Checkout/>}/>
      </Routes>
      <Footer />
      </div>
    </>
  );
};

export default App;
