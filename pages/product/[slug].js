import { useState, useEffect } from 'react';
import Image from 'next/image';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from 'react-icons/ai';

import { readClient, urlFor } from '@/lib/client';
import { Product } from '@/components';
import { useStateContext } from '@/context/StateContext';

const ProductDetails = ({ product, products }) => {
  const { image, name, details, price } = product;
  const [index, setIndex] = useState(0);

  const { setQty, decQty, incQty, qty, onAdd, setShowCart } = useStateContext();

  // prevent text select on double-click
  const preventTextSelect = (event) => {
    if (event.detail > 1) {
      event.preventDefault();
    }
  };

  const slickSettings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 2000,
    cssEase: "linear"
  };

  if (index > image.length - 1) index = image.length - 1;
  
  const handleBuyNow = () => {
    onAdd(product, qty);
    setShowCart(true);
  }

  useEffect(() => {
    setIndex(0);
    setQty(1);
  }, [product, setQty]);

  return (
    <>
      <div className='product-detail-container'>
        <div className='image-container'>
          <div className='product-detail-image'>
            <Image
              src={`${urlFor(image && image[index])}`}
              alt='product-alt'
              width={400}
              height={400}
            />
          </div>
          <div className='small-images-container'>
            {image?.map((item, i) => {
              return (
                <Image
                  key={item._key}
                  src={`${urlFor(item)}`}
                  alt='product alt'
                  width={200}
                  height={200}
                  className={
                    i === index ? 'small-image selected-image' : 'small-image'
                  }
                  onMouseEnter={() => {
                    setIndex(i);
                  }}
                />
              );
            })}
          </div>
        </div>
        <div className='product-detail-desc'>
          <h1>{name}</h1>
          <div className='reviews'>
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>(20)</p>
          </div>
          <h4>Details:</h4>
          <p>{details}</p>
          <p className='price'>${price}</p>
          <div className='quantity'>
            <h3>Quantity:</h3>
            <p className='quantity-desc'>
              <span
                className='minus'
                onClick={decQty}
                onMouseDown={preventTextSelect}
              >
                <AiOutlineMinus />
              </span>
              <span className='num prevent-select'>{qty}</span>
              <span
                className='plus'
                onClick={incQty}
                onMouseDown={preventTextSelect}
              >
                <AiOutlinePlus />
              </span>
            </p>
          </div>
          <div className='buttons'>
            <button
              type='button'
              className='add-to-cart'
              onClick={() => onAdd(product, qty, true)}
            >
              Add to Cart
            </button>
            <button type='button' className='buy-now' onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>
        </div>
      </div>
      <div className='maylike-products-wrapper'>
        <h2>You may also like</h2>
        <Slider {...slickSettings}>
          {products?.map((item) => {
            return <Product key={item._id} product={item} />;
          })}
        </Slider>
      </div>
    </>
  );
};

export const getStaticPaths = async () => {
  const query = `*[_type == "product"] {
        slug {
            current
        }
    }`;

  const products = await readClient.fetch(query);

  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current,
    },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productsQuery = '*[_type == "product"]';

  const product = await readClient.fetch(query);
  const products = await readClient.fetch(productsQuery);

  return {
    props: { products, product },
  };
};

export default ProductDetails;
