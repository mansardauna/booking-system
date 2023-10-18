import React, { useState } from 'react';
import { SearchNormal } from 'iconsax-react';

const Search: React.FC = ({ products, setFilteredProducts }: any) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    setSearchQuery(query);

    // Filter products based on the search query
    const filteredProducts = products.filter((product: any) =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredProducts(filteredProducts);
  };

  return (
    <div className='flex border border-zinc-200 items-center justify-between m-auto w-full md:w-10/12 rounded-lg bg-zinc-100 font-light text-lg text-black p-2'>
      <input
        placeholder='Search for Event Hall'
        className='bg-transparent outline-none w-11/12'
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <SearchNormal size={17} />
    </div>
  );
};

export default Search;
