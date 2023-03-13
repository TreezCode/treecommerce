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
      <div className='navbar-logo-container'>
        <Link href='/' className='navbar-logo'>HeartFeltDreamz</Link>
      </div>
      <div className='navbar-links'>
        <button type='button' className='navbar-link user-icon'>
          <FaUserAlt />
        </button>
        <button type='button' className='navbar-link cart-icon' onClick={() => setShowCart(true)}>
          <AiOutlineShopping />
          <span className='cart-item-qty'>{totalQuantities}</span>
        </button>

        {showCart && <Cart />}
      </div>
    </div>
  );
};

export default Navbar;
