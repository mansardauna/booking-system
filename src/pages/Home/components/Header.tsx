import React, { useState } from 'react';
import Product from '../../../components/Product/Product';
import { products } from './mockApi';

function Header() {
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

  const handleFilterClick = (id: number) => {
    setActiveFilter(id);
  };

  return (
    <div className='flex flex-col'>
      <div className="flex justify-between md:w-7/12 w-10/12 m-auto md:p-4 mt-2 cursor-pointer text-lg  font-light text-slate-400">
        {filter.map((item: any) => (
          <div
            key={item.id}
            className={`pb-3 cursor-pointer ${
              activeFilter === item.id ? 'border-b text-slate-500 border-red-300' : ''
            }`}
            onClick={() => handleFilterClick(item.id)}
          >
            {item.title}
          </div>
        ))}
      </div>
      <div className='grid md:grid-cols-4 grid-cols-2 gap-5 md:w-10/12 w-10/12 p-2 m-auto'>
        {products.map((product: any) => (
          <Product key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Header;
