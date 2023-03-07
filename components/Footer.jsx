import { FaEtsy, FaPinterest, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className='footer-container'>
      <p className='icons'>
        <FaEtsy />
        <FaInstagram />
        <FaPinterest />
        <FaTwitter />
      </p>
      <p>2023 ©HeartFeltDreamz All rights reserved</p>
    </div>
  );
};

export default Footer;
