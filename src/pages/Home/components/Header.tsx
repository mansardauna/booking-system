import React, { useState, useEffect } from 'react';
import Product from '../../../components/Product/Product';

function Header() {
  const [showDetail, setShowDetail] = useState(false);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('Near me');
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3003/products');
        if (!response.ok) {
          throw new Error(`HTTP Error! Status: ${response.status}`);
        }
        const data = await response.json();

        const uniqueCategories = Array.from<string>(new Set(data.map((product: any) => product.category)));
        setCategories([...uniqueCategories]);

        const filteredProducts = data.filter((product: any) => product.category === activeCategory);
        setProducts(filteredProducts);

        setLoading(false);
      } catch (error: any) {
        console.error('Error fetching product data:', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [activeCategory]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

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
        {products.length > 0 ? (
          <div className="grid md:grid-cols-3 grid-cols-1 gap-5 md:w-11/12 w-10/12 p-2 m-auto">
            {products.map((product: any) => (
              <Product key={product.id} productInfo={product} show={showDetail} />
            ))}
          </div>
        ) : (
          <div>No products available.</div>
        )}
        <div>{/* Add other content here */}</div>
      </div>
    </div>
  );
}

export default Header;
