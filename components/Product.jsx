import Link from 'next/link';
import Image from 'next/image';

import { urlFor } from '@/lib/client';

const Product = ({ product: { image, name, slug, price } }) => {
  return (
    <>
      <Link href={`/product/${slug.current}`}>
        <div className='product-card'>
          <div className='product-image-container'>
            <Image
              priority
              alt='product alt'
              className='product-image'
              src={`${urlFor(image && image[0])}`}
              width={250}
              height={250}
              style={{objectFit: 'contain'}}
              draggable={false}
            />
          </div>
          <p className='product-name'>{name}</p>
          <p className='product-price'>${price}</p>
        </div>
      </Link>
    </>
  );
};

export default Product;
