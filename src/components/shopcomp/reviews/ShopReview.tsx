import React, { useState } from "react";
import "./ShopReview.scss";
import computer from "./../../assets/icons/computer.png";

const ShopReview = () => {
  return (
    <div className="product-container">
      <div className="shop-review-header">
        <div className="shop-review-title">FEEDBACK</div>
        <div className="shop-review-filter">
          <div className="shop-review-btn">OVERALL</div>
          <div className="shop-review-btn">LAST 30 DAYS</div>
          <div className="shop-review-btn">LAST 60 DAYS</div>
          <div className="shop-review-btn">LAST 12 MONTHS</div>
        </div>
      </div>
      <div className="shop-review-ratings-container">
        <div className="shop-review-ratings">
          <div className="shop-review-ratings-total">
            124 Ratings 81% positive
          </div>
          <div className="shop-review-ratings-report">
            To rate this seller or report a problem go to account settings
          </div>
        </div>
        <div className="shop-review-average-ratings">
          <div className="shop-review-average-rating-row">
            <div className="shop-review-average-rating-text">5 egg</div>
            <div className="shop-review-average-rating-bar">
              <div className="shop-review-average-rating-orange">
                <div className="shop-review-average-rating-percentage">95</div>
              </div>
            </div>
            <div className="shop-review-average-rating-text">77%</div>
          </div>
          <div className="shop-review-average-rating-row">
            <div className="shop-review-average-rating-text">4 egg</div>
            <div className="shop-review-average-rating-bar">
              <div className="shop-review-average-rating-orange">
                <div className="shop-review-average-rating-percentage">95</div>
              </div>
            </div>
            <div className="shop-review-average-rating-text">77%</div>
          </div>
          <div className="shop-review-average-rating-row">
            <div className="shop-review-average-rating-text">3 egg</div>
            <div className="shop-review-average-rating-bar">
              <div className="shop-review-average-rating-orange">
                <div className="shop-review-average-rating-percentage">95</div>
              </div>
            </div>
            <div className="shop-review-average-rating-text">77%</div>
          </div>
          <div className="shop-review-average-rating-row">
            <div className="shop-review-average-rating-text">2 egg</div>
            <div className="shop-review-average-rating-bar">
              <div className="shop-review-average-rating-orange">
                <div className="shop-review-average-rating-percentage">95</div>
              </div>
            </div>
            <div className="shop-review-average-rating-text">77%</div>
          </div>
          <div className="shop-review-average-rating-row">
            <div className="shop-review-average-rating-text">1 egg</div>
            <div className="shop-review-average-rating-bar">
              <div className="shop-review-average-rating-orange">
                <div className="shop-review-average-rating-percentage">95</div>
              </div>
            </div>
            <div className="shop-review-average-rating-text">77%</div>
          </div>
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
              <div className="shop-reviews-stats-category-first">ON-TIME</div>
              <div className="shop-reviews-stats-category-second">DELIVERY</div>
            </div>
          </div>
          <div className="shop-review-stats-column">
            <div className="shop-review-stats-inner">
              <div className="shop-reviews-stats-percentage">78%</div>
              <div className="shop-reviews-stats-category-first">ON-TIME</div>
              <div className="shop-reviews-stats-category-second">DELIVERY</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopReview;
