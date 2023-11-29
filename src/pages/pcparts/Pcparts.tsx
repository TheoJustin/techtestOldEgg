import React, { useState } from "react";
import "./Pcparts.scss";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import Navbar from "../../components/header/Navbar";
import Footer from "../../components/footer/Footer";
import remove from "../../assets/icons/remove.png";

interface Product {
  pc_id: number;
  parts_quantity: number;
  productid: number;
  name: string;
  stars: number;
  ratings: number;
  product_quantity: number;
  product_price: number;
  shipping_price: number;
  bought: number;
  category: string;
  urlproduct: string;
  shop_id: number;
}

const Pcparts = () => {
  const location = useLocation();
  const { userData, pcid } = location.state || {};
  const [product, setProduct] = useState<Product[]>([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8080/pc/parts/${pcid}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the cpus!", error);
      });
  }, []);

  const handleCreateCart = () => {
    product.forEach((item) => {
      const completeFormData = {
        user_id: userData.id,
        product_id: item.productid,
        cart_quantity: 1,
      };
  
      axios
        .post("http://localhost:8080/cart/insert", completeFormData)
        .then((response) => {
          console.log("Product added to cart:", item.name);
        })
        .catch((error) => {
          console.error("Error adding product to cart:", item.name, error);
        });
    });
  };

  const handleremove = (productId : number) => {
    axios
    .delete(`http://localhost:8080/pcparts/remove/${pcid}/${productId}`)
    .then((response) => {
        console.log("Product deleted");
    })
    .catch((error) => {
        console.error("Error deleting product", error);
    });
  }
  

  return (
    <div>
      <Navbar firstName={userData.first_name} />
      <div className="pcparts-list-container">
        <div className="pcparts-list-header">
          <div className="pcparts-list-component">Component</div>
          <div className="pcparts-list-selected">Selected Product</div>
        </div>
        {product.map((item, index) => (
          <div className="pcparts-list-content-container">
            <div className="pcparts-list-icon">{item.category}</div>
            <div className="pcparts-list-content">
              <img
                src={item.urlproduct}
                alt=""
                className="pcparts-list-content-img"
              />
              <div className="pcparts-list-content-text">{item.name}</div>
              <input
                type="number"
                name=""
                id=""
                className="pcparts-list-content-input"
              />
              <div className="pcparts-list-content-price">
                {item.product_price}
              </div>
              <div className="pcparts-list-content-remove">
                <img
                  src={remove}
                  alt=""
                  className="pcparts-list-content-removeimg"
                  onClick={() => handleremove(item.productid)}
                />
              </div>
            </div>
          </div>
        ))}
        <div className="pcparts-list-btnright">
          <div className="pcparts-list-addtocart" onClick={handleCreateCart}>Add To Cart</div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Pcparts;
