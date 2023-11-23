import React, { useState } from "react";
import { ChangeEvent } from "react";
import "./Wishlist.scss";
import computer from "./../../assets/icons/computer.png";
import WishlistItemComponent from "../../components/wishlistcomp/WishlistItem";
import WishlistFollower from "../../components/wishlistcomp/WishlistFollower";
import WishlistContainer from "../../components/wishlistcomp/WishlistContainer";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import Navbar from "../../components/header/Navbar";
import Footer from "../../components/footer/Footer";

// for wishlist
export interface User {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  mobile_phone: string;
  password: string;
  is_subscribed: boolean;
}

export interface Product {
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

export interface WishlistItem {
  wishlist_id: number;
  user: User;
  products: Product[];
  name: string;
  quantity: number;
  option: string;
  notes: string;
  created_date: string;
}

export interface FollowerData {
  id: number;
  follow_date: string;
  follower_first_name: string;
  follower_last_name: string;
  follower_email: string;
  wishlist_name: string;
  wishlist_notes: string;
  wishlist_option: string;
  wishlist_quantity: number;
  wishlist_created_date: string;
  product_name: string;
  product_stars: number;
  product_ratings: number;
  product_quantity: number;
  product_price: number;
  shipping_price: number;
  product_bought: number;
  product_category: string;
  product_url: string;
  wishlist_owner_first_name: string;
  wishlist_owner_last_name: string;
  wishlist_owner_email: string;
}

const Wishlist = () => {
  const location = useLocation();
  const { userData } = location.state || {};
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [publicWishlist, setPublicWishlist] = useState<WishlistItem[]>([]);
  const [followerData, setfollowerData] = useState<FollowerData[]>([]);
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
  }, []);

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

  useEffect(() => {
    axios
      .get(`http://localhost:8080/wishlist-followers`)
      .then((response) => {
        setfollowerData(response.data);
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
        let meetsRating = true;
        if (filterRating > 0) {
          for (let index = 0; index < item.products.length; index++) {
            if (item.products[index].stars < filterRating) {
              meetsRating = false;
              break;
            }
          }
        }

        let meetsPrice = true;
        if (filterPrice != "all") {
          for (let index = 0; index < item.products.length; index++) {
            switch (filterPrice) {
              case "0-50":
                if (
                  item.products[index].product_price < 0 &&
                  item.products[index].product_price > 50
                ) {
                  meetsPrice = false;
                }
                break;
              case "50-100":
                if (
                  item.products[index].product_price < 50 &&
                  item.products[index].product_price > 100
                ) {
                  meetsPrice = false;
                }
                break;
              case "100-150":
                if (
                  item.products[index].product_price < 100 &&
                  item.products[index].product_price > 150
                ) {
                  meetsPrice = false;
                }
                break;
              case "150-200":
                if (
                  item.products[index].product_price < 150 &&
                  item.products[index].product_price > 200
                ) {
                  meetsPrice = false;
                }
                break;
            }

            if (meetsPrice == false) {
              break;
            }
          }
        }

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
        let meetsRating = true;
        if (filterRating > 0) {
          for (let index = 0; index < item.products.length; index++) {
            if (item.products[index].stars < filterRating) {
              meetsRating = false;
              break;
            }
          }
        }

        let meetsPrice = true;
        if (filterPrice != "all") {
          for (let index = 0; index < item.products.length; index++) {
            switch (filterPrice) {
              case "0-50":
                if (
                  item.products[index].product_price < 0 &&
                  item.products[index].product_price > 50
                ) {
                  meetsPrice = false;
                }
                break;
              case "50-100":
                if (
                  item.products[index].product_price < 50 &&
                  item.products[index].product_price > 100
                ) {
                  meetsPrice = false;
                }
                break;
              case "100-150":
                if (
                  item.products[index].product_price < 100 &&
                  item.products[index].product_price > 150
                ) {
                  meetsPrice = false;
                }
                break;
              case "150-200":
                if (
                  item.products[index].product_price < 150 &&
                  item.products[index].product_price > 200
                ) {
                  meetsPrice = false;
                }
                break;
            }

            if (meetsPrice == false) {
              break;
            }
          }
        }

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

  type ActiveView = "myLists" | "followedList" | "publicList";

  const [activeView, setActiveView] = useState("myLists"); // New state to track the active view

  // Function to change the active view
  const handleViewChange = (view : ActiveView) => {
    setActiveView(view);
  };

  return (
    <div>
      <Navbar firstName={userData.first_name} />
      <div className="wishlist-page">
        <h1 className="wishlist-title">Wishlist</h1>
        <div className="wishlist-menu">
          <button className="menu-item my-lists" onClick={() => handleViewChange("myLists")}>My Lists</button>
          <button className="menu-item followed-list" onClick={() => handleViewChange("followedList")}>Followed List</button>
          <button className="menu-item public-list" onClick={() => handleViewChange("publicList")}>Public List</button>
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

          {activeView === "myLists" && wishlist.map((item) => (
            <WishlistContainer key={item.wishlist_id} wishlist={item} />
          ))}

          {activeView === "followedList" && followerData.map((item) => (
            <WishlistFollower key={item.id} item={item} />
          ))}

          {activeView === "publicList" && publicWishlist.map((item) => (
            <WishlistContainer key={item.wishlist_id} wishlist={item} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Wishlist;
