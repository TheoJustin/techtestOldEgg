// In WishlistContainer.tsx
import React from 'react';
import { WishlistItem, FollowerData } from '../../pages/wishlist/Wishlist';
import './WishlistContainer.scss';
import WishlistItemComponent from './WishlistItem';

interface WishlistContainerProps {
  wishlist: WishlistItem[];
}

const WishlistContainer = ({ wishlist }: WishlistContainerProps) => {

  return (
    <div className='wishlist-container-box'>
        <div className='wishlist-container-text'>New wishlist</div>

        <div className='wishlist-container-content'>

            {wishlist.map((item) => (
              <WishlistItemComponent key={item.wishlist_id} item={item} />
            ))}
            <div className='wishlist-container-description'>
                <div className='wishlist-container-total'>{wishlist.length} Items</div>
                <div className='wishlist-container-price'>$123</div>
            </div>
        </div>
    </div>
  );
};

export default WishlistContainer;
