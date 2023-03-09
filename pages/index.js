import { readClient } from '@/lib/client';
import { Product, HeroBanner, FooterBanner } from '@/components';

const Home = ({ products, bannerData }) => {
  return (
    <>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
      <section className='products-section'>
        <div className='products-heading'>
          <h2>Best Selling Products</h2>
          <p>Speakers of many variations</p>
        </div>

        <div className='products-container'>
          {products?.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      </section>
      <FooterBanner footerBanner={bannerData && bannerData[0]} />
    </>
  );
};

export const getServerSideProps = async () => {
  const query = '*[_type == "product"]';
  const products = await readClient.fetch(query);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await readClient.fetch(bannerQuery);

  return {
    props: { products, bannerData },
  };
};

export default Home;
