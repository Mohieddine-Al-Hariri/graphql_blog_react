import { SessionProvider } from 'next-auth/react';

import '../styles/globals.scss';
import { Layout } from '../components';

function MyApp({ Component, pageProps, session }) {
  return (
    <SessionProvider session={session} >
        <Layout>
          <Component {...pageProps} />
        </Layout>
    </SessionProvider>

  );
}

export default MyApp;
