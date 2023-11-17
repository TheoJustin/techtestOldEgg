import React from "react";
import { useState } from "react";
import "./Navbar.scss";
import Mode from "./Mode";
import hamburger from "./../../assets/icons/menu.png";
import logo from "./../../assets/logo.png";
import search from "./../../assets/icons/search.png";
import cart from "./../../assets/icons/shopping-cart.png";
import user from "./../../assets/icons/user.png";
import flag from "./../../assets/icons/singapore.png";
import notification from "./../../assets/icons/bell.png";
import location from "./../../assets/icons/location.png";
import indonesia from "./../../assets/icons/indonesia.png";
import uk from "./../../assets/icons/united-kingdom.png";


type NavbarProps = {
  firstName: string;

  // isDarkMode: boolean;
  // setIsDarkMode: (isDarkMode: boolean) => void;
};

function Navbar(props: NavbarProps) {
  // const { firstName, isDarkMode, setIsDarkMode } = props;

  const [current, setCurrent] = React.useState(0);
  const changeLang = () => {
    setCurrent((current + 1) % 2);
  };

  const delivery = ['Delivery to', 'Pengiriman ke'];
  const country = ['singapore', 'indonesia'];
  const welcome = ['Welcome', 'Selamat Datang'];
  const returns = ['Returns', 'Pengembalian'];
  const order = ['& Orders', '& Pesanan'];
  const shipping = ['Free Shipping', 'Bebas Ongkir'];
  const deals = ['Today\'s Best Deals', 'Tawaran Terbaik Hari Ini'];
  const intel = ['New: Intel I9-13900KS', 'Baru: Intel I9-13900KS'];
  const pc = ['Build a PC', 'Bangun Sebuah PC'];
  const volume = ['Order Volume', 'Volume Order'];
  const critic = ['FEEDBACK', 'KRITIK & SARAN'];
  const help = ['HELP CENTER', 'PUSAT BANTUAN'];
  const flag = [uk, indonesia];

  return (
    <div className="navbar">
      <div className="topnav">
        <img className="image" src={hamburger} alt="" />
        <img className="image" src={logo} alt="" />

        <div className="couple">
          <img className="image" src={location} alt="" />
          <div className="double">
            <div className="doubleTop">{delivery[current]}</div>
            <div className="doubleBot">{country[current]}</div>
          </div>
        </div>

        <div className="search">
          <input type="text" />
          <div className="searchclick">
            <img className="image" src={search} alt="" />
          </div>
        </div>

        <div className="round">
          <img className="image" src={notification} alt="" />
        </div>
        <div className="round" onClick={changeLang}>
          <img className="image" src={flag[current]} alt="" />
        </div>

        {/* <Mode isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} /> */}
        <Mode/>
        <div className="couple">
          <img className="image" src={user} alt="" />
          <div className="double">
            <div className="doubleTop">{welcome[current]}</div>
            <div className="doubleBot">{props.firstName}</div>
          </div>
        </div>
        <div className="double">
          <div className="doubleTop">{returns[current]}</div>
          <div className="doubleBot">{order[current]}</div>
        </div>
        <img className="image" src={cart} alt="" />
      </div>

      <div className="botnav">
        <div className="navButton">{shipping[current]}</div>
        <div className="navButton">{deals[current]}</div>
        <div className="navButton">RTX 4070 TI Series</div>
        <div className="navButton">{intel[current]}</div>
        <div className="navButton">RTX 4090 TI Series</div>
        <div className="navButton">{pc[current]}</div>

        <div className="navbar-right">
          <div className="order">{volume[current]}</div>
          <div className="spacer"></div>
          <div className="bluebtn">{critic[current]}</div>
          <div className="spacer"></div>
          <div className="bluebtn">{help[current]}</div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
