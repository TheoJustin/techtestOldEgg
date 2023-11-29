import React, { useState } from "react";
import "./Cart.scss";
import { useLocation } from "react-router-dom";
import Navbar from "../../components/header/Navbar";
import Footer from "../../components/footer/Footer";
import remove from "../../assets/icons/remove.png";
import { useEffect } from "react";
import axios from "axios";

interface Cart {
  user_id: number;
  product_id: number;
  cart_quantity: number;
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

interface FormData {
    invoice: string;
    productid: string;
    quantity: number;
}

const Cart = () => {
  const location = useLocation();
  const { userData } = location.state || {};
  const [cart, setCarts] = React.useState<Cart[]>([]);
  const [formData, setFormData] = useState<FormData[]>([]);

  let price = 0;
  let shippingPrice = 0;

  for (let index = 0; index < cart.length; index++) {
    price += cart[index].product_price;
    shippingPrice += cart[index].shipping_price;
  }

  let totalPrice = parseFloat(price.toFixed(2)) + parseFloat(shippingPrice.toFixed(2));


  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    let cart2 = cart;
    const { name, value } = e.target;
    cart2[parseInt(name)].quantity = parseInt(value);
    setCarts(cart2);

    console.log(cart[parseInt(name)].quantity)
  };

  const handleCreateListSubmitForm = () => {

    for (let index = 0; index < cart.length; index++) {
        let random = 1 + Math.floor(Math.random() * (998))
        let randomnum = random.toString().padStart(3, '0');

        const completeFormData = {
            user_id: userData.id,
            invoice: "INV" + randomnum,
            productid: cart[index].product_id,
            quantity: cart[index].quantity
        };

        console.log(completeFormData);

        axios
        .post("http://localhost:8080/order/insert", completeFormData)
        .then((response) => {
            console.log("Response:", response.data);
        })
        .catch((error) => {
            console.error("Error creating order item:", error);
        });
    }
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8080/cart/${userData.id}`)
      .then((response) => {
        setCarts(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the Carts!", error);
      });
  }, []);

  const handleremove = (productId : number) => {
    axios
    .delete(`http://localhost:8080/carts/remove/${userData.id}/${productId}`)
    .then((response) => {
        console.log("Cart item deleted");
    })
    .catch((error) => {
        console.error("Error deleting cart item", error);
    });
  }

  return (
    <div>
      <Navbar firstName={userData.first_name} />
      <div className="shoppingcart-container">
        <div className="shoppingcart-detail-container">
          <div className="shoppingcart-title">
            Shopping Cart ({cart.length} item)
          </div>
          {cart.map((item, index) => (
            <div className="shoppingcart-product-container">
              <img src={item.urlproduct} className="shoppingcart-product-img" />
              <div className="shoppingcart-product-detail-container">
                <div className="shoppingcart-product-title">{item.name}</div>
                <div className="shoppingcart-product-input-quantity">
                  <input
                    type="number"
                    className="shoppingcart-product-input"
                    name={index + ""}
                    min={1}
                    max={item.quantity}
                    onChange={handleChange}
                  />
                  <div className="shoppingcart-product-limit">
                    Limit {item.quantity}
                  </div>
                </div>
                <div className="shoppingcart-product-price">
                  {item.product_price}
                </div>
                <div className="shoppingcart-product-remove">
                  <img src={remove} alt="" className="shoppingcart-product-remove-img" onClick={() => handleremove(item.product_id)}/>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="shoppingcart-summary-container">
          <div className="shoppingcart-summary-title">Summary</div>
          <div className="shoppingcart-summary-price-container">
            <div className="shoppingcart-sumary-price-header">Item(s):</div>
            <div className="shoppingcart-summary-price">{price.toFixed(2)}</div>
          </div>
          <div className="shoppingcart-summary-price-container">
            <div className="shoppingcart-sumary-price-header">
              Est. Delivery:
            </div>
            <div className="shoppingcart-summary-price">{shippingPrice.toFixed(2)}</div>
          </div>
          <div className="shoppingcart-summary-price-container-big">
            <div className="shoppingcart-sumary-price-header-big">
              Est. Total:
            </div>
            <div className="shoppingcart-summary-price-big">{totalPrice}</div>
          </div>
          <div className="shoppingcart-secure-checkout" onClick={handleCreateListSubmitForm}>SECURE CHECKOUT</div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Cart;
