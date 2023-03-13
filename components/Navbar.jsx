import { useEffect } from 'react';
import Link from 'next/link';
import { AiOutlineShopping } from 'react-icons/ai';
import { FaUserAlt } from 'react-icons/fa';

import { useStateContext } from '@/context/StateContext';
import Cart from './Cart';

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();

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

  return (
    <div className='navbar-container'>
      <p className='navbar-logo'>
        <Link href='/'>HeartFeltDreamz</Link>
      </p>
      <div className='navbar-links'>
        <FaUserAlt className='navbar-link user-icon' />
        <div className='navbar-link cart-icon'>
          <AiOutlineShopping onClick={() => setShowCart(true)} />
          <span className='cart-item-qty'>{totalQuantities}</span>
        </div>

        {showCart && <Cart />}
      </div>
    </div>
  );
};

export default Navbar;
