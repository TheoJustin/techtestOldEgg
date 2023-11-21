import React, { useState } from "react";
import { ChangeEvent } from "react";
import "./Wishlist.scss";
import computer from "./../../assets/icons/computer.png";
import WishlistItemComponent from "../../components/wishlistcomp/WishlistItem";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import Navbar from "../../components/header/Navbar";
import Footer from "../../components/footer/Footer";

// for wishlist
interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  mobile_phone: string;
  password: string;
  is_subscribed: boolean;
}

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

interface WishlistItem {
  wishlist_id: number;
  user: User;
  product: Product;
  quantity: number;
  notes: string;
  created_date: string;
}

// for wishlist
interface PublicUser {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  mobile_phone: string;
  password: string;
  is_subscribed: boolean;
}

interface PublicProduct {
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

interface PublicWishlistItem {
  wishlist_id: number;
  user: User;
  product: Product;
  quantity: number;
  notes: string;
  created_date: string;
}

const Wishlist = () => {
  const location = useLocation();
  const { userData } = location.state || {};
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [publicWishlist, setPublicWishlist] = useState<PublicWishlistItem[]>([]);
  const [sortBy, setSortBy] = useState("dateDesc"); // For sorting
  const [filterRating, setFilterRating] = useState(0); // For rating filter
  const [filterPrice, setFilterPrice] = useState<string | number[]>("all"); // For price filter

  useEffect(() => {
    axios
      .get(`http://localhost:8080/wishlist/${userData.id}`)
      .then((response) => {
        setWishlist(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the wishlist!", error);
      });
  }, [userData.id]); // Added dependency to useEffect

  useEffect(() => {
    axios
      .get(`http://localhost:8080/wishlist`)
      .then((response) => {
        setPublicWishlist(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the wishlist!", error);
      });
  }, []);

  const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value);
  };

  const handleRatingChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFilterRating(Number(e.target.value));
  };

  const handlePriceChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setFilterPrice(value === "all" ? "all" : value.split("-").map(Number));
  };

  const applyFiltersAndSorting = () => {
    return wishlist
      .filter((item) => {
        const meetsRating =
          filterRating === 0 || item.product.stars >= filterRating;
        const meetsPrice =
          filterPrice === "all" ||
          (Array.isArray(filterPrice) &&
            item.product.product_price >= filterPrice[0] &&
            item.product.product_price <= filterPrice[1]);
        return meetsRating && meetsPrice;
      })
      .sort((a, b) => {
        if (sortBy === "dateDesc") {
          // Descending order
          return (
            new Date(b.created_date).getTime() -
            new Date(a.created_date).getTime()
          );
        } else if (sortBy === "dateAsc") {
          // Ascending order
          return (
            new Date(a.created_date).getTime() -
            new Date(b.created_date).getTime()
          );
        }

        return 0;
      });
  };

  const filteredAndSortedWishlist = applyFiltersAndSorting();

  const applyFiltersAndSortingForPublic = () => {
    return publicWishlist
      .filter((item) => {
        const meetsRating =
          filterRating === 0 || item.product.stars >= filterRating;
        const meetsPrice =
          filterPrice === "all" ||
          (Array.isArray(filterPrice) &&
            item.product.product_price >= filterPrice[0] &&
            item.product.product_price <= filterPrice[1]);
        return meetsRating && meetsPrice;
      })
      .sort((a, b) => {
        if (sortBy === "dateDesc") {
          // Descending order
          return (
            new Date(b.created_date).getTime() -
            new Date(a.created_date).getTime()
          );
        } else if (sortBy === "dateAsc") {
          // Ascending order
          return (
            new Date(a.created_date).getTime() -
            new Date(b.created_date).getTime()
          );
        }

        return 0;
      });
  };

  const filteredAndSortedPublicWishlist = applyFiltersAndSortingForPublic();

  return (
    <div>
      <Navbar firstName={userData.first_name}/>
      <div className="wishlist-page">
        <h1 className="wishlist-title">Wishlist</h1>
        <div className="wishlist-menu">
          <button className="menu-item my-lists">My Lists</button>
          <button className="menu-item followed-list">Followed List</button>
          <button className="menu-item public-list">Public List</button>
        </div>
        <div className="wishlist-filters">
          <div className="filter-rating">
            <label>Rating:</label>
            <select onChange={handleRatingChange} className="rating-select">
              <option value="0">All Ratings</option>
              {[1, 2, 3, 4, 5].map((rating) => (
                <option key={rating} value={rating}>
                  {rating}
                </option>
              ))}
            </select>
          </div>
          <div className="filter-price">
            <label>Price:</label>
            <select onChange={handlePriceChange} className="price-select">
              <option value="all">All Prices</option>
              <option value="0-50">0-50</option>
              <option value="50-100">50-100</option>
              <option value="100-150">100-150</option>
              <option value="150-200">150-200</option>
            </select>
          </div>
        </div>
        <div className="wishlist-container">
          <div className="wishlist-header">
            <span className="wishlist-count">
              Wishlist Count: {wishlist.length}
            </span>
            <select onChange={handleSortChange} className="sort-select">
              <option value="dateDesc">Sort by Date (Newest First)</option>
              <option value="dateAsc">Sort by Date (Oldest First)</option>
            </select>
          </div>
          <div className="wishlistItemContainer">
            {filteredAndSortedWishlist.map((item) => (
              <WishlistItemComponent key={item.wishlist_id} item={item} />
            ))}
          </div>
          <div className="wishlistItemContainer">
            {filteredAndSortedPublicWishlist.map((item) => (
              <WishlistItemComponent key={item.wishlist_id} item={item} />
            ))}
          </div>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Wishlist;
