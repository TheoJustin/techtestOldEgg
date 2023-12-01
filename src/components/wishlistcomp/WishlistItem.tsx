import React from 'react';
import './WishlistItem.scss';

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

interface WishlistItemProps {
    item: Product;
}

const WishlistItemComponent = ({ item }: WishlistItemProps) => {
    return (
        <div className="wishlist-item">
                <div key={item.id}>
                    <img className="wishlist-item-image" src={item.urlproduct} alt={item.name} />
                    <h2 className="wishlist-item-title">{item.name}</h2>
                </div>
        </div>
    );
};


export default WishlistItemComponent;