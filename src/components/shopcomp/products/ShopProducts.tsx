import React, { useState } from "react";
import "./ShopProducts.scss";
import computer from "./../../../assets/icons/computer.png";
import search from "./../../../assets/icons/search.png";
import axios from "axios";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import HomeProduct from "../../homecomp/HomeProduct";

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

const ShopProducts = () => {
  const location = useLocation();
  const { shopData, firstName } = location.state || {};
  const [products, setProducts] = React.useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/shop/products/${shopData.id}`)
      .then((response) => {
        setProducts(response.data);

        const uniqueCategories = Array.from(
          new Set(response.data.map((product: Product) => product.category))
        ) as string[];
        setCategories(uniqueCategories);
      })
      .catch((error) => {
        console.error("There was an error fetching the shops!", error);
      });
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleSortChange = (criteria: string) => {
    setSortBy(criteria);
  };

  const filteredProducts = products
    .filter(
      (product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (selectedCategories.length === 0 ||
          selectedCategories.includes(product.category))
    )
    .sort((a, b) => {
      if (sortBy === "ratings") {
        return a.ratings - b.ratings; // Ascending order
      } else if (sortBy === "product_price") {
        return a.product_price - b.product_price; // Ascending order
      } else if (sortBy === "bought") {
        return a.bought - b.bought; // Ascending order
      }
      return 0;
    });

  return (
    <div className="shop-products-container">
      <div className="shop-products-filter">
        <div className="shop-products-filter-text">Category</div>
        {categories.map((category) => (
          <div key={category} className="shop-products-filter-checkbox">
            <input
              type="checkbox"
              className="filter-checkbox"
              onChange={() => handleCategoryChange(category)}
            />
            <div className="filter-checkbox-text">{category}</div>
          </div>
        ))}
        <div className="shop-products-filter-text">Sort By</div>
        <div className="shop-products-filter-checkbox">
          <input
            type="checkbox"
            className="filter-checkbox"
            onChange={() => handleSortChange("ratings")}
          />
          <div className="filter-checkbox-text">Ratings</div>
        </div>
        <div className="shop-products-filter-checkbox">
          <input
            type="checkbox"
            className="filter-checkbox"
            onChange={() => handleSortChange("product_price")}
          />
          <div className="filter-checkbox-text">product_price</div>
        </div>
        <div className="shop-products-filter-checkbox">
          <input
            type="checkbox"
            className="filter-checkbox"
            onChange={() => handleSortChange("bought")}
          />
          <div className="filter-checkbox-text">bought</div>
        </div>
      </div>
      <div className="shop-products-page">
        <div className="shop-products-search">
          <input
            type="text"
            className="shop-products-searchbar"
            placeholder="Search Within"
            onChange={handleSearchChange}
          />
          <div className="shop-products-search-btn">
            <img src={search} alt="" className="shop-products-search-btn-img" />
          </div>
        </div>

        <div className="product-count">
          Showing {filteredProducts.length} products
        </div>

        <div className="products-container">
          <div className="thumbnail-container">
            {filteredProducts.map((product) => (
              <HomeProduct
                key={product.id}
                product={product}
                firstName={firstName}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopProducts;
