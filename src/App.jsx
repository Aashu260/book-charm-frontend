import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Nav from "./components/Nav";
import Product from "./pages/Product";
import About from "./pages/About";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import AllBooks from "./components/AllBooks";
import Cart from "./pages/Cart";
import BookDetails from "./components/BookDetails";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/all-books" element={<AllBooks />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products" element={<Product />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/book-details/:id" element={<BookDetails />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
