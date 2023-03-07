import { useEffect } from 'react';
import Link from 'next/link';
import { AiOutlineShopping } from 'react-icons/ai';

import Cart from './Cart';
import { useStateContext } from '@/context/StateContext';

const Navbar = () => {
  const { showCart, setShowCart, totalQuantities } = useStateContext();

  useEffect(() => {
    const header = document.getElementById('myHeader');
    const sticky = header.offsetTop;
  
    window.onscroll = function () {
      stickyHeader();
    };
  
    function stickyHeader() {
      if (window.pageYOffset > sticky) {
        header.classList.add('sticky');
      } else {
        header.classList.remove('sticky');
      }
    }
  }, [])

  return (
    <div className='navbar-container'>
      <p className='logo'>
        <Link href='/'>HeartFeltDreamz</Link>
      </p>
      <button
        type='button'
        className='cart-icon'
        onClick={() => setShowCart(true)}
      >
        <AiOutlineShopping />
        <span className='cart-item-qty'>{totalQuantities}</span>
      </button>

      {showCart && <Cart />}
    </div>
  );
};

export default Navbar;
