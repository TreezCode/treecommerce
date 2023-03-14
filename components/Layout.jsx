import Head from 'next/head';
import Footer from './Footer';
import Navbar from './Navbar';
import Background from './Background';

const Layout = ({ children }) => {
  return (
    <div className='layout'>
      <Head>
        <title>HeartFeltDreamz Store</title>
      </Head>
      <header className='header' id='myHeader'>
        <Navbar />
      </header>
      <main className='main-container'>
        <>
          <Background />
          {children}
        </>
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
