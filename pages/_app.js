import { UserProvider } from '@auth0/nextjs-auth0/client';
import { StateContext } from '@/context/StateContext';

import { Toaster } from 'react-hot-toast';
import { Montserrat, Raleway } from 'next/font/google';

import { Layout } from '@/components';
import '@/styles/globals.css';

const montserrat = Montserrat({
  variable: '--montserrat-font',
  fallback: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'sans-serif']
});

const raleway = Raleway({
  variable: '--raleway-font',
  fallback: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Oxygen',
  'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', 'sans-serif']
});

export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <StateContext>
        <div className={`${montserrat.className} ${raleway.variable}`}>
          <Layout>
            <Toaster />
              <Component {...pageProps} />
          </Layout>
        </div>
      </StateContext>
    </UserProvider>
  );
}
