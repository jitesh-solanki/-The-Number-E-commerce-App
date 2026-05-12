import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title = "The Number - Premium Fashion Store",
  description = "Discover premium fashion, luxury clothing, and accessories at The Number. Free shipping on orders $50+.",
  keywords = "premium fashion, luxury clothing, accessories, online shopping",
  image = "/og-image.jpg",
  url = "https://thenumber.com"
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      
      {/* Twitter */}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
    </Helmet>
  );
};

export default SEO;