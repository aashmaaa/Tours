import React from 'react';
import { Helmet } from 'react-helmet';
import Header from './Header'; // Adjust import path as needed
import Footer from './Footer'; // Adjust import path as needed

const BaseLayout = ({ title, children }) => {
  return (
    <>
      <Helmet>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="/css/style.css" />
        <link rel="shortcut icon" type="image/png" href="/img/favicon.png" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Lato:300,300i,700"
        />
        <title>{`Natours | ${title}`}</title>
      </Helmet>
      <Header />
      <main className="main">{children}</main>
      <Footer />
      <script src="https://js.stripe.com/v3/"></script>
      <script src="/js/bundle.js"></script>
    </>
  );
};

export default BaseLayout;
