import React from 'react';

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
    created_date: string;
}

// Define WishlistItemProps
interface WishlistItemProps {
    item: WishlistItem;
}

const WishlistItemComponent = ({ item }: WishlistItemProps) => {
    return (
        <div className="wishlist-item">
            <h2>{item.product.name}</h2>
            <img src={item.product.urlproduct} alt={item.product.name} />
            <p>Quantity: {item.quantity}</p>
            <p>Notes: {item.notes}</p>
            <p>Added on: {new Date(item.created_date).toLocaleDateString()}</p>
            <p>Price: ${item.product.product_price.toFixed(2)}</p>
            <p>Category: {item.product.category}</p>
            <p>User: {item.user.first_name} {item.user.last_name}</p>
        </div>
    );
};

export default WishlistItemComponent;
