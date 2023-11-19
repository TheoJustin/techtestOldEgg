import React, { useState } from "react";
import "./ShopReview.scss";
import computer from "./../../assets/icons/computer.png";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

interface Review {
  ID: number;
  Name: string;
  Title: string;
  Rating: number;
  Description: string;
  Date: Date;
  ShopID: number;
  helpful?: boolean;
  unhelpful?: boolean;
}

const ShopReview = () => {
  const location = useLocation();
  const { shopData, firstName } = location.state || {};
  const [reviews, setReviews] = React.useState<Review[]>([]);
  const [filteredReviews, setFilteredReviews] = useState<Review[]>([]);
  const [filter, setFilter] = useState("Overall");
  const [searchQuery, setSearchQuery] = useState("");

  const markReview = (reviewId: number, markType: "helpful" | "unhelpful") => {
    setReviews(
      reviews.map((review) => {
        if (review.ID === reviewId) {
          return {
            ...review,
            helpful: markType === "helpful" ? !review.helpful : review.helpful,
            unhelpful:
              markType === "unhelpful" ? !review.unhelpful : review.unhelpful,
          };
        }
        return review;
      })
    );
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/shop/products/reviews/${shopData.id}`)
      .then((response) => {
        setReviews(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the shops!", error);
      });
  }, []);

  useEffect(() => {
    const now = new Date();
    let filtered = reviews;

    switch (filter) {
      case "Last 30 Days":
        filtered = reviews.filter(
          (review) =>
            (now.getTime() - new Date(review.Date).getTime()) /
              (1000 * 60 * 60 * 24) <=
            30
        );
        break;
      case "Last 60 Days":
        filtered = reviews.filter(
          (review) =>
            (now.getTime() - new Date(review.Date).getTime()) /
              (1000 * 60 * 60 * 24) <=
            60
        );
        break;
      case "Last 12 Months":
        filtered = reviews.filter(
          (review) =>
            (now.getTime() - new Date(review.Date).getTime()) /
              (1000 * 60 * 60 * 24) <=
            365
        );
        break;
    }

    if (searchQuery) {
      filtered = filtered.filter(
        review =>
          review.Title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          review.Description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredReviews(filtered);
  }, [filter, reviews, searchQuery]);

  const countRatings = (ratingValue: number): number => {
    return reviews.filter((review) => Math.floor(review.Rating) === ratingValue)
      .length;
  };

  // Calculate total number of reviews
  const totalReviews = reviews.length;

  return (
    <div className="product-container">
      <div className="shop-review-header">
        <div className="shop-review-title">FEEDBACK</div>
        <div className="shop-review-filter">
          {["Overall", "Last 30 Days", "Last 60 Days", "Last 12 Months"].map(
            (f) => (
              <div
                key={f}
                className={`shop-review-btn ${filter === f ? "active" : ""}`}
                onClick={() => setFilter(f)}
              >
                {f}
              </div>
            )
          )}
        </div>
      </div>
      <div className="shop-review-ratings-container">
        <div className="shop-review-ratings">
          <div className="shop-review-ratings-total">
            {shopData.ratings} Ratings
          </div>
          <div className="shop-review-ratings-report">
            To rate this seller or report a problem go to account settings
          </div>
        </div>
        <div className="shop-review-average-ratings">
          {/* Render average rating bars */}
          {[...Array(5)].map((_, index) => {
            const ratingValue = 5 - index;
            const ratingCount = countRatings(ratingValue);
            const percentage =
              totalReviews > 0
                ? ((ratingCount / totalReviews) * 100).toFixed(2)
                : "0.00";

            return (
              <div key={index} className="shop-review-average-rating-row">
                <div className="shop-review-average-rating-text">
                  {ratingValue} egg
                </div>
                <div className="shop-review-average-rating-bar">
                  <div
                    className={`shop-review-average-rating-${
                      ratingCount > 0 ? "orange" : "grey"
                    }`}
                  >
                    <div className="shop-review-average-rating-percentage">
                      {ratingCount}
                    </div>
                  </div>
                </div>
                <div className="shop-review-average-rating-text">
                  {percentage}%
                </div>
              </div>
            );
          })}
        </div>
        <div className="shop-review-stats">
          <div className="shop-review-stats-column">
            <div className="shop-review-stats-inner">
              <div className="shop-reviews-stats-percentage">78%</div>
              <div className="shop-reviews-stats-category-first">ON-TIME</div>
              <div className="shop-reviews-stats-category-second">DELIVERY</div>
            </div>
          </div>
          <div className="shop-review-stats-column">
            <div className="shop-review-stats-inner">
              <div className="shop-reviews-stats-percentage">78%</div>
              <div className="shop-reviews-stats-category-first">PRODUCT</div>
              <div className="shop-reviews-stats-category-second">ACCURACY</div>
            </div>
          </div>
          <div className="shop-review-stats-column">
            <div className="shop-review-stats-inner">
              <div className="shop-reviews-stats-percentage">78%</div>
              <div className="shop-reviews-stats-category-first">SERVICE</div>
              <div className="shop-reviews-stats-category-second">
                SATISFACTION
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="shop-review-search">
        <input
          type="text"
          placeholder="Search reviews..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>


      <div className="shop-review-list">
        {filteredReviews.map((review) => (
          <div key={review.ID} className="shop-review-item">
            <div className="shop-review-item-header">
              <h3>{review.Title}</h3>
              <div>{review.Rating} Stars</div>
            </div>
            <div className="shop-review-item-body">
              <p>{review.Description}</p>
            </div>
            <div className="shop-review-item-footer">
              <span>Reviewed by: {review.Name}</span>
              <span>Date: {new Date(review.Date).toLocaleDateString()}</span>
              <div className="shop-review-helpfulness">
                <button
                  onClick={() => markReview(review.ID, "helpful")}
                  className={`helpful-button ${review.helpful ? "active" : ""}`}
                >
                  Helpful
                </button>
                <button
                  onClick={() => markReview(review.ID, "unhelpful")}
                  className={`unhelpful-button ${
                    review.unhelpful ? "active" : ""
                  }`}
                >
                  Unhelpful
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopReview;
