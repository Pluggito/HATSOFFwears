import { Routes, Route } from "react-router"
import Home from './Pages/Home'
import Collections from './Pages/Collections'
import About from './Pages/About'
import Contact from './Pages/Contact'
import Product from './Pages/Product'
import Cart from './Pages/Cart'
import PlaceOrder from './Pages/PlaceOrder'
import Orders from './Pages/Orders'
import Navbar from './Components/Navbar'
import Footer from "./Components/Footer"
import SearchBar from "./Components/SearchBar"
import { ToastContainer } from 'react-toastify';
import { SearchProvider } from './context/SearchContext';
// import 'react-toastify/dist/ReactToastify.css'


const App = () => {
  return (
    <SearchProvider>
      <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
        <ToastContainer />
        <Navbar />
        <SearchBar />
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/collections" element={<Collections />}/>
          <Route path="/about" element={<About />}/>
          <Route path="/contact" element={<Contact />}/>
          <Route path="/product/:productId" element={<Product />}/>

          <Route path="/cart" element={<Cart />}/>
          <Route path="/placeorder" element={<PlaceOrder />}/>
          <Route path="/orders" element={<Orders />}/>
        </Routes>
        <Footer/>
      </div>
    </SearchProvider>
  )
}

export default App