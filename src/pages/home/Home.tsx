import React from "react";
import { useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/header/Navbar";
import Footer from "../../components/footer/Footer";
import ListItem from "../../components/homecomp/ListItem";
import fbanner from "../../assets/banner/banner_1.jpg";
import sbanner from "../../assets/banner/banner_2.jpg";
import tbanner from "../../assets/banner/banner_3.jpg";
import arrow from "./../../assets/icons/greater-than.png";
import computer from "./../../assets/icons/computer.png";

import { useLocation } from "react-router-dom";
import "./Home.scss";
import Newsletter from "../../components/homecomp/NewsLetter";
import HomeProduct from "../../components/homecomp/HomeProduct";
import HomeBrand from "../../components/homecomp/HomeBrand";
import HomeShop from "../../components/homecomp/HomeShop";

type HomeProps = {
  name: string;
  email: string;
};

interface Product {
  id: number;
  name: string;
  stars: number;
  ratings: number;
  quantity: number;
  product_price: number;
  shipping_price: number;
  bought: number;
  category: string;
  urlproduct: string;
  shop_id: number;
}

interface Brand {
  brandID: number;
  brandName: string;
  brandURL: string;
  soldProducts: number;
}

interface Shop {
  id: number;
  sales: number;
  followers: number;
  stars: number;
  ratings: number;
  urlBanner: string;
  positive: boolean;
  monthsCreated: number;
  description: string;
  shop_name: string;
}


function Home() {
  const location = useLocation();
  const { email, firstName } = location.state || {};

  const [current, setCurrent] = React.useState(0);
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  const [products, setProducts] = React.useState<Product[]>([]);
  const [brands, setBrands] = React.useState<Brand[]>([]);
  const [shops, setShops] = React.useState<Shop[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/products")
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the products!", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8080/brands")
      .then((response) => {
        setBrands(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the brands!", error);
      });
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8080/shops")
      .then((response) => {
        setShops(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the shops!", error);
      });
  }, []);

  React.useEffect(() => {
    const next = (current + 1) % 3;
    const id = setTimeout(() => setCurrent(next), 3000);
    return () => clearTimeout(id);
  }, [current]);

  const goLeft = () => {
    if (current - 1 == -1) {
      setCurrent(2);
    } else {
      setCurrent((current - 1) % 3);
    }
  };

  const goRight = () => {
    setCurrent((current + 1) % 3);
  };


  return (
    <div>
      <Navbar firstName={firstName} />
      <div className="carousel-container">
        <div className="banner" style={{ left: `${-100 * current}%` }}>
          <div className="carousel-img">
            <img src={fbanner} alt="" />
          </div>
          <div className="carousel-img">
            <img src={sbanner} alt="" />
          </div>
          <div className="carousel-img">
            <img src={tbanner} alt="" />
          </div>
        </div>
        <div className="list">
          <ListItem desc="Components & Storage" url={computer} />
          <ListItem desc="Computer Systems" url={computer} />
          <ListItem desc="Computer Peripherals" url={computer} />
          <ListItem desc="Electronics" url={computer} />
          <ListItem desc="Gaming" url={computer} />
        </div>
        <div className="arrowContainer">
          <div className="arrow" onClick={goLeft}>
            <img src={arrow} alt="" className="leftarr" />
          </div>
          <div className="arrow" onClick={goRight}>
            <img src={arrow} alt="" className="rightarr" />
          </div>

          <div className="recContainer">
            <div className="rec">
              <div className="title">HI, {firstName}</div>
              <div className="desc">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque,
                a similique voluptates incidunt iure facere.
              </div>
              <div className="account">
                <div className="acc">Your Account</div>
                <div className="acc">Your Orders</div>
              </div>
            </div>
            <div className="rec">
              <div className="title">Recently Viewed Items</div>
              <div className="img-container">
                <img
                  src="https://i.ibb.co/MBKLWty/hs1.jpg"
                  className="receimg"
                  alt=""
                />
                <img
                  src="https://i.ibb.co/9whrF00/hub1.jpg"
                  className="receimg"
                  alt=""
                />
              </div>
            </div>
            <div className="rec">
              <div className="title">Recommended Categories</div>
              <div className="img-container">
                <div className="product">
                  <img
                    src="https://i.ibb.co/9whrF00/hub1.jpg"
                    className="cateimg"
                    alt=""
                  />
                  <div className="titleimg">hub</div>
                </div>
                <div className="product">
                  <img
                    src="https://i.ibb.co/0q0jSLM/pc1.jpg"
                    className="cateimg"
                    alt=""
                  />
                  <div className="titleimg">pc1</div>
                </div>
                <div className="product">
                  <img
                    src="https://i.ibb.co/tDhL50j/pc2.jpg"
                    className="cateimg"
                    alt=""
                  />
                  <div className="titleimg">pc2</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="home-products-container">
        <div className="products-title">FEATURED PRODUCTS</div>
        <div className="thumbnail-container">
          {products.map((product) => (
            <HomeProduct key={product.id} product={product} firstName={firstName}/>
          ))}
        </div>
      </div>

      <div className="home-products-container">
        <div className="products-title">FEATURED BRANDS</div>
        <div className="thumbnail-container">
          <div className="thumbnail-container">
            {brands.map((brand) => (
              <HomeBrand key={brand.brandID} brand={brand} />
            ))}
          </div>
        </div>
      </div>

      <div className="home-products-container">
        <div className="products-title">TOP 3 SHOPS</div>
        <div className="thumbnail-container">
          {shops.map((shop) => (
            <HomeShop key={shop.id} shop={shop} />
          ))}
        </div>
      </div>

      <Newsletter />
      <Footer />
    </div>
  );
}

export default Home;
