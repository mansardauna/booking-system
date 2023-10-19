import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

interface Product {
  id: number;
  name: string;
  price: number;
  location: string;
  images: any;
  // Add other product properties here
}

const ProductSearch: React.FC<{ products: Product[] }> = ({ products }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const searchContainerRef = useRef<HTMLDivElement | null>(null);

  const handleSearch = (query: string) => {
    const results = products.filter((product) =>
      product.name.toLowerCase().includes(query.toLowerCase()) ||
      product.location.toLowerCase().includes(query.toLowerCase()) ||
      product.price.toString().includes(query)
    );

    setSearchResults(results);
  };

  const handleProductDetails = (productId: number) => {
    const product = products.find((product) => product.id === productId);
    if (product) {
      const idString = String(product.name).toLowerCase().split(" ").join("");
      const rootId = idString;

      navigate(`/product/${rootId}`, {
        state: {
          products: product,
        },
      });
    }
  };

  const handleInputFocus = () => {
    setIsSearchOpen(true);
  };

  const handleInputBlur = () => {
    // Delay closing the search results to allow clicking on them
    setTimeout(() => {
      setIsSearchOpen(false);
    }, 200);
  };

  const handleResultClick = (productId: number) => {
    handleProductDetails(productId);
    setIsSearchOpen(false); // Close the search results
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };


  return (
    <div className='relative w-full'>
      <input
        type='text'
        placeholder='Search by Name, Price, Location ....'
        className='bg-transparent outline-none md:w-11/12 w-full border p-2 rounded-lg'
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
          handleSearch(e.target.value);
        }}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
      />
      <div
        ref={searchContainerRef}
        className={`search-results absolute z-50 bg-white text-black p-2 rounded-md md:w-11/12 w-full top-10 max-h-60 overflow-auto ${
          isSearchOpen ? 'block' : 'hidden'
        }`}
      >
        {searchResults.map((result) => (
          <div
            key={result.id}
            className='search-result-item w-full'
            onClick={() => handleResultClick(result.id)}
          >
            <div className='flex gap-1 w-full border my-2 p-1 items-center'>
              <img src={result.images[0]} alt={result.name} className="w-16 h-16" />
              <div className='flex w-full'>
                {result.name} - {result.location} - ${result.price}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductSearch;
