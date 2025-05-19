import React from "react";
import "./Home.css";
import Header from "../../components/Header/Header.jsx";
import HotelsDisplay from "../../components/HotelsDisplay/HotelsDisplay.jsx";
import Footer from "../../components/Footer/Footer.jsx";
import FoodsOrder from "../../components/FoodsOrder/FoodsOrder.jsx";
const Home = () => {
  return (
    <div>
      <Header />
      <HotelsDisplay />
      <FoodsOrder />
    </div>
  );
};

export default Home;
