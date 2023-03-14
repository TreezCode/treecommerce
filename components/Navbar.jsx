import { useEffect } from 'react';
import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';
import { AiOutlineShopping } from 'react-icons/ai';
import { FaUserAstronaut, FaUserPlus } from 'react-icons/fa';

import { useStateContext } from '@/context/StateContext';
import Cart from './Cart';

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();
  const { user, error, isLoading } = useUser();

  useEffect(() => {
    const header = document.getElementById('myHeader');

    function handleHeaderGlow() {
      window.scrollY > 0
        ? header.classList.add('sticky-header-glow')
        : header.classList.remove('sticky-header-glow');
    }

    window.onscroll = function () {
      handleHeaderGlow();
    };
  }, []);

  useEffect(() => {
    console.log(user);
  }, [user, error, isLoading]);

  return (
    <div className='navbar-container'>
      <div className='navbar-logo-container'>
        <Link href='/' className='navbar-logo'>
          HeartFeltDreamz
        </Link>
      </div>
      <div className='navbar-links'>
        {user ? (
          <Link href={'/'} className='navbar-link user-icon'>
            <FaUserAstronaut />
          </Link>
        ) : (
          <Link href={'/api/auth/login'} className='navbar-link user-icon'>
            <FaUserPlus />
          </Link>
        )}
        <button
          type='button'
          className='navbar-link cart-icon'
          onClick={() => setShowCart(true)}
        >
          <AiOutlineShopping />
          <span className='cart-item-qty'>{totalQuantities}</span>
        </button>

        {showCart && <Cart />}
      </div>
    </div>
  );
};

export default Navbar;
