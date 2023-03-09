import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { TiDeleteOutline } from 'react-icons/ti';
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiOutlineLeft,
  AiOutlineShopping,
} from 'react-icons/ai';

import { useStateContext } from '@/context/StateContext';
import { urlFor } from '@/lib/client';
import getStripe from '@/lib/getStripe';
import { toast } from 'react-hot-toast';

const Cart = () => {
  const cartRef = useRef();
  const {
    totalPrice,
    totalQuantities,
    cartItems,
    setShowCart,
    toggleCartItemQuantity,
    onRemove,
  } = useStateContext();

  const handleCheckout = async () => {
    const stripe = await getStripe();

    const response = await fetch('/api/stripe', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cartItems),
    });
    console.log(response);
    if (response.statusCode === 500) return;

    const data = await response.json();

    toast.loading('Redirecting...');

    stripe.redirectToCheckout({ sessionId: data.id });
  };

  const preventTextSelect = (event) => {
    if (event.detail > 1) {
      event.preventDefault(); // prevent text select on double-click
    }
  };

  return (
    <div className='cart-wrapper' ref={cartRef}>
      <div className='cart-container'>
        <div className='cart-heading'>
          <AiOutlineLeft
            className='cart-heading-arrow'
            onClick={() => setShowCart(false)}
          />
          <span className='heading'>Your Cart</span>
          <span className='cart-num-items'>({totalQuantities} items)</span>
        </div>

        {cartItems.length < 1 && (
          <div className='empty-cart'>
            <AiOutlineShopping size={150} />
            <h3>Your shopping bag is empty</h3>
            <div className='empty-cart-btn-container'>
              <Link href={'/'}>
                <button
                  type='button'
                  className='btn radial-gradient-btn empty-cart-btn '
                  onClick={() => setShowCart(false)}
                >
                  Continue Shopping
                </button>
              </Link>
            </div>
          </div>
        )}

        <div className='product-container'>
          {cartItems.length >= 1 &&
            cartItems.map((item) => (
              <div className='product' key={item._id}>
                <div className='cart-product-image'>
                  <Image
                    src={`${urlFor(item?.image[0])}`}
                    alt='product-alt'
                    width={150}
                    height={150}
                  />
                </div>
                <div className='item-desc'>
                  <div className='flex top'>
                    <h5>{item.name}</h5>
                    <h4>${item.price}</h4>
                  </div>
                  <div className='flex bottom'>
                    <p className='quantity-desc'>
                      <span
                        className='minus'
                        onClick={() => toggleCartItemQuantity(item._id, 'dec')}
                        onMouseDown={preventTextSelect}
                      >
                        <AiOutlineMinus />
                      </span>
                      <span className='num'>{item.quantity}</span>
                      <span
                        className='plus'
                        onClick={() => toggleCartItemQuantity(item._id, 'inc')}
                        onMouseDown={preventTextSelect}
                      >
                        <AiOutlinePlus />
                      </span>
                    </p>
                    <button
                      type='button'
                      className='remove-item'
                      onClick={() => onRemove(item, true)}
                    >
                      <TiDeleteOutline />
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {cartItems.length >= 1 && (
          <div className='cart-bottom'>
            <div className='total'>
              <h3>Subtotal:</h3>
              <h3>${totalPrice}</h3>
            </div>
            <div className='cart-btn-container'>
              <span className='cart-btn-wrapper'>
                <button
                  type='button'
                  className='btn btn-medium cart-stripe-btn'
                  onClick={handleCheckout}
                >
                  Pay with Stripe
                </button>
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
