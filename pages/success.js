import { useEffect } from 'react';
import Link from 'next/link';
import { BsBagCheckFill } from 'react-icons/bs';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';

import { useStateContext } from '@/context/StateContext';
import { runFireWorks } from '@/lib/utils';

const Success = () => {
    const { setCartItems, setTotalPrice, setTotalQuantities } = useStateContext();

    useEffect(() => {
        localStorage.clear();
        Cookies.remove('cart');
        setCartItems([]);
        setTotalPrice(0);
        setTotalQuantities(0);
        runFireWorks(0);
    }, [setCartItems, setTotalPrice, setTotalQuantities])

  return (
    <div className='success-container'>
        <div className='success-content'>
            <p className='icon'>
                <BsBagCheckFill />
            </p>
            <h2>Thank you for your order!</h2>
            <p className='success-email-msg'>Check your email inbox for the receipt.</p>
            <p className='success-description'>
                If you have any questions, please email
                <a className='success-email' href='mailto:order@example.com'>
                    order@example.com
                </a>
            </p>
            <div className='success-btn-container'>
                <Link href='/'>
                    <button type='button' width='300px' className='btn radial-gradient-btn success-btn'>Continue Shopping</button>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Success