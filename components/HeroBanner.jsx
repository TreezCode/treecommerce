import Link from 'next/link';
import Image from 'next/image';

import { urlFor } from '@/lib/client';

const HeroBanner = ({
  heroBanner: {
    smallText,
    midText,
    largeText1,
    product,
    buttonText,
    image,
    desc,
  },
}) => {
  return (
    <div className='hero-banner-container'>
      <div className='hero-banner-content'>
        <div className='hero-banner-item'>
          <div className='hero-banner-left'>
            <div className='hero-banner-text'>
              <p>{smallText}</p>
              <h3>{midText}</h3>
              <h1>{largeText1}</h1>
            </div>
            <div className='hero-banner-btn-container'>
              <Link href={`/product/${product}`}>
                <button
                  type='button'
                  className='btn hero-banner-btn radial-gradient-btn'
                >
                  {buttonText}
                </button>
              </Link>
            </div>
          </div>
          <div className='hero-banner-right'>
            <div className='hero-banner-image'>
              <Image
                alt='headphones'
                src={`${urlFor(image)}`}
                width={450}
                height={450}
              />
              <div className='hero-banner-desc'>
                <h5>Description</h5>
                <p>{desc}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
