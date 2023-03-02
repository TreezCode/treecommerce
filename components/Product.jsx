import Link from 'next/link';
import Image from 'next/image';

import { urlFor } from '@/lib/client';

const Product = ({ product: { image, name, slug, price } }) => {
  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className='product-card'>
          <div className='product-image'>
            <Image
              alt='product alt'
              src={`${urlFor(image && image[0])}`}
              width={250}
              height={250}
            />
          </div>
          <p className='product-name'>{name}</p>
          <p className='product-price'>${price}</p>
        </div>
      </Link>
    </div>
  );
};

export default Product;
