import React from "react";
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

type HomeProps = {
  name: string;
  email: string;
};

function Home() {
  const location = useLocation();
  const { email, firstName } = location.state || {};
  console.log(firstName);

  const [current, setCurrent] = React.useState(0);

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
          <ListItem desc="Components & Storage" url={computer} />
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
                <img src={computer} className="receimg" alt="" />
                <img src={computer} className="receimg" alt="" />
              </div>
            </div>
            <div className="rec">
              <div className="title">Recommended Categories</div>
              <div className="img-container">
                <div className="product">
                  <img src={computer} className="cateimg" alt="" />
                  <div className="titleimg">tes1</div>
                </div>
                <div className="product">
                  <img src={computer} className="cateimg" alt="" />
                  <div className="titleimg">tes2</div>
                </div>
                <div className="product">
                  <img src={computer} className="cateimg" alt="" />
                  <div className="titleimg">tes3</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
