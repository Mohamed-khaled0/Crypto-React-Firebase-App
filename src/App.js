import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Search from "./components/Search";
import { ThemeProvider } from "./context/ThemeContext";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Account from "./pages/Account";
import Axios from 'axios';
import { useEffect, useState } from "react";
import axios from "axios";
import Trending from "./components/Trending";

export default function App() {
  const [coines, setCoines] = useState();
  const url =
    'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true';

  useEffect(() => {
    axios.get(url).then((response) => {
      setCoines(response.data);
    });
  }, [url]);

  return (
    <ThemeProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home coines={coines} />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/account" element={<Account />} />
      </Routes>
      {/* Pass coines to Search component */}
      <Search coins={coines} />
      <Trending/>
    </ThemeProvider>
  );
}