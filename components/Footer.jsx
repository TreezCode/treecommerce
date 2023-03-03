import { FaEtsy, FaPinterest, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className='footer-container'>
      <p>2023 ©HeartFeltDreamz All right reserved</p>
      <p className='icons'>
        <FaEtsy />
        <FaInstagram />
        <FaPinterest />
        <FaTwitter />
      </p>
    </div>
  );
};

export default Footer;
