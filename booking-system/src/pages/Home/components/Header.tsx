import React, { useState, useEffect } from 'react';
import Product from '../../../components/Product/Product';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import useFetchProducts from '../../../Hooks/useFetchProduct';

function Header() {
  const [showDetail, setShowDetail] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('Near me');
  const { products, loading, error } = useFetchProducts();

  useEffect(() => {
    const uniqueCategories = Array.from<string>(new Set(products.map((product: any) => product.category)));
    setCategories(['All', ...uniqueCategories]); // Include 'All' category option
  }, [products]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const sliderSettings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const filteredProducts = activeCategory === 'All' ? products : products.filter((product:any) => product.category === activeCategory);

  return (
    <div className="flex flex-col">
      <div className="flex justify-between md:w-6/12 w-10/12 m-auto md:p-4 mt-2 md:mt-0 cursor-pointer text-lg text-slate-400">
        {categories.map((category, index) => (
          <div
            key={index}
            className={`pb-1 cursor-pointer ${
              activeCategory === category ? 'border-b text-slate-500 border-red-300' : ''
            }`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </div>
        ))}
      </div>
      <div className="flex">
        {filteredProducts.length > 0 ? (
          <div className="grid md:grid-cols-3 grid-cols-1 gap-2 md:w-11/12 w-10/12 p-2 m-auto">
            {window.innerWidth <= 768 ? (
              <Slider {...sliderSettings} className="single-product-slider">
                {filteredProducts.map((product: any) => (
                  <Product key={product.id} productInfo={product} show={showDetail} />
                ))}
              </Slider>
            ) : (
              filteredProducts.map((product: any) => (
                <Product key={product.id} productInfo={product} show={showDetail} />
              ))
            )}
          </div>
        ) : (
          <div>No products available in the selected category.</div>
        )}
        <div>{/* Add other content here */}</div>
      </div>
    </div>
  );
}

export default Header;
