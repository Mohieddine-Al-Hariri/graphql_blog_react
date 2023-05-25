import Document, { Html, Head, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html>
        <Head>
          <title>Blog Website</title>
          <link rel="icon" href="/favicon.ico" />
          {/* <meta name="viewport" content="width=device-width,minimum-scale=1, initial-scale=1" /> */}
        </Head>
        <body className='overflow-x-hidden'>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
