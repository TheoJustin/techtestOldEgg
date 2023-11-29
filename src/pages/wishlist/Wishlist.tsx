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
  wishlist_id: string;
  follower_user_id: string;
}

interface FormData {
  product_id: string;
  name: string;
  notes: string;
  option: string;
  quantity: string | number;
  product_ids: number[];
}

const Wishlist = () => {
  const location = useLocation();
  const { userData } = location.state || {};
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [publicWishlist, setPublicWishlist] = useState<WishlistItem[]>([]);
  const [followerData, setfollowerData] = useState<FollowerData[]>([]);
  const [sortBy, setSortBy] = useState("dateDesc");
  const [filterRating, setFilterRating] = useState(0);
  const [filterPrice, setFilterPrice] = useState<string | number[]>("all");
  const [manageWishlist, setManageWishlist] = useState(0);
  const [createListPopup, setCreateListPopup] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    product_id: "",
    name: "",
    notes: "",
    option: "",
    quantity: "",
    product_ids: [],
  });

  const handleProductIdsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const productIds = e.target.value
      .split(",")
      .map((id) => parseInt(id.trim(), 10))
      .filter((id) => !isNaN(id)); // Filter out any non-numeric values

    setFormData({ ...formData, product_ids: productIds });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
  
    if (name === 'quantity') {
      const quantityValue = parseInt(value, 10) || 0;
      console.log('Quantity value:', quantityValue);
      setFormData({ ...formData, [name]: quantityValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  

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

  const handleManageWishlist = () => {
    setManageWishlist(manageWishlist + 1);
  };

  const exitManageWishlist = () => {
    setManageWishlist(manageWishlist - 1);
  };

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

  const openCreateListPopup = () => {
    setCreateListPopup(true);
  };

  const closeCreateListPopup = () => {
    setCreateListPopup(false);
  };

  const applyFiltersAndSorting = () => {
    return wishlist
      .filter((item) => {
        // Filter by rating
        if (filterRating > 0) {
          return item.products.some((product) => product.stars >= filterRating);
        }
        return true;
      })
      .filter((item) => {
        // Filter by price
        if (
          filterPrice !== "all" &&
          Array.isArray(filterPrice) &&
          filterPrice.length === 2
        ) {
          const [minPrice, maxPrice] = filterPrice;
          return item.products.some(
            (product) =>
              product.product_price >= minPrice &&
              product.product_price <= maxPrice
          );
        }
        return true;
      })
      .sort((a, b) => {
        // Sorting by date
        const dateA = new Date(a.created_date).getTime();
        const dateB = new Date(b.created_date).getTime();
        return sortBy === "dateDesc" ? dateB - dateA : dateA - dateB;
      });
  };

  const filteredAndSortedWishlist = applyFiltersAndSorting();

  const applyFiltersAndSortingForPublic = () => {
    return publicWishlist
      .filter((item) => {
        // Filter by rating
        if (filterRating > 0) {
          return item.products.some((product) => product.stars >= filterRating);
        }
        return true;
      })
      .filter((item) => {
        // Filter by price
        if (Array.isArray(filterPrice)) {
          const [minPrice, maxPrice] = filterPrice;
          return item.products.some((product) => {
            return (
              product.product_price >= minPrice &&
              product.product_price <= maxPrice
            );
          });
        }
        return true;
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

  const handleCreateListSubmitForm = () => {
    const completeFormData = {
      user_id: userData.id,
      ...formData,
    };

    console.log(completeFormData);

    axios
      .post("http://localhost:8080/wishlist/insert", completeFormData)
      .then((response) => {
        console.log("Response:", response.data);
        // Additional logic on success
      })
      .catch((error) => {
        console.error("Error creating wishlist item:", error);
      });
    closeCreateListPopup();
  };

  const filteredAndSortedPublicWishlist = applyFiltersAndSortingForPublic();

  type ActiveView = "myLists" | "followedList" | "publicList";

  const [activeView, setActiveView] = useState("myLists"); // New state to track the active view

  // Function to change the active view
  const handleViewChange = (view: ActiveView) => {
    setActiveView(view);
  };

  const updateWishlist = (updatedWishlist: WishlistItem) => {
    axios
      .put("http://localhost:8080/wishlist/update", updatedWishlist)
      .then((response) => {
        console.log("Wishlist updated:", response.data);
        // Optionally refresh the wishlist data from the server here
      })
      .catch((error) => {
        console.error("Error updating wishlist:", error);
      });
  };

  const handleWishlistChange = (
    index: number,
    field: keyof WishlistItem,
    value: string
  ) => {
    const newWishlist = [...wishlist];
    newWishlist[index] = { ...newWishlist[index], [field]: value };
    setWishlist(newWishlist);
  };

  const handleSaveChanges = () => {
    wishlist.forEach((item) => {
      updateWishlist(item);
    });
    setManageWishlist(0);
  };

  return (
    <div>
      {createListPopup && (
        <div className="wishlist-manage-background">
          <div className="wishlist-manage-container">
            <div className="wishlist-manage-text">Create New List</div>
            <div className="wishlist-manage-table">
              <div className="wishlist-manage-table-row">
                INPUT NEW WISHLIST
              </div>
              <div className="wishlist-manage-table-row">
                <input
                  type="text"
                  name="product_ids"
                  placeholder="Product IDs (comma-separated)"
                  className="wishlist-manage-input"
                  onChange={handleProductIdsChange}
                />
              </div>
              <div className="wishlist-manage-table-row">
                <input
                  type="text"
                  name="name"
                  placeholder="List Name"
                  className="wishlist-manage-input"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="wishlist-manage-table-row">
                <textarea
                  name="notes"
                  placeholder="Notes"
                  className="wishlist-manage-textarea"
                  value={formData.notes}
                  onChange={handleChange}
                />
              </div>
              <div className="wishlist-manage-table-row">
                <select
                  name="option"
                  className="wishlist-manage-dropdown"
                  value={formData.option}
                  onChange={handleChange}
                >
                  <option value="private">Private</option>
                  <option value="public">Public</option>
                </select>
              </div>
              <div className="wishlist-manage-table-row">
                <input
                  type="number"
                  name="quantity"
                  placeholder="Quantity"
                  className="wishlist-manage-input"
                  value={formData.quantity}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="wishlist-manage-btn-container">
              <div
                className="wishlist-manage-btn"
                onClick={closeCreateListPopup}
              >
                CANCEL
              </div>
              <div
                className="wishlist-manage-btn"
                onClick={handleCreateListSubmitForm}
              >
                CREATE
              </div>
            </div>
          </div>
        </div>
      )}
      {manageWishlist === 1 && (
        <div className="wishlist-manage-background">
          <div className="wishlist-manage-container">
            <div className="wishlist-manage-text">Manage Wish List</div>
            <div className="wishlist-manage-table">
              <div className="wishlist-manage-table-row">
                <div className="wishlist-manage-table-text">
                  My Wishlist {wishlist.length}
                </div>
                <div className="wishlist-manage-table-privacy">Privacy</div>
              </div>
              {wishlist.map((item, index) => (
                <div
                  className="wishlist-manage-table-row"
                  key={item.wishlist_id}
                >
                  <div className="wishlist-manage-table-text">
                    <input
                      type="text"
                      value={item.name}
                      className="wishlist-manage-table-input"
                      onChange={(e) =>
                        handleWishlistChange(index, "name", e.target.value)
                      }
                    />
                  </div>
                  <div className="wishlist-manage-table-privacy">
                    <select
                      name=""
                      id=""
                      className="wishlist-manage-table-dropdown"
                      value={item.option}
                      onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                        handleWishlistChange(index, "option", e.target.value)
                      }
                    >
                      <option value="private">private</option>
                      <option value="public">public</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
            <div className="wishlist-manage-btn-container">
              <div className="wishlist-manage-btn" onClick={exitManageWishlist}>
                CANCEL
              </div>
              <div className="wishlist-manage-btn" onClick={handleSaveChanges}>
                SAVE
              </div>
            </div>
          </div>
        </div>
      )}

      <Navbar firstName={userData.first_name} />
      <div className="wishlist-page">
        <h1 className="wishlist-title">Wishlist</h1>
        <div className="wishlist-menu">
          <button
            className="menu-item my-lists"
            onClick={() => handleViewChange("myLists")}
          >
            My Lists
          </button>
          <button
            className="menu-item followed-list"
            onClick={() => handleViewChange("followedList")}
          >
            Followed List
          </button>
          <button
            className="menu-item public-list"
            onClick={() => handleViewChange("publicList")}
          >
            Public List
          </button>
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

          {activeView === "myLists" && (
            <div className="wishlist-btn-container">
              <div
                className="wishlist-btn-update"
                onClick={openCreateListPopup}
              >
                CREATE A LIST
              </div>
              <div
                className="wishlist-btn-update"
                onClick={handleManageWishlist}
              >
                MANAGE LISTS
              </div>
            </div>
          )}

          {activeView === "myLists" &&
            filteredAndSortedWishlist.map((item) => (
              <WishlistContainer key={item.wishlist_id} wishlist={item} />
            ))}

          {activeView === "followedList" &&
            followerData.map((item) => (
              <WishlistFollower key={item.id} item={item} />
            ))}

          {activeView === "publicList" &&
            filteredAndSortedPublicWishlist.map((item) => (
              <WishlistContainer key={item.wishlist_id} wishlist={item} />
            ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Wishlist;
