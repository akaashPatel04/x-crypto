import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Box } from '@chakra-ui/react';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import "./app.css"

import Header from './components/Header';
import Exchanges from './pages/Exchanges';
import Coins from './pages/Coins';
import Home from './pages/Home';
import Footer from './components/Footer';
import CoinDetails from "./pages/CoinDetails";
import Search from "./pages/Search";

const App = () => {
  return (
    <Box bgColor={"#eeeeee"} >
      <BrowserRouter>
        <Header />
        <ToastContainer position='bottom-center' theme='dark' hideProgressBar closeButton={false} autoClose={1500} />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/exchanges' element={<Exchanges />} />
          <Route path='/coins' element={<Coins />} />
          <Route path='/coins/:id' element={<CoinDetails />} />
          <Route path='/search' element={<Search />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </Box>
  )
}

export default App