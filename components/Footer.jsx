import { FaEtsy, FaPinterest, FaTwitter, FaInstagram, FaFacebookSquare } from 'react-icons/fa';
import Link from 'next/link';

const Footer = () => {
  return (
    <div className='footer-container'>
      <p className='icons'>
        <Link href={'https://www.etsy.com/shop/HeartFeltDreamz'} target='_blank'>
          <FaEtsy />
        </Link>
        <Link href={'https://www.instagram.com/heartfeltdreamz/'} target='_blank'>
          <FaInstagram />
        </Link>
        <Link href={'https://www.pinterest.com/'} target='_blank'>
          <FaPinterest />
        </Link>
        <Link href={'https://www.facebook.com/'} target='_blank'>
          <FaFacebookSquare />
        </Link>
        <Link href={'https://twitter.com/'} target='_blank'>
          <FaTwitter />
        </Link>
      </p>
      <p>2023 ©HeartFeltDreamz All rights reserved</p>
    </div>
  );
};

export default Footer;
