// import Client from 'shopify-buy';
import Client from 'shopify-buy/index.unoptimized.umd';

const client = Client.buildClient({
  domain: process.env.REACT_APP_SHOPIFY_DOMAIN,
  storefrontAccessToken: process.env.REACT_APP_SHOPIFY_API,
});

export default client;
