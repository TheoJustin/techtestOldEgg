import React from 'react';
import './WishlistItem.scss';

// Assuming these interfaces are in the same file. If not, import them.
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
    option:string;
    created_date: string;
}

// Define WishlistItemProps
interface WishlistItemProps {
    item: WishlistItem;
}

const WishlistItemComponent = ({ item }: WishlistItemProps) => {
    return (
        <div className="wishlist-item">
            <img className="wishlist-item-image" src={item.product.urlproduct} alt={item.product.name} />
            <h2 className="wishlist-item-title">{item.product.name} [{item.option}]</h2>
        </div>
    );
};

export default WishlistItemComponent;