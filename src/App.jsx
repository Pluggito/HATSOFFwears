import { Routes, Route } from "react-router"
import NewsLetter from "./Pages/NewsLetter"
import NewCollections from './Pages/NewCollections'
import Hero from './Components/Hero'
import LimitedEditions from './Pages/LimitedEditions'
import Policy from './Pages/Policy'
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
import OrderSummary from "./Pages/OrderSummary"
import ShopNow from "./Pages/ShopNow"
// import 'react-toastify/dist/ReactToastify.css'


const App = () => {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <ToastContainer />
      <Navbar />
      <SearchBar />
      <Routes>
        <Route path="/" element={<>
            <Hero /> 
          <NewCollections />
          <ShopNow/>
          <LimitedEditions />
          <Policy />
          <NewsLetter />
          </>}/>
        <Route path="/collections" element={<Collections />}/>
        <Route path="/about" element={<About />}/>
        <Route path="/contact" element={<Contact />}/>
        <Route path="/product/:productId" element={<Product />}/>

        <Route path="/cart" element={<Cart />}/>
        <Route path="/placeorder" element={<PlaceOrder />}/>
        <Route path="/orders" element={<Orders />}/>
        <Route path="/order-summary" element={<OrderSummary />}/>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App