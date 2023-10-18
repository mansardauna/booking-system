import React, { useState, useEffect } from 'react';
import Product from '../../../components/Product/Product';

function Header() {
  const [showDetail, setShowDetail] = useState(false);
  const filter = [
    {
      id: 1,
      title: "Near me"
    },
    {
      id: 2,
      title: "Recommended"
    },
    {
      id: 3,
      title: "Popular"
    }
  ];

  const [activeFilter, setActiveFilter] = useState<number | null>(null);
  const [products, setProducts] = useState([]); // State to store product data

  const handleFilterClick = (id: number) => {
    setActiveFilter(id);
  };

  useEffect(() => {
    // Simulate fetching product data from a mock API
    // You can replace this with actual API calls
    const fetchProducts = async () => {
      try {
        // Mock API endpoint or actual API endpoint
        const response = await fetch('http://localhost:3001/products'); // Replace with your API endpoint
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    fetchProducts();
  }, []);

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
        <div className='grid md:grid-cols-3 grid-cols-1 gap-5 md:w-11/12 w-10/12 p-2 m-auto'>
          {products.map((product: any) => (
            <Product key={product.id} productInfo={product} show={showDetail} />
          ))}
        </div>
        <div>
         
        </div>
      </div>
    </div>
  );
}

export default Header;
