import { useState, useEffect, useRef } from 'react';
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

import { useStateContext } from '@/context/StateContext';
import { readClient, urlFor } from '@/lib/client';
import { Product } from '@/components';
import { handleMagnify } from '@/lib/utils';

const ProductDetails = ({ product, products }) => {
  const { image, name, details, price } = product;
  const [index, setIndex] = useState(0);

  const { setQty, decQty, incQty, qty, onAdd, setShowCart } = useStateContext();

  let indexRef = useRef(0);

  let magnifierEnabled = true;

  // prevent text select on double-click
  const preventTextSelect = (event) => {
    if (event.detail > 1) {
      event.preventDefault();
    }
  };

  const slickSettings = {
    dots: false,
    speed: 3000,
    autoplaySpeed: 2000,
    cssEase: 'linear',
    autoplay: true,
    infinite: true,
    centerMode: true,
    centerPadding: '2rem',
    slidesToShow: 3,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          arrows: false,
          centerMode: true,
          centerPadding: '40px',
          slidesToShow: 1,
        },
      },
    ],
  };

  const handleBuyNow = () => {
    onAdd(product, qty);
    setShowCart(true);
  };

  useEffect(() => {
    indexRef.current = 0;
    setIndex(0);
    setQty(1);
  }, [product, setQty]);

  if (indexRef.current + 1 > image.length) indexRef.current = image.length - 1;

  return (
    <>
      <div className='product-detail-container'>
        <div className='image-container'>
          <div className='product-detail-image-container'>
            <Image
              fill
              src={`${urlFor(image && image[indexRef.current])}`}
              alt='product-alt'
              className='product-detail-image'
              draggable={false}
              style={{ objectFit: 'contain' }}
              id='productDetailImage'
              onMouseEnter={(e) => {
                if (e.target.matches('#productDetailImage')) {
                  handleMagnify(e.target.id, magnifierEnabled);
                }
              }}
              onClick={(e) => e.preventDefault}
            />
          </div>
          <div className='small-images-container'>
            {image?.map((item, i) => {
              return (
                <div className='small-image-wrap' key={item._key}>
                  <Image
                    fill
                    key={item._key}
                    src={`${urlFor(item)}`}
                    alt='product alt'
                    style={{ objectFit: 'contain' }}
                    draggable={false}
                    className={
                      i === index ? 'small-image selected-image' : 'small-image'
                    }
                    onMouseEnter={() => {
                      setIndex(i);
                      indexRef.current = i;
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
        <div className='product-detail-desc'>
          <h1>{name}</h1>
          <div className='reviews'>
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiFillStar />
            <AiOutlineStar />
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
          <div className='product-detail-buttons'>
            <button
              type='button'
              className='btn btn-medium add-to-cart-btn'
              onClick={() => onAdd(product, qty, true)}
            >
              Add to Cart
            </button>
            <button
              type='button'
              className='btn btn-medium buy-now-btn'
              onClick={handleBuyNow}
            >
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
