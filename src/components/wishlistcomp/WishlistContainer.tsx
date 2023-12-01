import React from "react";
import { WishlistItem } from "../../pages/wishlist/Wishlist";
import "./WishlistContainer.scss";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import WishlistItemComponent from "./WishlistItem";

interface WishlistContainerProps {
  wishlist: WishlistItem;
}

const WishlistContainer = ({ wishlist }: WishlistContainerProps) => {
  const location = useLocation();
  const { userData } = location.state || {};

  const navigate = useNavigate();

  const handleUserClick = async () => {
    try {
      console.log(userData.first_name)
      navigate("/wishlist-detail", { state: { wishlist: wishlist, userData: userData } });
    } catch (error) {
      console.error("Error fetching shop data:", error);
    }
  };

  return (
    <div className="wishlist-container-box" onClick={handleUserClick}>
      <div className="wishlist-container-text">{wishlist.name}</div>

      <div className="wishlist-container-content">
        {wishlist.products.map((item) => (
          <WishlistItemComponent key={item.id} item={item} />
        ))}
        <div className="wishlist-container-description">
          <div className="wishlist-container-total">
            {wishlist.quantity} Items
          </div>
          <div className="wishlist-container-price">$123</div>
        </div>
      </div>
    </div>
  );
};

export default WishlistContainer;
