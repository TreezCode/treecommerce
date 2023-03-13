import Link from 'next/link';
import Image from 'next/image';

import { urlFor } from '@/lib/client';

const Product = ({ product: { image, name, slug, price } }) => {
  return (
    <>
      <div className='product-card'>
        <Link href={`/product/${slug.current}`}>
          <div className='product-image-container'>
            <Image
              priority
              fill
              style={{ objectFit: 'contain' }}
              alt='product alt'
              className='product-image'
              src={`${urlFor(image && image[0])}`}
              draggable={false}
            />
          </div>
        </Link>
        <p className='product-name'>{name}</p>
        <p className='product-price'>${price}</p>
      </div>
    </>
  );
};

export default Product;
