import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import {
  AiOutlineMinus,
  AiOutlinePlus,
  AiFillStar,
  AiOutlineStar,
} from 'react-icons/ai';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { useStateContext } from '@/context/StateContext';
import { readClient, urlFor } from '@/lib/client';
import { Product } from '@/components';
import { handleMagnify } from '@/lib/utils/magnify';

const ProductDetails = ({ product, products }) => {
  const { image, hiResImage, productImgAlt, name, details, price } = product;
  const { setQty, decQty, incQty, qty, onAdd, setShowCart } = useStateContext();
  const [index, setIndex] = useState(0);

  let imageRef = useRef(0);

  // prevent text select on double-click
  const preventTextSelect = (event) => {
    if (event.detail > 1) {
      event.preventDefault();
    }
  };

  const handleBuyNow = () => {
    onAdd(product, qty);
    setShowCart(true);
  };

  const handlePointerEvent = (e) => {
    e.target.id === 'productDetailImage' && handleMagnify(e.target.id);
  };

  useEffect(() => {
    imageRef.current = 0;
    setIndex(0);
    setQty(1);
  }, [product, image, hiResImage, setQty]);

  if (imageRef.current + 1 > image.length) imageRef.current = image.length - 1;

  return (
    <>
      <section className='product-detail-section'>
        <div className='product-detail-container'>
          <div className='product-detail-image-container'>
            <Image
              priority
              fill
              style={{ objectFit: 'contain' }}
              className='product-detail-image'
              id='productDetailImage'
              alt={productImgAlt ? productImgAlt : 'High quality product image'}
              src={`${urlFor(image && image[imageRef.current])}`}
              data-hires={
                !hiResImage
                  ? `${urlFor(image && image[imageRef.current])}`
                  : `${urlFor(hiResImage && hiResImage[imageRef.current])}`
              }
              draggable={false}
              onDragStart={() => false}
              onContextMenu={(e) => e.preventDefault()}
              onPointerEnter={handlePointerEvent}
            />
          </div>
          <p>Touch to zoom 👆🔎</p>
          <div className='small-images-container'>
            {image?.map((item, i) => {
              return (
                <div className='small-image-wrapper' key={item._key}>
                  <Image
                    fill
                    style={{ objectFit: 'contain' }}
                    key={item._key}
                    src={`${urlFor(item)}`}
                    alt={
                      productImgAlt
                        ? productImgAlt
                        : 'High quality product image'
                    }
                    className={
                      i === index ? 'small-image selected-image' : 'small-image'
                    }
                    draggable={false}
                    onPointerEnter={() => {
                      setIndex(i);
                      imageRef.current = i;
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
      </section>
      <section className='similar-products-section'>
        <h2>You may also like</h2>
        <Swiper
          loop={true}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          breakpoints={{
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 3,
              spaceBetween: 40,
            },
            1200: {
              slidesPerView: 4,
              spaceBetween: 50,
            },
          }}
          modules={[Autoplay, Pagination, Navigation]}
          className='mySwiper'
        >
          {products?.map((item) => {
            return (
              <SwiperSlide key={item._id}>
                <Product key={item._id} product={item} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </section>
    </>
  );
};

export const getStaticPaths = async () => {
  const query = `*[_type == "product"] {slug {current}}`;

  const products = await readClient.fetch(query);

  const paths = products.map((product) => ({
    params: { slug: product.slug.current },
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
