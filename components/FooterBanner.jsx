import Link from 'next/link';
import Image from 'next/image';

import { urlFor } from '@/lib/client';

const FooterBanner = ({
  footerBanner: {
    discount,
    largeText1,
    largeText2,
    saleTime,
    smallText,
    midText,
    desc,
    product,
    buttonText,
    image,
  },
}) => {
  return (
    <section className='footer-banner-section'>
      <div className='footer-banner-container'>
        <div className='footer-banner-content'>
          <div className='footer-banner-left'>
            <p>{discount} off discount!</p>
            <h3>{largeText1}</h3>
            <h3>{largeText2}</h3>
            <p>{saleTime}</p>
          </div>
          <div className='footer-banner-mid'>
            <div className='footer-banner-image'>
              <Link href={`/product/${product}`}>
                <Image
                priority
                  fill
                  src={`${urlFor(image)}`}
                  alt='footer-alt'
                  style={{ objectFit: 'contain' }}
                  draggable={false}
                />
              </Link>
            </div>
          </div>
          <div className='footer-banner-right'>
            <p>{smallText}</p>
            <h3>{midText}</h3>
            <p>{desc}</p>
            <div className='footer-banner-btn-container'>
              <Link href={`/product/${product}`}>
                <button type='button' className='btn footer-banner-btn radial-gradient-btn'>
                  {buttonText}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FooterBanner;
