import React, { useState, useEffect } from 'react';
import Product from '../../../components/Product/Product';

function Header() {
  const [showDetail, setShowDetail] = useState(false);
  const filter = [
    {
      id: 1,
      title: "Near me",
    },
    {
      id: 2,
      title: "Recommended",
    },
    {
      id: 3,
      title: "Popular",
    },
  ];

  const [activeFilter, setActiveFilter] = useState<number | null>(null);
  const [products, setProducts] = useState([]); // State to store product data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState<Error | null>(null);

  const handleFilterClick = (id: number) => {
    setActiveFilter(id);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3003/products');
        if (!response.ok) {
          throw new Error(`HTTP Error! Status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data);
        setLoading(false);
      } catch (error:any) {
        console.error('Error fetching product data:', error);
        setError(error);
        setLoading(false);
      }
    };
  
    fetchProducts();
  }, []);
  

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className='flex flex-col'>
      <div className="flex justify-between md:w-6/12 w-10/12 m-auto md:p-4 mt-2 md:mt-0 cursor-pointer text-lg text-slate-400">
        {filter.map((item: any) => (
          <div
            key={item.id}
            className={`pb-1 cursor-pointer ${
              activeFilter === item.id ? 'border-b text-slate-500 border-red-300' : ''
            }`}
            onClick={() => handleFilterClick(item.id)}
          >
            {item.title}
          </div>
        ))}
      </div>
      <div className="flex">
      {products.length > 1 ? (
      <div className='grid md:grid-cols-3 grid-cols-1 gap-5 md:w-11/12 w-10/12 p-2 m-auto'>
          {products.map((product: any) => (
            <Product key={product.id} productInfo={product} show={showDetail} />
          ))}
        </div>):(
          <div>no product</div>
        )}
        <div>
         
        </div>
      </div>
    </div>
  );
}

export default Header;
